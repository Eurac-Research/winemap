import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildSamplingTargets,
  createLocationSampler,
  readCogLocation,
} from "../src/app/map-applications/environment-browser/report/sample-location.ts";

const location = { longitude: 11, latitude: 46 };
const indicator = {
  id: "temperature",
  name: "Temperature",
  category: "climate",
  apps: ["environment-browser"],
  description: [],
  map: {
    type: "cog",
    unit: "deg C",
    displayRange: [0, 30],
    scenarios: [
      { id: "historical", label: "Historical" },
      { id: "ssp370", label: "SSP3-7.0" },
    ],
    periods: [
      { id: "baseline", label: "Baseline" },
      { id: "future", label: "Future" },
    ],
    classifications: [
      { label: "Low", max: 10 },
      { label: "High", min: 10 },
    ],
    layers: [
      { url: "baseline.tiff", scenarioId: "historical", periodId: "baseline" },
      { url: "future.tiff", scenarioId: "ssp370", periodId: "future" },
    ],
  },
};
const terrain = {
  ...indicator,
  id: "terrain",
  name: "Terrain",
  category: "topography",
  map: { ...indicator.map, layers: [{ url: "terrain.tiff" }] },
};
const targets = buildSamplingTargets([indicator, terrain], {
  indicatorIds: ["temperature", "terrain"],
});

test("builds multiple indicators, deduplicates IDs and filters valid climate combinations", () => {
  assert.equal(targets.length, 3);
  const selected = buildSamplingTargets([indicator, terrain], {
    indicatorIds: ["temperature", "temperature", "terrain"],
    climateCombinations: [{ scenarioId: "ssp370", periodId: "future" }],
  });
  assert.deepEqual(
    selected.map((target) => target.url),
    ["future.tiff", "terrain.tiff"],
  );
  assert.equal(selected[0].label, "SSP3-7.0 Future");
  assert.deepEqual(
    buildSamplingTargets([indicator], {
      indicatorIds: ["temperature"],
      climateCombinations: [],
    }),
    [],
  );
  assert.throws(() =>
    buildSamplingTargets([indicator], { indicatorIds: ["unknown"] }),
  );
  assert.throws(() =>
    buildSamplingTargets([{ ...indicator, apps: ["cartography"] }], {
      indicatorIds: ["temperature"],
    }),
  );
});

test("preserves order, zero, metadata, and min-inclusive/max-exclusive classes", async () => {
  const sampler = createLocationSampler(async (url) => ({
    status: "ok",
    value: url === "baseline.tiff" ? 0 : 10,
  }));
  const report = await sampler(location, targets);
  assert.equal(report.samplingPolicy, "maximum-cog-zoom");
  assert.deepEqual(
    report.samples.map((sample) => sample.value),
    [0, 10, 10],
  );
  assert.deepEqual(
    report.samples.map((sample) => sample.classification.label),
    ["Low", "High", "High"],
  );
  assert.equal(report.samples[0].unit, "deg C");
  assert.deepEqual(
    report.samples[0].classifications,
    indicator.map.classifications,
  );
});

test("isolates failures, reports progress, and retries failed reads", async () => {
  let failures = 0;
  const sampler = createLocationSampler(async (url) => {
    if (url === "future.tiff") {
      failures++;
      throw new Error("Network failure");
    }
    return { status: "no-data", value: null };
  });
  const progress = [];
  const report = await sampler(location, targets, {
    onProgress: (_, completed, total) => progress.push([completed, total]),
  });
  assert.deepEqual(
    report.samples.map((sample) => sample.status),
    ["no-data", "error", "no-data"],
  );
  assert.deepEqual(progress, [
    [1, 3],
    [2, 3],
    [3, 3],
  ]);
  await sampler(location, targets);
  assert.equal(failures, 2);
});

