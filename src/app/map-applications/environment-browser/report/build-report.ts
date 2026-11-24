import type { Indicator } from "@/content/indicators";

import type { LocationSample } from "./types";

export function chartDomain(
  indicator: Indicator,
  samples: readonly LocationSample[],
) {
  const values = samples.flatMap((sample) =>
    sample.status === "ok" ? [sample.value] : [],
  );
  const boundaries = (indicator.map?.classifications ?? []).flatMap((item) =>
    [item.min, item.max].filter((value): value is number => value != null),
  );
  const range = indicator.map?.displayRange ?? [0, 1];
  const min = Math.min(0, range[0], ...values, ...boundaries);
  const max = Math.max(0, range[1], ...values, ...boundaries);
  return [min, max > min ? max : min + 1] as const;
}

export function baselineDifference(
  sample: LocationSample,
  samples: readonly LocationSample[],
) {
  const baseline = samples.find(
    (item) =>
      item.indicatorId === sample.indicatorId &&
      item.scenarioId === "historical" &&
      item.status === "ok",
  );
  return sample.status === "ok" &&
    sample.scenarioId &&
    sample.scenarioId !== "historical" &&
    baseline?.status === "ok"
    ? sample.value - baseline.value
    : null;
}

export const formatReportValue = (value: number) =>
  new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(value);

export function sampleStatus(sample: LocationSample) {
  if (sample.status === "ok") return formatReportValue(sample.value);
  if (sample.status === "outside-coverage") return "Outside coverage";
  if (sample.status === "error") return "Unable to load";
  return "No data";
}
