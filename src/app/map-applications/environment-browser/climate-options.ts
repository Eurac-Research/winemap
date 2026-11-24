import type { IndicatorMapConfig } from "@/content/indicators";

export function getClimateChoices(config?: IndicatorMapConfig) {
  return (config?.scenarios ?? []).flatMap((scenario) =>
    (config?.periods ?? []).flatMap((period) => {
      const layer = config?.layers.find(
        (item) =>
          item.scenarioId === scenario.id && item.periodId === period.id,
      );
      return layer
        ? [
            {
              scenario,
              period,
              layer,
              key: `${scenario.id}:${period.id}`,
            },
          ]
        : [];
    }),
  );
}

export function resolveClimateChoice(
  config: IndicatorMapConfig | undefined,
  scenarioId: string,
  periodId: string,
) {
  const choices = getClimateChoices(config);
  return (
    choices.find(
      (choice) =>
        choice.scenario.id === scenarioId && choice.period.id === periodId,
    ) ??
    choices.find(
      (choice) =>
        choice.scenario.id === config?.defaultScenarioId &&
        choice.period.id === config?.defaultPeriodId,
    ) ??
    choices[0]
  );
}
