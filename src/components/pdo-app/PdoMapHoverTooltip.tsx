"use client";

import styles from "@/styles/Home.module.css";

export interface PdoHoverInfo {
  count: number;
  pdoIds: string[];
  municipality?: string;
  x: number;
  y: number;
}

interface PdoMapHoverTooltipProps {
  hoverInfo: PdoHoverInfo;
  getPdoNameById: (id: string) => string;
}

export function PdoMapHoverTooltip({
  hoverInfo,
  getPdoNameById,
}: PdoMapHoverTooltipProps) {
  return (
    <div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
      {hoverInfo.count > 1 && (
        <div style={{ marginBottom: "6px" }}>{hoverInfo.count} overlapping PDOs</div>
      )}
      {hoverInfo.pdoIds.map((pdoId, index) => (
        <span key={`${pdoId}-${index}`}>
          {getPdoNameById(pdoId)} ({pdoId})
        </span>
      ))}
      {hoverInfo.municipality && (
        <span className={styles.municName}>
          Municipality <br />
          {hoverInfo.municipality}
        </span>
      )}
    </div>
  );
}
