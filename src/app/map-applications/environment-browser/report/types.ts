import type {
  ClassificationBreak,
  Indicator,
  IndicatorMapLayer,
} from "@/content/indicators";

export type ReportLocation = { longitude: number; latitude: number };

/** Omit combinations to include all available layers; [] excludes climate layers. */
export type ReportSelection = {
  indicatorIds: readonly string[];
  climateCombinations?: readonly { scenarioId: string; periodId: string }[];
};

export type SamplingTarget = IndicatorMapLayer & {
  indicatorId: string;
  indicatorName: string;
  category: Indicator["category"];
  unit?: string;
  label: string;
  classifications: readonly ClassificationBreak[];
};

export type SampleValue =
  | { status: "ok"; value: number }
  | { status: "no-data" | "outside-coverage"; value: null }
  | { status: "error"; value: null; message: string };

export type LocationSample = SamplingTarget &
  SampleValue & {
    classification?: ClassificationBreak;
  };

export type LocationReportSamples = {
  location: ReportLocation;
  samplingPolicy: "maximum-cog-zoom";
  generatedAt: string;
  samples: LocationSample[];
};
