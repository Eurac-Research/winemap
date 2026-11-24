import {
  getIndicatorGlossaryHref,
  INDICATOR_CATEGORY_LABELS,
  type Indicator,
} from "@/content/indicators";

import {
  baselineDifference,
  formatReportValue,
  sampleStatus,
} from "./build-report";
import styles from "./report.module.css";
import { ReportCharts } from "./ReportCharts";
import type { LocationSample, SamplingTarget } from "./types";

export function ReportContent({
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
  return (
    <div className={styles.sections}>
      {[...new Set(indicators.map((item) => item.category))].map((category) => {
        const included = indicators.filter(
          (item) =>
            item.category === category &&
            targets.some((target) => target.indicatorId === item.id),
        );
        return included.length ? (
          <section key={category}>
            <h3 className={styles.category}>
              {INDICATOR_CATEGORY_LABELS[category]}
            </h3>
            {included.map((indicator) => {
              const expected = targets.filter(
                (target) => target.indicatorId === indicator.id,
              );
              const rows = expected.map((target) =>
                samples.find(
                  (sample) =>
                    sample.indicatorId === target.indicatorId &&
                    sample.url === target.url,
                ),
              );
              const values = rows.filter(
                (sample): sample is LocationSample => sample != null,
              );
              const climate = expected.some((target) => target.scenarioId);
              return (
                <article key={indicator.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h4>{indicator.name}</h4>
                    <a
                      href={getIndicatorGlossaryHref(indicator.id)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Definition & sources ↗
                    </a>
                  </div>
                  {indicator.subtitle && (
                    <p className={styles.muted}>{indicator.subtitle}</p>
                  )}
                  {climate || indicator.map?.classifications?.length ? (
                    <ReportCharts
                      indicator={indicator}
                      samples={expected.map(
                        (target, index) =>
                          rows[index] ?? {
                            ...target,
                            status: "no-data",
                            value: null,
                          },
                      )}
                    />
                  ) : values[0]?.status === "ok" ? (
                    indicator.id === "aspect" ? (
                      <div className={styles.aspect}>
                        <span
                          aria-hidden="true"
                          style={{
                            display: "inline-block",
                            transform: `rotate(${values[0].value}deg)`,
                          }}
                        >
                          ↑
                        </span>
                        <strong>{formatReportValue(values[0].value)}°</strong>{" "}
                        clockwise from north
                      </div>
                    ) : (
                      <div className={styles.metric}>
                        <strong>{formatReportValue(values[0].value)}</strong>{" "}
                        {indicator.map?.unit ?? "Index (0–100)"}
                        {!indicator.map?.unit && (
                          <meter
                            min={0}
                            max={100}
                            value={values[0].value}
                            aria-label={indicator.name}
                          />
                        )}
                      </div>
                    )
                  ) : null}
                  <div className={styles.tableScroll}>
                    <table>
                      <caption className={styles.srOnly}>
                        {indicator.name} sampled values
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Conditions</th>
                          <th scope="col">
                            Value
                            {indicator.map?.unit
                              ? ` (${indicator.map.unit})`
                              : " (index)"}
                          </th>
                          {climate && <th scope="col">Δ baseline</th>}
                          {!!indicator.map?.classifications?.length && (
                            <th scope="col">Class</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {expected.map((target, index) => {
                          const sample = rows[index];
                          const difference = sample
                            ? baselineDifference(sample, values)
                            : null;
                          return (
                            <tr key={target.url}>
                              <th scope="row">
                                {climate ? target.label : "Selected point"}
                              </th>
                              <td>
                                {sample
                                  ? sampleStatus(sample)
                                  : loading
                                    ? "Loading…"
                                    : "Unavailable"}
                              </td>
                              {climate && (
                                <td>
                                  {difference == null
                                    ? "—"
                                    : `${difference > 0 ? "+" : ""}${formatReportValue(difference)}`}
                                </td>
                              )}
                              {!!indicator.map?.classifications?.length && (
                                <td>{sample?.classification?.label ?? "—"}</td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </article>
              );
            })}
          </section>
        ) : null;
      })}
    </div>
  );
}
