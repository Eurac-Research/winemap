"use client";

import { Select } from "antd";
import type { SelectProps } from "antd";
import styles from "@/styles/Home.module.css";

export type FilterOption = NonNullable<SelectProps["options"]>[number];

interface PdoFilterSelectProps {
  label: string;
  placeholder: string;
  value?: string;
  options: FilterOption[];
  onChange: (value: string | undefined) => void;
  disabled: boolean;
  emptyText: string;
  loadingPlaceholder?: string;
}

export function PdoFilterSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled,
  emptyText,
  loadingPlaceholder,
}: PdoFilterSelectProps) {
  return (
    <div className={styles.filterField}>
      <Select
        showSearch
        allowClear
        placeholder={loadingPlaceholder ?? placeholder}
        popupMatchSelectWidth={290}
        onChange={onChange}
        options={options}
        value={value}
        className={styles.filterSelect}
        classNames={{
          popup: {
            root: styles.filterDropdown,
          },
        }}
        disabled={disabled}
        notFoundContent={emptyText}
        aria-label={label}
      />
    </div>
  );
}
