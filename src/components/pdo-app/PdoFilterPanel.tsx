"use client";

import type { ReactNode } from "react";

import { MapApplicationHelpButton } from "@/components/maps/MapApplicationHelp";
import styles from "@/styles/Home.module.css";
import { PdoFilterSelect, type FilterOption } from "./PdoFilterSelect";

export interface FilterFieldConfig<TKey extends string = string> {
  key: TKey;
  label: string;
  placeholder: string;
  options: FilterOption[];
  emptyText: string;
  onChange: (value: string | undefined) => void;
}

interface PdoFilterPanelProps<TKey extends string> {
  eyebrow: string;
  heading: string;
  helpContent?: ReactNode;
  filterFields: FilterFieldConfig<TKey>[];
  filters: Partial<Record<TKey, string | undefined>>;
  isLoadingData: boolean;
  filtersDisabled: boolean;
  loadError: string | null;
  onReset: () => void;
}

export function PdoFilterPanel<TKey extends string>({
  eyebrow,
  heading,
  helpContent,
  filterFields,
  filters,
  isLoadingData,
  filtersDisabled,
  loadError,
  onReset,
}: PdoFilterPanelProps<TKey>) {
  return (
    <div id="map-filter-content" className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <div className={styles.filterIntro}>
          <div className={styles.filterEyebrowRow}>
            <p className={styles.filterEyebrow}>{eyebrow}</p>
            {helpContent ? (
              <MapApplicationHelpButton ariaLabel={`Open help for ${heading}`}>
                {helpContent}
              </MapApplicationHelpButton>
            ) : null}
          </div>
          <h2 className={styles.filterHeading}>{heading}</h2>
        </div>
        <div className={styles.filterResetWrap}>
          <button
            type="button"
            className={styles.filterResetButton}
            onClick={onReset}
          >
            reset
          </button>
        </div>
      </div>

      <div className={styles.filterFields}>
        {filterFields.map((field) => (
          <PdoFilterSelect
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            loadingPlaceholder={
              field.key === "pdoName" && isLoadingData
                ? "Loading PDOs..."
                : undefined
            }
            value={filters[field.key]}
            options={field.options}
            onChange={field.onChange}
            disabled={filtersDisabled}
            emptyText={field.emptyText}
          />
        ))}
      </div>

      {loadError && (
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
          {loadError}
        </p>
      )}
    </div>
  );
}
