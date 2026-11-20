"use client";

import {
  boundaryCasingId,
  boundaryLayerId,
  type BoundaryOverlay,
} from "@/content/maps/boundaries";
import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  overlays: readonly BoundaryOverlay[];
  visibleIds: readonly string[];
};

export function MapLibreBoundaryLayers({ overlays, visibleIds }: Props) {
  return (
    <>
      {overlays
        .filter((overlay) => visibleIds.includes(overlay.id))
        .map((overlay) => (
          <Source
            key={overlay.id}
            id={`boundary-${overlay.id}-source`}
            type="geojson"
            data={overlay.url}
            attribution={overlay.attribution}
          >
            <Layer
              id={boundaryCasingId(overlay.id)}
              type="line"
              paint={{
                "line-color": "#ffffff",
                "line-width": overlay.width + 2,
                "line-opacity": 0.9,
              }}
            />
            <Layer
              id={boundaryLayerId(overlay.id)}
              type="line"
              paint={{
                "line-color": overlay.color,
                "line-width": overlay.width,
                ...(overlay.dashArray
                  ? { "line-dasharray": overlay.dashArray }
                  : {}),
              }}
            />
          </Source>
        ))}
    </>
  );
}
