"use client";

import { useEffect, useState } from "react";

import styles from "@/styles/Home.module.css";
import type { PDORecord } from "./usePdoData";

const RESULT_PAGE_SIZE = 100;

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
  const [visibleCount, setVisibleCount] = useState(RESULT_PAGE_SIZE);
  const visibleItems = items.slice(0, visibleCount);
  const hiddenCount = Math.max(0, items.length - visibleItems.length);

  useEffect(() => {
    setVisibleCount(RESULT_PAGE_SIZE);
  }, [items]);

  return (
    <div className={styles.sidebarSection}>
      <div className={styles.sidebarSectionHeader}>
        <p className={styles.sidebarSectionEyebrow}>Results</p>
        <h3 className={styles.sidebarSectionTitle}>{title}</h3>
        {summary && <p className={styles.sidebarSectionText}>{summary}</p>}
      </div>
      <div className={styles.resultList}>
        {visibleItems.map((pdo) => (
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
      {hiddenCount > 0 ? (
        <button
          type="button"
          className={styles.showMoreResultsButton}
          onClick={() => setVisibleCount((count) => count + RESULT_PAGE_SIZE)}
        >
          Show {Math.min(RESULT_PAGE_SIZE, hiddenCount).toLocaleString()} more
          of {hiddenCount.toLocaleString()} remaining
        </button>
      ) : null}
    </div>
  );
}
