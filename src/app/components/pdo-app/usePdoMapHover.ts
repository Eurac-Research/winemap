"use client";

import { useCallback, useMemo, useState } from "react";
import type { MapMouseEvent } from "mapbox-gl";
import type { PdoHoverInfo } from "./PdoMapHoverTooltip";

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

  const onHover = useCallback((event: MapMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;

    const pdoIds =
      features
        ?.map((feature) => {
          const pdoId = feature?.properties?.PDOid;
          return typeof pdoId === "string" ? pdoId : null;
        })
        .filter((pdoId): pdoId is string => Boolean(pdoId)) ?? [];

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
