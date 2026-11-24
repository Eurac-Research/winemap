import {
  getIndicatorGlossaryHref,
  INDICATOR_CATEGORY_LABELS,
  type Indicator,
} from "@/content/indicators";
import { Compass, Mountain, Sun, TrendingUp } from "lucide-react";

import { formatReportValue, sampleStatus } from "./build-report";
import { EcosystemChart } from "./EcosystemChart";
import styles from "./report.module.css";
import { ReportCharts } from "./ReportCharts";
import type { LocationSample, SamplingTarget } from "./types";

const terrainIcons = {
  dem: Mountain,
  aspect: Compass,
  slope: TrendingUp,
  "solar-radiation": Sun,
};
const categoryOrder = [
  "topography",
  "climate",
  "ecosystem-conditions",
  "ecosystem-services",
] as const;

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
  const findSample = (target: SamplingTarget) =>
    samples.find(
      (sample) =>
        sample.indicatorId === target.indicatorId && sample.url === target.url,
    );
  return (
    <div>
      {categoryOrder.map((category) => {
        const included = indicators.filter(
          (item) =>
            item.category === category &&
            targets.some((target) => target.indicatorId === item.id),
        );
        if (!included.length) return null;
        return (
          <section key={category}>
            <h3 className={styles.category}>
              {INDICATOR_CATEGORY_LABELS[category]}
            </h3>
            {category === "topography" ? (
              <dl className={styles.terrainGrid}>
                {included.map((indicator) => {
                  const target = targets.find(
                    (item) => item.indicatorId === indicator.id,
                  )!;
                  const sample = findSample(target);
                  const Icon =
                    terrainIcons[indicator.id as keyof typeof terrainIcons] ??
                    Mountain;
                  return (
                    <div key={indicator.id} className={styles.terrainItem}>
                      <Icon
                        size={20}
                        aria-hidden="true"
                        className={styles.terrainIcon}
                      />
                      <div>
                        <dt>
                          <a
                            href={getIndicatorGlossaryHref(indicator.id)}
                            target="_blank"
                            rel="noreferrer"
                            title={`Definition and sources: ${indicator.name}`}
                          >
                            {indicator.id === "dem"
                              ? "Elevation"
                              : indicator.name}
                          </a>
                        </dt>
                        <dd>
                          {sample?.status === "ok" ? (
                            <>
                              {formatReportValue(sample.value)}{" "}
                              <span>
                                {indicator.map?.unit}
                                {indicator.id === "aspect" ? " from north" : ""}
                              </span>
                            </>
                          ) : sample ? (
                            sampleStatus(sample)
                          ) : loading ? (
                            "Loading…"
                          ) : (
                            "Unavailable"
                          )}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            ) : category === "ecosystem-conditions" ||
              category === "ecosystem-services" ? (
              <EcosystemChart
                indicators={included}
                targets={targets}
                samples={samples}
                loading={loading}
              />
            ) : (
              included.map((indicator) => {
                const expected = targets.filter(
                  (target) => target.indicatorId === indicator.id,
                );
                const rows = expected.map(findSample);
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
                    <ReportCharts
                      indicator={indicator}
                      pendingUrls={
                        loading
                          ? expected
                              .filter((_, index) => !rows[index])
                              .map((target) => target.url)
                          : []
                      }
                      samples={expected.map(
                        (target, index) =>
                          rows[index] ?? {
                            ...target,
                            status: "no-data",
                            value: null,
                          },
                      )}
                    />
                  </article>
                );
              })
            )}
          </section>
        );
      })}
    </div>
  );
}
