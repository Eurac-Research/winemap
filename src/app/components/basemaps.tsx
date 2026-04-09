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
        cartoLabels: {
          type: "raster",
          tiles: [
            "https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
            "https://c.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
            "https://d.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution:
            "Map tiles by CARTO, data by OpenStreetMap contributors",
        },
      },
      layers: [
        {
          id: "esri-hillshade",
          type: "raster",
          source: "esriHillshade",
        },
        {
          id: "carto-terrain-labels",
          type: "raster",
          source: "cartoLabels",
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
