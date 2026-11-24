import {
  INDICATOR_CATEGORY_LABELS,
  type Indicator,
} from "@/content/indicators";

import { getClimateChoices } from "../climate-options";
import styles from "./report.module.css";
import type { ReportSelection } from "./types";

export function ReportSettings({
  indicators,
  selection,
  onChange,
}: {
  indicators: Indicator[];
  selection: ReportSelection;
  onChange: (selection: ReportSelection) => void;
}) {
  const categories = [...new Set(indicators.map((item) => item.category))];
  const choices = [
    ...new Map(
      indicators
        .flatMap((item) => getClimateChoices(item.map))
        .map((choice) => [choice.key, choice]),
    ).values(),
  ];
  const selectedChoices =
    selection.climateCombinations ??
    choices.map(({ scenario, period }) => ({
      scenarioId: scenario.id,
      periodId: period.id,
    }));
  return (
    <details className={styles.settings}>
      <summary>
        Configure report · {selection.indicatorIds.length}{" "}
        {selection.indicatorIds.length === 1 ? "indicator" : "indicators"}
      </summary>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...selection,
              indicatorIds: indicators.map((item) => item.id),
            })
          }
        >
          Select all
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...selection, indicatorIds: [] })}
        >
          Clear all
        </button>
      </div>
      <div className={styles.settingsGrid}>
        {categories.map((category) => (
          <fieldset key={category}>
            <legend>{INDICATOR_CATEGORY_LABELS[category]}</legend>
            {indicators
              .filter((item) => item.category === category)
              .map((item) => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    checked={selection.indicatorIds.includes(item.id)}
                    onChange={(event) =>
                      onChange({
                        ...selection,
                        indicatorIds: event.target.checked
                          ? [...selection.indicatorIds, item.id]
                          : selection.indicatorIds.filter(
                              (id) => id !== item.id,
                            ),
                      })
                    }
                  />
                  {item.name}
                </label>
              ))}
          </fieldset>
        ))}
      </div>
      <fieldset>
        <legend>Climate conditions</legend>
        <p className={styles.muted}>
          Include the historical baseline to show changes from it.
        </p>
        {choices.map(({ key, scenario, period }) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={selectedChoices.some(
                (item) =>
                  item.scenarioId === scenario.id &&
                  item.periodId === period.id,
              )}
              onChange={(event) =>
                onChange({
                  ...selection,
                  climateCombinations: event.target.checked
                    ? [
                        ...selectedChoices,
                        { scenarioId: scenario.id, periodId: period.id },
                      ]
                    : selectedChoices.filter(
                        (item) =>
                          !(
                            item.scenarioId === scenario.id &&
                            item.periodId === period.id
                          ),
                      ),
                })
              }
            />
            {scenario.label} · {period.label}
          </label>
        ))}
      </fieldset>
    </details>
  );
}
