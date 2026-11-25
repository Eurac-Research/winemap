"use client";

import { useEffect, useMemo, useState } from "react";
import bbox from "@turf/bbox";

import type { FeatureCollection, MultiPolygon, Polygon } from "@/types/geojson";

export type PdoAreas = FeatureCollection<
  Polygon | MultiPolygon,
  { pdoid: string }
>;
export type PdoBounds = [number, number, number, number];

export function usePdoAreas() {
  const [areas, setAreas] = useState<PdoAreas | null>(null);
  const [areaError, setAreaError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/pdo/areas.geojson", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load PDO boundaries.");
        return response.json();
      })
      .then((data: PdoAreas) => {
        if (!controller.signal.aborted) setAreas(data);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setAreaError(error.message);
      });
    return () => controller.abort();
  }, []);
  const boundsById = useMemo(
    () =>
      new Map(
        (areas?.features ?? []).map((feature) => [
          feature.properties.pdoid,
          bbox(feature) as PdoBounds,
        ]),
      ),
    [areas],
  );
  return { areas, boundsById, areaError };
}
