"use client";

import { useCallback } from "react";
import type { MapRef } from "react-map-gl/mapbox";
import bbox from "@turf/bbox";
import type { PdoPointFeature } from "./usePdoData";

interface MapViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface MapPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface UsePdoMapFilteringProps {
  mapRef: React.RefObject<MapRef | null>;
  pointFeatureByPdoId: Map<string, PdoPointFeature>;
  initialViewState: MapViewState;
  defaultPadding: MapPadding;
}

export function usePdoMapFiltering({
  mapRef,
  pointFeatureByPdoId,
  initialViewState,
  defaultPadding,
}: UsePdoMapFilteringProps) {
  const resetMapView = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    map
      .setFilter("pdo-area", null)
      .setFilter("pdo-pins", null)
      .setCenter([initialViewState.longitude, initialViewState.latitude])
      .zoomTo(initialViewState.zoom, {
        duration: 1000,
        offset: [100, 50],
      });
  }, [initialViewState, mapRef]);

  const fitMapToPdoIds = useCallback(
    (pdoIds: string[]) => {
      if (!pdoIds.length || !mapRef.current) return;

      const matchingFeatures = pdoIds
        .map((id) => pointFeatureByPdoId.get(id))
        .filter((feature): feature is PdoPointFeature => Boolean(feature));

      if (!matchingFeatures.length) return;

      const [minLng, minLat, maxLng, maxLat] = bbox({
        type: "FeatureCollection",
        features: matchingFeatures,
      });

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: defaultPadding,
          duration: 500,
          maxZoom: 8,
        },
      );
    },
    [defaultPadding, mapRef, pointFeatureByPdoId],
  );

  const showPdoIdsOnMap = useCallback(
    (pdoIds: string[]) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      if (!pdoIds.length) {
        resetMapView();
        return;
      }

      map
        .setFilter("pdo-area", ["match", ["get", "PDOid"], pdoIds, true, false])
        .setFilter("pdo-pins", ["match", ["get", "PDOid"], pdoIds, true, false]);

      fitMapToPdoIds(pdoIds);
    },
    [fitMapToPdoIds, mapRef, resetMapView],
  );

  return {
    resetMapView,
    showPdoIdsOnMap,
  };
}
