import { useId } from "react";
import type { Indicator } from "@/content/indicators";

import {
  baselineDifference,
  chartDomain,
  formatReportValue,
  sampleStatus,
} from "./build-report";
import styles from "./report.module.css";
import type { LocationSample } from "./types";

const colors: Record<string, string> = {
  historical: "#496d83",
  ssp370: "#bd702c",
  ssp585: "#99475f",
};

/** SVG keeps class boundaries exact and charts sharp at every display size. */
export function ReportCharts({
  indicator,
  samples,
  pendingUrls = [],
}: {
  indicator: Indicator;
  samples: LocationSample[];
  pendingUrls?: string[];
}) {
  const titleId = useId();
  const [min, max] = chartDomain(indicator, samples);
  const classes = indicator.map?.classifications ?? [];
  const left = 58,
    top = 26,
    bottom = 292,
    right = classes.length ? 435 : 610;
  const y = (value: number) =>
    bottom - ((value - min) / (max - min)) * (bottom - top);
  const step = (right - left) / Math.max(samples.length, 1);

  return (
    <div className={styles.chartScroll}>
      <svg
        viewBox="0 0 640 395"
        className={styles.chart}
        role="img"
        aria-labelledby={titleId}
      >
        <title id={titleId}>
          {indicator.name}:{" "}
          {samples
            .map((sample) => {
              const difference = baselineDifference(sample, samples);
              return `${sample.label}: ${pendingUrls.includes(sample.url) ? "Loading" : sampleStatus(sample)} ${sample.unit ?? ""}${sample.classification ? `, ${sample.classification.label}` : ""}${difference == null ? "" : `, change from baseline ${formatReportValue(difference)}`}`;
            })
            .join("; ")}
        </title>
        <text x={left} y={15} className={styles.axisText}>
          {indicator.map?.unit ?? "Index (0–100)"}
        </text>
        {classes.map((item, index) => {
          const low = Math.max(min, item.min ?? min);
          const high = Math.min(max, item.max ?? max);
          return high > low ? (
            <g key={item.label}>
              <rect
                x={left}
                y={y(high)}
                width={right - left}
                height={y(low) - y(high)}
                fill={index % 2 ? "#789b9a" : "#a5b9c7"}
                opacity={index % 2 ? 0.22 : 0.12}
              />
              <line
                x1={left}
                x2={right}
                y1={y(low)}
                y2={y(low)}
                className={styles.gridLine}
              />
              <text
                x={right + 10}
                y={(y(low) + y(high)) / 2 + 4}
                className={styles.axisText}
              >
                {item.label}
              </text>
            </g>
          ) : null;
        })}
        {(classes.length
          ? [
              ...new Set([
                min,
                max,
                ...classes.flatMap((item) =>
                  [item.min, item.max].filter((v): v is number => v != null),
                ),
              ]),
            ]
          : Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4)
        ).map((tick) => (
          <g key={tick}>
            <line
              x1={left}
              x2={right}
              y1={y(tick)}
              y2={y(tick)}
              className={styles.gridLine}
            />
            <text
              x={left - 7}
              y={y(tick) + 4}
              textAnchor="end"
              className={styles.axisText}
            >
              {formatReportValue(tick)}
            </text>
          </g>
        ))}
        <line
          x1={left}
          x2={right}
          y1={y(0)}
          y2={y(0)}
          stroke="currentColor"
          opacity={0.6}
        />
        {samples.map((sample, index) => {
          const x = left + step * (index + 0.5);
          const value = sample.status === "ok" ? sample.value : null;
          const difference = baselineDifference(sample, samples);
          return (
            <g key={sample.url}>
              {value != null ? (
                <>
                  <rect
                    x={x - Math.min(36, step * 0.28)}
                    y={Math.min(y(0), y(value))}
                    width={Math.min(72, step * 0.56)}
                    height={Math.max(1, Math.abs(y(0) - y(value)))}
                    fill={colors[sample.scenarioId ?? ""] ?? "#487d70"}
                  >
                    <title>
                      {sample.label}: {formatReportValue(value)} {sample.unit}{" "}
                      {sample.classification?.label}
                    </title>
                  </rect>
                  <text
                    x={x}
                    y={
                      value >= 0
                        ? Math.max(23, y(value) - 5)
                        : Math.min(bottom + 12, y(value) + 14)
                    }
                    textAnchor="middle"
                    className={styles.axisText}
                  >
                    {formatReportValue(value)}
                  </text>
                </>
              ) : (
                <text
                  x={x}
                  y={y(0) - 7}
                  textAnchor="middle"
                  className={styles.axisText}
                >
                  {pendingUrls.includes(sample.url)
                    ? "Loading…"
                    : sample.status === "outside-coverage"
                      ? "Outside area"
                      : sampleStatus(sample)}
                </text>
              )}
              <text
                x={x}
                y={bottom + 26}
                textAnchor="middle"
                className={styles.axisText}
              >
                {sample.scenarioId === "historical"
                  ? "Historical"
                  : (sample.scenarioId
                      ?.toUpperCase()
                      .replace("SSP370", "SSP3-7.0")
                      .replace("SSP585", "SSP5-8.5") ?? "Selected point")}
              </text>
              <text
                x={x}
                y={bottom + 44}
                textAnchor="middle"
                className={styles.axisText}
              >
                {sample.periodId ?? ""}
              </text>
              <text
                x={x}
                y={bottom + 63}
                textAnchor="middle"
                className={styles.axisText}
              >
                {difference == null
                  ? ""
                  : `Δ ${difference > 0 ? "+" : ""}${formatReportValue(difference)}`}
              </text>
            </g>
          );
        })}
        {samples.some(
          (sample) => baselineDifference(sample, samples) != null,
        ) && (
          <text x={left} y={bottom + 88} className={styles.axisText}>
            Δ change from historical baseline ({indicator.map?.unit ?? "index"})
          </text>
        )}
      </svg>
    </div>
  );
}
