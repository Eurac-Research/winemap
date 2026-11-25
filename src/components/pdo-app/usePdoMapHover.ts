"use client";

import { useCallback, useMemo, useState } from "react";

import type { PdoHoverInfo } from "./PdoMapHoverTooltip";

type HoverEvent = {
  point: { x: number; y: number };
  features?: { properties: Record<string, unknown> | null }[];
};

interface PdoHoverRecord {
  pdoid: string;
  pdoname: string;
}

export function usePdoMapHover<T extends PdoHoverRecord>(pdoData: T[]) {
  const [hoverInfo, setHoverInfo] = useState<PdoHoverInfo | null>(null);

  const pdoNameById = useMemo(
    () => new Map(pdoData.map((item) => [item.pdoid, item.pdoname])),
    [pdoData],
  );

  const getPdoNameById = useCallback(
    (id: string) => pdoNameById.get(id) ?? "Unknown PDO",
    [pdoNameById],
  );

  const onHover = useCallback((event: HoverEvent) => {
    const {
      features,
      point: { x, y },
    } = event;

    const pdoIds = Array.from(
      new Set(
        features
          ?.map((feature) => {
            const pdoId =
              feature?.properties?.pdoid ?? feature?.properties?.PDOid;
            return typeof pdoId === "string" ? pdoId : null;
          })
          .filter((pdoId): pdoId is string => Boolean(pdoId)) ?? [],
      ),
    );

    if (!pdoIds.length) {
      setHoverInfo(null);
      return;
    }

    const municipality = features?.[0]?.properties?.Name;

    setHoverInfo({
      count: pdoIds.length,
      pdoIds,
      municipality: typeof municipality === "string" ? municipality : undefined,
      x,
      y,
    });
  }, []);

  const clearHover = useCallback(() => {
    setHoverInfo(null);
  }, []);

  return {
    hoverInfo,
    getPdoNameById,
    onHover,
    clearHover,
  };
}
