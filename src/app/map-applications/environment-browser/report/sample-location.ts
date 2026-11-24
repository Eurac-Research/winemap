import type { Indicator } from "@/content/indicators";

import type {
  LocationReportSamples,
  LocationSample,
  ReportLocation,
  ReportSelection,
  SampleValue,
  SamplingTarget,
} from "./types";

export function buildSamplingTargets(
  indicators: readonly Indicator[],
  selection: ReportSelection,
): SamplingTarget[] {
  const targets: SamplingTarget[] = [];
  for (const id of new Set(selection.indicatorIds)) {
    const indicator = indicators.find(
      (item) => item.id === id && item.apps.includes("environment-browser"),
    );
    if (!indicator?.map) throw new Error(`Unknown Explorer indicator: ${id}`);
    const config = indicator.map;
    for (const layer of config.layers) {
      const isClimate = layer.scenarioId != null || layer.periodId != null;
      if (
        isClimate &&
        selection.climateCombinations &&
        !selection.climateCombinations.some(
          (choice) =>
            choice.scenarioId === layer.scenarioId &&
            choice.periodId === layer.periodId,
        )
      )
        continue;
      const labels = [
        config.scenarios?.find((item) => item.id === layer.scenarioId)?.label ??
          layer.scenarioId,
        config.periods?.find((item) => item.id === layer.periodId)?.label ??
          layer.periodId,
      ].filter(Boolean);
      targets.push({
        ...layer,
        indicatorId: indicator.id,
        indicatorName: indicator.name,
        category: indicator.category,
        unit: config.unit,
        label: labels.join(" ") || indicator.name,
        classifications:
          config.classifications?.map((item) => ({ ...item })) ?? [],
      });
    }
  }
  return targets;
}

type ReadSample = (
  url: string,
  location: ReportLocation,
) => Promise<SampleValue>;
type SampleOptions = {
  signal?: AbortSignal;
  onProgress?: (
    sample: LocationSample,
    completed: number,
    total: number,
  ) => void;
};

function checkAbort(signal?: AbortSignal) {
  if (signal?.aborted)
    throw new DOMException("Sampling cancelled", "AbortError");
}

/**
 * A shared queue bounds reads across overlapping reports. Aborting stops subsequent batches
 * and suppresses results; the COG library cannot abort an in-flight read.
 */
export function createLocationSampler(
  read: ReadSample,
  { concurrency = 4, cacheSize = 512, cacheTtlMs = 300_000 } = {},
) {
  if (
    !Number.isInteger(concurrency) ||
    concurrency < 1 ||
    !Number.isInteger(cacheSize) ||
    cacheSize < 0 ||
    !Number.isFinite(cacheTtlMs) ||
    cacheTtlMs < 0
  ) {
    throw new Error("Invalid sampler limits");
  }
  const cache = new Map<string, { result: SampleValue; expires: number }>();
  const pending = new Map<string, Promise<SampleValue>>();
  const queue: (() => void)[] = [];
  let active = 0;

  async function limitedRead(
    url: string,
    location: ReportLocation,
    signal?: AbortSignal,
  ) {
    await new Promise<void>((resolve) => {
      const start = () => {
        active += 1;
        resolve();
      };
      if (active < concurrency) start();
      else queue.push(start);
    });
    try {
      checkAbort(signal);
      return await read(url, location);
    } finally {
      active -= 1;
      queue.shift()?.();
    }
  }

  async function sampleAsset(
    url: string,
    location: ReportLocation,
    signal?: AbortSignal,
  ): Promise<SampleValue> {
    checkAbort(signal);
    const key = JSON.stringify([
      url,
      location.longitude,
      location.latitude,
      "maximum-cog-zoom",
    ]);
    const cached = cache.get(key);
    if (cached && cached.expires > Date.now()) return cached.result;
    cache.delete(key);
    // Deduplicate reads without tying one consumer's cancellation to another.
    let request = pending.get(key);
    if (!request) {
      request = limitedRead(url, location)
        .then((result) => {
          if (result.status !== "error" && cacheSize > 0) {
            cache.set(key, { result, expires: Date.now() + cacheTtlMs });
            while (cache.size > cacheSize)
              cache.delete(cache.keys().next().value!);
          }
          return result;
        })
        .finally(() => {
          pending.delete(key);
        });
      pending.set(key, request);
    }
    return request;
  }

  return async function sampleLocation(
    location: ReportLocation,
    targets: readonly SamplingTarget[],
    options: SampleOptions = {},
  ): Promise<LocationReportSamples> {
    if (
      !Number.isFinite(location.longitude) ||
      Math.abs(location.longitude) > 180 ||
      !Number.isFinite(location.latitude) ||
      Math.abs(location.latitude) > 85.0511287798066
    ) {
      throw new Error("Location must be within Web Mercator bounds");
    }
    checkAbort(options.signal);
    const coordinates = { ...location };
    const samples = new Array<LocationSample>(targets.length);
    let next = 0;
    let completed = 0;
    // Only enqueue a small batch per report, so obsolete reports do not flood the queue.
    await Promise.all(
      Array.from(
        { length: Math.min(concurrency, targets.length) },
        async () => {
          while (next < targets.length) {
            checkAbort(options.signal);
            const index = next++;
            const target = targets[index]!;
            let result: SampleValue;
            try {
              result = await sampleAsset(
                target.url,
                coordinates,
                options.signal,
              );
            } catch (error) {
              checkAbort(options.signal);
              result = {
                status: "error",
                value: null,
                message:
                  error instanceof Error
                    ? error.message
                    : "Unable to sample raster",
              };
            }
            checkAbort(options.signal);
            const classification =
              result.status === "ok"
                ? target.classifications.find(
                    (item) =>
                      (item.min == null || result.value >= item.min) &&
                      (item.max == null || result.value < item.max),
                  )
                : undefined;
            const sample = { ...target, ...result, classification };
            samples[index] = sample;
            options.onProgress?.(sample, ++completed, targets.length);
          }
        },
      ),
    );
    checkAbort(options.signal);
    return {
      location: coordinates,
      samplingPolicy: "maximum-cog-zoom",
      generatedAt: new Date().toISOString(),
      samples,
    };
  };
}

/** Uses the public COG API; values are already scaled by that library. */
export async function readCogLocation(
  url: string,
  location: ReportLocation,
  api?: Pick<
    typeof import("@geomatico/maplibre-cog-protocol"),
    "getCogMetadata" | "locationValues"
  >,
): Promise<SampleValue> {
  const { getCogMetadata, locationValues } =
    api ?? (await import("@geomatico/maplibre-cog-protocol"));
  const metadata = await getCogMetadata(url);
  if (metadata.bbox) {
    const [west, south, east, north] = metadata.bbox;
    if (
      location.longitude < west ||
      location.longitude >= east ||
      location.latitude <= south ||
      location.latitude > north
    ) {
      return { status: "outside-coverage", value: null };
    }
  }
  // Omit zoom deliberately: sample at the asset's maximum supported tile zoom.
  const [value] = await locationValues(url, location);
  const scaledNoData =
    metadata.noData == null
      ? undefined
      : metadata.noData * metadata.scale + metadata.offset;
  // The library compares transformed values to raw NoData; also check its
  // transformed sentinel to handle non-identity scale/offset correctly.
  if (!Number.isFinite(value) || value === scaledNoData) {
    return { status: "no-data", value: null };
  }
  return { status: "ok", value };
}

export const sampleLocation = createLocationSampler(readCogLocation);
