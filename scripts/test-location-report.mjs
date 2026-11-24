import assert from "node:assert/strict";
import { test } from "node:test";

import {
  baselineDifference,
  chartDomain,
  sampleStatus,
} from "../src/app/map-applications/environment-browser/report/build-report.ts";

const indicator = {
  map: {
    displayRange: [-150, 200],
    classifications: [
      { label: "Dry", max: -100 },
      { label: "Moderate", min: -100, max: 50 },
      { label: "Humid", min: 50 },
    ],
  },
};
const baseline = {
  indicatorId: "di",
  scenarioId: "historical",
  status: "ok",
  value: 0,
};
const future = {
  indicatorId: "di",
  scenarioId: "ssp370",
  status: "ok",
  value: -125,
};

test("bar domain includes zero, negative values, classes and values beyond the legend range", () => {
  assert.deepEqual(chartDomain(indicator, [baseline, future]), [-150, 200]);
  assert.deepEqual(
    chartDomain(indicator, [{ ...future, value: 350 }]),
    [-150, 350],
  );
  assert.deepEqual(
    chartDomain({ map: { displayRange: [10, 10] } }, []),
    [0, 10],
  );
  assert.deepEqual(chartDomain({ map: { displayRange: [0, 0] } }, []), [0, 1]);
});
test("absolute baseline differences preserve zero and do not mix indicators", () => {
  assert.equal(baselineDifference(future, [baseline, future]), -125);
  assert.equal(baselineDifference(baseline, [baseline]), null);
  assert.equal(baselineDifference(future, [future]), null);
  assert.equal(
    baselineDifference(future, [{ ...baseline, indicatorId: "other" }]),
    null,
  );
  assert.equal(
    baselineDifference({ ...future, status: "no-data", value: null }, [
      baseline,
    ]),
    null,
  );
});
test("missing and failed data are not formatted as zero", () => {
  assert.equal(sampleStatus(baseline), "0");
  assert.equal(sampleStatus({ status: "no-data", value: null }), "No data");
  assert.equal(
    sampleStatus({ status: "outside-coverage", value: null }),
    "Outside coverage",
  );
  assert.equal(
    sampleStatus({ status: "error", value: null }),
    "Unable to load",
  );
});
