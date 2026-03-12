"use client";

import styles from "@/styles/Home.module.css";
import type { PDORecord } from "./usePdoData";

interface PdoResultsListProps {
  title: string;
  summary?: string | null;
  items: PDORecord[];
  onSelect: (pdoId: string) => void;
}

export function PdoResultsList({
  title,
  summary,
  items,
  onSelect,
}: PdoResultsListProps) {
  return (
    <div className={styles.sidebarSection}>
      <div className={styles.sidebarSectionHeader}>
        <p className={styles.sidebarSectionEyebrow}>Results</p>
        <h3 className={styles.sidebarSectionTitle}>{title}</h3>
        {summary && <p className={styles.sidebarSectionText}>{summary}</p>}
      </div>
      <div className={styles.resultList}>
        {items.map((pdo) => (
          <button
            key={pdo.pdoid}
            type="button"
            className={styles.resultItem}
            onClick={() => onSelect(pdo.pdoid)}
          >
            <span className={styles.resultItemTitle}>{pdo.pdoname}</span>
            <span className={styles.resultItemMeta}>
              {pdo.country} · {pdo.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