test("bounds concurrent reads across reports and deduplicates identical requests", async () => {
  let active = 0,
    peak = 0,
    reads = 0;
  const sampler = createLocationSampler(
    async () => {
      reads++;
      active++;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active--;
      return { status: "ok", value: 1 };
    },
    { concurrency: 2 },
  );
  await Promise.all([sampler(location, targets), sampler(location, targets)]);
  assert.equal(reads, 3);
  assert.ok(peak <= 2);
  await sampler(location, targets);
  assert.equal(reads, 3);
  await sampler({ ...location, longitude: 12 }, targets);
  assert.equal(reads, 6);
});

test("aborted consumers cannot publish results or schedule remaining targets", async () => {
  let finish;
  let reads = 0,
    progress = 0;
  const sampler = createLocationSampler(
    async () => {
      reads++;
      await new Promise((resolve) => {
        finish = resolve;
      });
      return { status: "ok", value: 1 };
    },
    { concurrency: 1 },
  );
  const controller = new AbortController();
  const request = sampler(location, targets, {
    signal: controller.signal,
    onProgress: () => progress++,
  });
  await new Promise((resolve) => setImmediate(resolve));
  controller.abort();
  finish();
  await assert.rejects(request, { name: "AbortError" });
  assert.equal(reads, 1);
  assert.equal(progress, 0);
});

test("one aborted consumer does not cancel another consumer's shared read", async () => {
  let finish;
  const sampler = createLocationSampler(async () => {
    await new Promise((resolve) => {
      finish = resolve;
    });
    return { status: "outside-coverage", value: null };
  });
  const controller = new AbortController();
  const first = sampler(location, targets.slice(0, 1), {
    signal: controller.signal,
  });
  const second = sampler(location, targets.slice(0, 1));
  await new Promise((resolve) => setImmediate(resolve));
  controller.abort();
  finish();
  await assert.rejects(first, { name: "AbortError" });
  assert.equal((await second).samples[0].status, "outside-coverage");
});

test("cache is bounded and expired results are refreshed", async () => {
  let reads = 0;
  const sampler = createLocationSampler(
    async () => {
      reads++;
      return { status: "ok", value: 1 };
    },
    { concurrency: 1, cacheSize: 1 },
  );
  await sampler(location, targets);
  await sampler(location, targets.slice(0, 1));
  assert.equal(reads, 4);
  const noCache = createLocationSampler(
    async () => {
      reads++;
      return { status: "ok", value: 1 };
    },
    { cacheTtlMs: 0 },
  );
  await noCache(location, targets.slice(0, 1));
  await noCache(location, targets.slice(0, 1));
  assert.equal(reads, 6);
});

test("validates locations and supports an empty selection", async () => {
  const sampler = createLocationSampler(async () => {
    throw new Error("Must not read");
  });
  await assert.rejects(sampler({ longitude: NaN, latitude: 46 }, targets));
  await assert.rejects(sampler({ longitude: 11, latitude: 90 }, targets));
  assert.deepEqual((await sampler(location, [])).samples, []);
  assert.throws(() =>
    createLocationSampler(async () => {}, { concurrency: 0 }),
  );
});

test("COG adapter uses maximum zoom, preserves scaled values, and checks coverage and NoData", async () => {
  let reads = 0;
  let value = 12.5;
  const api = {
    getCogMetadata: async () => ({
      bbox: [10, 40, 20, 50],
      noData: -9999,
      scale: 0.1,
      offset: 2,
      images: [],
    }),
    locationValues: async (...args) => {
      reads++;
      assert.equal(args.length, 2, "Do not pass the map zoom");
      return [value];
    },
  };
  assert.deepEqual(await readCogLocation("sample", location, api), {
    status: "ok",
    value: 12.5,
  });
  assert.deepEqual(
    await readCogLocation("sample", { longitude: 21, latitude: 46 }, api),
    { status: "outside-coverage", value: null },
  );
  assert.equal(reads, 1);
  value = -9999 * 0.1 + 2;
  assert.deepEqual(await readCogLocation("sample", location, api), {
    status: "no-data",
    value: null,
  });
  for (value of [NaN, Infinity, -Infinity]) {
    assert.equal(
      (await readCogLocation("sample", location, api)).status,
      "no-data",
    );
  }
  value = 0;
  assert.deepEqual(await readCogLocation("sample", location, api), {
    status: "ok",
    value: 0,
  });
});
