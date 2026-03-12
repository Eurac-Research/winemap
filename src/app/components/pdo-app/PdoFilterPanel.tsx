"use client";

import styles from "@/styles/Home.module.css";
import { PdoFilterSelect, type FilterOption } from "./PdoFilterSelect";

export interface FilterFieldConfig {
  key: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
  emptyText: string;
  onChange: (value: string | undefined) => void;
}

interface PdoFilterPanelProps {
  eyebrow: string;
  heading: string;
  filterFields: FilterFieldConfig[];
  filters: Record<string, string | undefined>;
  isLoadingData: boolean;
  filtersDisabled: boolean;
  loadError: string | null;
  onReset: () => void;
}

export function PdoFilterPanel({
  eyebrow,
  heading,
  filterFields,
  filters,
  isLoadingData,
  filtersDisabled,
  loadError,
  onReset,
}: PdoFilterPanelProps) {
  return (
    <div id="map-filter-content" className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <div className={styles.filterIntro}>
          <p className={styles.filterEyebrow}>{eyebrow}</p>
          <h2 className={styles.filterHeading}>{heading}</h2>
        </div>
        <div className={styles.filterResetWrap}>
          <button className={styles.filterResetButton} onClick={onReset}>
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
              field.key === "pdoName" && isLoadingData ? "Loading PDOs..." : undefined
            }
            value={filters[field.key]}
            options={field.options}
            onChange={field.onChange}
            disabled={filtersDisabled}
            emptyText={field.emptyText}
          />
        ))}
      </div>

      {loadError && <p className="mt-4 text-sm text-white/70">{loadError}</p>}
    </div>
  );
}
