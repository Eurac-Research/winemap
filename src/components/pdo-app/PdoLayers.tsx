"use client";

import { PDO_MAP_STYLE as style } from "@/content/maps/pdo";
import type { FilterSpecification } from "maplibre-gl";
import { Layer, Source } from "react-map-gl/maplibre";

import type { PdoAreas } from "./usePdoAreas";
import type { PdoPointCollection } from "./usePdoData";

type Props = {
  points: PdoPointCollection | null;
  areas: PdoAreas | null;
  visibleIds: string[] | null;
  selectedId: string | null;
};

export function PdoLayers({ points, areas, visibleIds, selectedId }: Props) {
  const filter: FilterSpecification =
    visibleIds === null
      ? ["has", "pdoid"]
      : ["in", ["get", "pdoid"], ["literal", visibleIds]];
  const selected: FilterSpecification = [
    "==",
    ["get", "pdoid"],
    selectedId ?? "",
  ];
  return (
    <>
      {points && (
        <Source id="pdo-points-source" type="geojson" data={points}>
          <Layer
            id="pdo-pins"
            type="circle"
            maxzoom={areas ? style.polygonMinZoom : 24}
            filter={filter}
            paint={{
              "circle-color": style.pointColor,
              "circle-radius": style.pointRadius,
              "circle-stroke-color": "#ffffff",
              "circle-stroke-width": 1.5,
            }}
          />
        </Source>
      )}
      {areas && (
        <Source id="pdo-areas-source" type="geojson" data={areas}>
          <Layer
            id="pdo-area"
            type="fill"
            minzoom={style.polygonMinZoom}
            filter={filter}
            paint={{
              "fill-color": style.polygonColor,
              "fill-opacity": style.polygonOpacity,
            }}
          />
          <Layer
            id="pdo-outline"
            type="line"
            minzoom={style.polygonMinZoom}
            filter={filter}
            paint={{
              "line-color": style.outlineColor,
              "line-width": style.outlineWidth,
            }}
          />
          <Layer
            id="pdo-selected"
            type="line"
            filter={selected}
            paint={{
              "line-color": style.selectedColor,
              "line-width": style.selectedOutlineWidth,
            }}
          />
        </Source>
      )}
    </>
  );
}
