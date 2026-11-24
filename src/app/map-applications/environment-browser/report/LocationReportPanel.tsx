"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getIndicatorsWithMapByApp } from "@/content/indicators";

import styles from "./report.module.css";
import { ReportContent } from "./ReportContent";
import { ReportSettings } from "./ReportSettings";
import { buildSamplingTargets } from "./sample-location";
import type { ReportLocation, ReportSelection } from "./types";
import { useLocationReport } from "./useLocationReport";

const indicators = getIndicatorsWithMapByApp("environment-browser");
const defaults = [
  "mean_temperature",
  "huglin",
  "dem",
  "naturalness-index",
  "pollination",
];

export function LocationReportPanel({
  open,
  location,
  onClose,
}: {
  open: boolean;
  location: ReportLocation | null;
  onClose: () => void;
}) {
  const [selection, setSelection] = useState<ReportSelection>({
    indicatorIds: defaults.filter((id) =>
      indicators.some((item) => item.id === id),
    ),
  });
  const [retry, setRetry] = useState(0);
  const [pickingAt, setPickingAt] = useState<ReportLocation | null | undefined>(
    undefined,
  );
  const picking = pickingAt !== undefined && pickingAt === location;
  const closeRef = useRef<HTMLButtonElement>(null);
  const report = useLocationReport(open ? location : null, selection, retry);
  const targets = useMemo(
    () => buildSamplingTargets(indicators, selection),
    [selection],
  );
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus();
    };
  }, [open]);
  if (!open) return null;
  const errors = report.samples.filter(
    (sample) => sample.status === "error",
  ).length;
  return (
    <aside
      id="location-report"
      className={`${styles.panel} ${picking ? styles.picking : ""}`}
      aria-label="Location report"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <header className={styles.header}>
        <div className={styles.settingsHeader}>
          <p className={styles.eyebrow}>Report settings</p>
          <button
            ref={closeRef}
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close location report"
          >
            ×
          </button>
        </div>
        <div className={styles.pickRow}>
          <button
            type="button"
            onClick={() => setPickingAt(picking ? undefined : location)}
          >
            {picking ? "Back to report" : "Choose on map"}
          </button>
          <span className={styles.muted}>
            {picking
              ? "Click a new location to reopen the report."
              : "Click the map to update the location."}
          </span>
        </div>
        <div hidden={picking}>
          <ReportSettings
            indicators={indicators}
            selection={selection}
            onChange={setSelection}
          />
        </div>
      </header>
      <div className={styles.body} hidden={picking}>
        <div className={styles.reportHeading}>
          <p className={styles.eyebrow}>WINEMAP Explorer</p>
          <h2 id="location-report-title">Location report</h2>
          <p className={styles.muted}>
            {location
              ? `${location.latitude.toFixed(5)}°, ${location.longitude.toFixed(5)}°`
              : "Select a location on the map"}
          </p>
        </div>
        {!location ? (
          <p className={styles.empty}>
            Click a location on the map to compare its climate, terrain and
            ecosystem indicators.
          </p>
        ) : !targets.length ? (
          <p className={styles.empty}>
            Choose at least one indicator and, for climate indicators, a climate
            condition.
          </p>
        ) : (
          <>
            <div role="status" className={styles.status}>
              {report.status === "loading"
                ? `Sampling ${report.completed} of ${targets.length} layers…`
                : report.status === "error"
                  ? report.error
                  : `${report.completed} layers sampled${errors ? ` · ${errors} failed to load` : ""}`}
            </div>
            {report.status === "loading" && (
              <progress
                max={targets.length}
                value={report.completed}
                aria-label="Sampling progress"
              />
            )}
            {(errors > 0 || report.status === "error") && (
              <button
                type="button"
                onClick={() => setRetry((value) => value + 1)}
              >
                Retry failed layers
              </button>
            )}
            <ReportContent
              indicators={indicators}
              targets={targets}
              samples={report.samples}
              loading={report.status === "loading"}
            />
            <p className={styles.muted}>
              Values describe raster cells at this point; source resolutions
              vary. Climate values summarize periods, and scenarios describe
              possible futures. Δ shows absolute change from the selected
              historical baseline in the indicator’s units.
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
