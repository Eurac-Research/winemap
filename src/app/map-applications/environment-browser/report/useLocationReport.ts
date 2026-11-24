"use client";

import { useEffect, useRef, useState } from "react";
import { getIndicatorsWithMapByApp } from "@/content/indicators";

import { buildSamplingTargets, sampleLocation } from "./sample-location";
import type {
  LocationReportSamples,
  LocationSample,
  ReportLocation,
  ReportSelection,
} from "./types";

type ReportState = {
  status: "idle" | "loading" | "complete" | "error";
  samples: LocationSample[];
  completed: number;
  total: number;
  report: LocationReportSamples | null;
  error: string | null;
};

const idle: ReportState = {
  status: "idle",
  samples: [],
  completed: 0,
  total: 0,
  report: null,
  error: null,
};

/** Report selections are independent of the currently displayed map layer. */
export function useLocationReport(
  location: ReportLocation | null,
  selection: ReportSelection,
) {
  // Compare by content: inline selection objects must not restart sampling.
  const requestKey = JSON.stringify({ location, selection });
  const generation = useRef(0);
  const [state, setState] = useState<ReportState & { requestKey: string }>({
    ...idle,
    requestKey,
  });

  useEffect(() => {
    const request = JSON.parse(requestKey) as {
      location: ReportLocation | null;
      selection: ReportSelection;
    };
    const id = ++generation.current;
    const controller = new AbortController();
    if (!request.location) return () => controller.abort();

    void (async () => {
      try {
        const targets = buildSamplingTargets(
          getIndicatorsWithMapByApp("environment-browser"),
          request.selection,
        );
        setState({
          ...idle,
          status: "loading",
          total: targets.length,
          requestKey,
        });
        const report = await sampleLocation(request.location!, targets, {
          signal: controller.signal,
          onProgress: (sample, completed, total) => {
            if (generation.current !== id || controller.signal.aborted) return;
            setState((previous) => ({
              ...previous,
              samples: [...previous.samples, sample],
              completed,
              total,
            }));
          },
        });
        if (generation.current !== id || controller.signal.aborted) return;
        setState({
          status: "complete",
          samples: report.samples,
          completed: targets.length,
          total: targets.length,
          report,
          error: null,
          requestKey,
        });
      } catch (error) {
        if (generation.current !== id || controller.signal.aborted) return;
        setState({
          ...idle,
          status: "error",
          requestKey,
          error:
            error instanceof Error
              ? error.message
              : "Unable to sample location",
        });
      }
    })();
    return () => controller.abort();
  }, [requestKey]);

  // Never expose the previous location's values while a new effect is pending.
  return state.requestKey === requestKey && location
    ? state
    : { ...idle, status: location ? ("loading" as const) : ("idle" as const) };
}
