import { useId } from "react";
import { getIndicatorGlossaryHref, type Indicator } from "@/content/indicators";

import { formatReportValue, sampleStatus } from "./build-report";
import styles from "./report.module.css";
import type { LocationSample, SamplingTarget } from "./types";

export function EcosystemChart({
  indicators,
  targets,
  samples,
  loading,
}: {
  indicators: Indicator[];
  targets: SamplingTarget[];
  samples: LocationSample[];
  loading: boolean;
}) {
  const id = useId();
  const rows = indicators.map((indicator) => {
    const target = targets.find((item) => item.indicatorId === indicator.id);
    const sample = samples.find(
      (item) => item.indicatorId === indicator.id && item.url === target?.url,
    );
    return {
      indicator,
      sample,
      label: sample
        ? sampleStatus(sample)
        : loading
          ? "Loading…"
          : "Unavailable",
    };
  });
  const left = 182,
    right = 550,
    top = 22,
    rowHeight = 43;
  const bottom = top + rows.length * rowHeight;
  // Normally 0–100; expand for unexpected source values instead of clipping them.
  const min = Math.min(
    0,
    ...rows.flatMap(({ sample }) =>
      sample?.status === "ok" ? [sample.value] : [],
    ),
  );
  const max = Math.max(
    100,
    ...rows.flatMap(({ sample }) =>
      sample?.status === "ok" ? [sample.value] : [],
    ),
  );
  const x = (value: number) =>
    left + ((value - min) / (max - min)) * (right - left);
  return (
    <div className={styles.card}>
      <div className={styles.chartScroll}>
        <svg
          viewBox={`0 0 640 ${bottom + 42}`}
          className={styles.chart}
          role="img"
          aria-labelledby={id}
        >
          <title id={id}>
            {indicators[0]?.category === "ecosystem-services"
              ? "Ecosystem services"
              : "Ecosystem conditions"}
            :{" "}
            {rows
              .map(({ indicator, label }) => `${indicator.name}: ${label}`)
              .join("; ")}
            . Index scale 0–100.
          </title>
          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line
                x1={x(tick)}
                x2={x(tick)}
                y1={top - 8}
                y2={bottom - 5}
                className={styles.gridLine}
              />
              <text
                x={x(tick)}
                y={bottom + 14}
                textAnchor="middle"
                className={styles.axisText}
              >
                {tick}
              </text>
            </g>
          ))}
          <text
            x={(left + right) / 2}
            y={bottom + 33}
            textAnchor="middle"
            className={styles.axisText}
          >
            Index (0–100)
          </text>
          {rows.map(({ indicator, sample, label }, index) => {
            const y = top + index * rowHeight;
            return (
              <g key={indicator.id}>
                <a
                  href={getIndicatorGlossaryHref(indicator.id)}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.axisLink}
                >
                  <text
                    x={left - 12}
                    y={y + 16}
                    textAnchor="end"
                    className={styles.axisText}
                  >
                    {indicator.name}
                  </text>
                  <title>Definition and sources: {indicator.name}</title>
                </a>
                <rect
                  x={x(0)}
                  y={y}
                  width={x(100) - x(0)}
                  height={25}
                  rx={3}
                  fill="#487d70"
                  opacity={0.1}
                />
                {sample?.status === "ok" ? (
                  <>
                    <rect
                      x={Math.min(x(0), x(sample.value))}
                      y={y}
                      width={Math.abs(x(sample.value) - x(0))}
                      height={25}
                      rx={3}
                      fill="#487d70"
                    >
                      <title>
                        {indicator.name}: {formatReportValue(sample.value)}
                      </title>
                    </rect>
                    <text x={right + 12} y={y + 16} className={styles.axisText}>
                      {label}
                    </text>
                  </>
                ) : (
                  <text x={left + 8} y={y + 16} className={styles.axisText}>
                    {label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
