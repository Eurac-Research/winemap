"use client";

import { useId, useRef, useState } from "react";
import type { IndicatorMapConfig } from "@/content/indicators";
import { Popover } from "antd";
import { SlidersHorizontal, X } from "lucide-react";

import { getClimateChoices, resolveClimateChoice } from "./climate-options";
import styles from "./layers.module.css";

type Props = {
  name: string;
  config: IndicatorMapConfig;
  scenarioId: string;
  periodId: string;
  onSelect: (scenarioId: string, periodId: string) => void;
};

export function ClimateSettings({
  name,
  config,
  scenarioId,
  periodId,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const choices = getClimateChoices(config);
  const selected = resolveClimateChoice(config, scenarioId, periodId);

  if (!choices.length) return null;

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <Popover
      trigger="click"
      // Side placement supports viewport shifting; corner placement only flips.
      placement="right"
      autoAdjustOverflow
      open={open}
      onOpenChange={setOpen}
      afterOpenChange={(visible) => {
        if (visible)
          panelRef.current
            ?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
            ?.focus({ preventScroll: true });
      }}
      styles={{
        container: {
          padding: 0,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          boxShadow: "var(--shadow-soft)",
        },
      }}
      content={
        <div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-labelledby={`${id}-title`}
          className={styles.climatePanel}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              close();
            }
          }}
        >
          <div className={styles.climateHeader}>
            <div>
              <h3 id={`${id}-title`}>Climate conditions</h3>
              <p>{name}</p>
            </div>
            <button
              type="button"
              className={styles.info}
              onClick={close}
              aria-label="Close climate settings"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <p className={styles.climateDescription}>
            Explore average conditions under different possible emissions
            futures. Select an option to display this layer.
          </p>
          {config.scenarios?.map((scenario) => {
            const scenarioChoices = choices.filter(
              (choice) => choice.scenario.id === scenario.id,
            );
            if (!scenarioChoices.length) return null;
            return (
              <fieldset key={scenario.id} className={styles.climateGroup}>
                <legend>{scenario.displayLabel ?? scenario.label}</legend>
                <div className={styles.climateGrid}>
                  {scenarioChoices.map((choice) => (
                    <button
                      key={choice.key}
                      type="button"
                      aria-pressed={selected?.key === choice.key}
                      className={styles.climateChoice}
                      onClick={() => {
                        onSelect(choice.scenario.id, choice.period.id);
                        close();
                      }}
                    >
                      <span>
                        {choice.period.displayLabel ?? choice.period.label}
                      </span>
                      <small>
                        {choice.scenario.label} · {choice.period.label}
                      </small>
                    </button>
                  ))}
                </div>
              </fieldset>
            );
          })}
          <p className={styles.climateFootnote}>
            Emissions scenarios describe possible futures, not forecasts. Your
            choice carries over to other climate layers where available.
          </p>
        </div>
      }
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.info}
        aria-label={`Climate settings for ${name}`}
        title={`Climate settings for ${name}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
      >
        <SlidersHorizontal size={15} aria-hidden="true" />
      </button>
    </Popover>
  );
}
