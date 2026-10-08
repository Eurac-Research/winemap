import type {
  StyleSpecification,
} from "maplibre-gl";

export type BasemapOption = {
  id: string;
  label: string;
  style: string | StyleSpecification;
};

export const BASEMAPS: readonly BasemapOption[] = [
  {
  id: "terrain",
  label: "Terrain basemap",
  style: {
    version: 8,
    sources: {
      esriHillshade: {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution:
          "Source: Esri, USGS, NGA, NASA, CGIAR, and the GIS User Community",
      },
      esriReference: {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "Esri and its data providers",
      },
    },
    layers: [
      {
        id: "esri-hillshade",
        type: "raster",
        source: "esriHillshade",
      },
      {
        id: "esri-reference",
        type: "raster",
        source: "esriReference",
      },
    ],
  },
  },
  {
    id: "light",
    label: "Light basemap",
    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  },
  {
    id: "streets",
    label: "Street basemap",
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  },
  {
    id: "satellite",
    label: "Satellite basemap",
    style: {
      version: 8,
      sources: {
        esriSatellite: {
          type: "raster",
          tiles: [
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          ],
          tileSize: 256,
          attribution:
            "Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
        },
      },
      layers: [
        {
          id: "esri-satellite",
          type: "raster",
          source: "esriSatellite",
        },
      ],
    },
  },
] as const;
