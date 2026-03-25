"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, { type MapRef, NavigationControl, ScaleControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "@/styles/Home.module.css";
import { PdoMapLayout } from "@/app/components/pdo-app/PdoMapLayout";
import { PdoSidebarShell } from "@/app/components/pdo-app/PdoSidebarShell";

const SOURCE_ID = "climate-raster-source";
const LAYER_ID = "climate-raster-layer";
const INITIAL_VIEW_STATE = {
  longitude: 10,
  latitude: 45,
  zoom: 4,
};

const MAP_LAYERS = [
  { id: "sitscholl.huglin_1981-2010", label: "Huglin Index 1981-2010" },
  { id: "sitscholl.cni_1981-2010", label: "Cool Night Index 1981-2010" },
  { id: "sitscholl.di_1981-2010", label: "Dryness Index 1981-2010" },
] as const;

const RAMPS = {
  viridis: [
    [0, "#440154"],
    [0.25, "#3b528b"],
    [0.5, "#21918c"],
    [0.75, "#5ec962"],
    [1, "#fde725"],
  ],
  inferno: [
    [0, "#000004"],
    [0.25, "#420a68"],
    [0.5, "#932667"],
    [0.75, "#dd513a"],
    [1, "#fdea45"],
  ],
  redblue: [
    [0, "#2c7bb6"],
    [0.5, "#ffffbf"],
    [1, "#d7191c"],
  ],
} as const;

type RampKey = keyof typeof RAMPS;
type RasterLayerMetadata = {
  sourceLayerId: string | null;
  range: [number, number] | null;
  bounds: [number, number, number, number] | null;
};
type HoverInfo = {
  x: number;
  y: number;
  label: string;
};

function buildRasterPaint(ramp: RampKey, min: number, max: number) {
  const expression = [
    "interpolate",
    ["linear"],
    ["raster-value"],
  ] as mapboxgl.ExpressionSpecification;

  for (const [stop, color] of RAMPS[ramp]) {
    expression.push(min + stop * (max - min), color);
  }

  return {
    "raster-color": expression,
    "raster-color-range": [min, max] as [number, number],
  };
}

function readRasterMetadata(source: unknown): RasterLayerMetadata {
  const typedSource = source as {
    rasterLayers?: Array<{
      id?: string;
      fields?: { range?: [number, number] };
    }>;
    bounds?: [number, number, number, number];
  } | null;

  const rasterLayer = typedSource?.rasterLayers?.[0];

  return {
    sourceLayerId: rasterLayer?.id ?? null,
    range: rasterLayer?.fields?.range ?? null,
    bounds: typedSource?.bounds ?? null,
  };
}

function applyRasterPaint(
  map: mapboxgl.Map,
  ramp: RampKey,
  range: [number, number] | null,
) {
  if (!range || !map.getLayer(LAYER_ID) || range[0] === range[1]) return;

  const paint = buildRasterPaint(ramp, range[0], range[1]);
  map.setPaintProperty(LAYER_ID, "raster-color", paint["raster-color"]);
  map.setPaintProperty(LAYER_ID, "raster-color-range", paint["raster-color-range"]);
  map.setPaintProperty(LAYER_ID, "raster-opacity", .7);
  map.setPaintProperty(LAYER_ID, "raster-fade-duration", 0);
  map.triggerRepaint();
}

function extractRasterValue(result: unknown, layerName: string | null) {
  if (!result || typeof result !== "object") return null;

  const layers = result as Record<string, Record<string, number[] | null> | null>;
  const targetLayer = layerName ? layers[layerName] : Object.values(layers)[0];
  if (!targetLayer || typeof targetLayer !== "object") return null;

  const firstBand = Object.values(targetLayer)[0];
  if (!Array.isArray(firstBand) || typeof firstBand[0] !== "number") return null;

  return firstBand[0];
}

export default function ClimateExplorerPage() {
  const mapRef = useRef<MapRef>(null);
  const rampRef = useRef<RampKey>("viridis");
  const sourceLayerIdRef = useRef<string | null>(null);
  const hoverThrottleRef = useRef<number | null>(null);
  const hoverRequestIdRef = useRef(0);
  const hoverPointRef = useRef<{ point: mapboxgl.Point; lngLat: mapboxgl.LngLat } | null>(null);

  const [selectedLayerId, setSelectedLayerId] = useState(MAP_LAYERS[0]?.id ?? "");
  const [ramp, setRamp] = useState<RampKey>("viridis");
  const [mapReady, setMapReady] = useState(false);
  const [layerRanges, setLayerRanges] = useState<Record<string, [number, number]>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const selectedLayer = useMemo(
    () => MAP_LAYERS.find((layer) => layer.id === selectedLayerId) ?? MAP_LAYERS[0],
    [selectedLayerId],
  );

  useEffect(() => {
    rampRef.current = ramp;
  }, [ramp]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedLayer) return;

    const mountLayer = () => {
      const metadata = readRasterMetadata(map.getSource(SOURCE_ID));
      if (!metadata.sourceLayerId || !metadata.range) return false;

      sourceLayerIdRef.current = metadata.sourceLayerId;

      if (!map.getLayer(LAYER_ID)) {
        map.addLayer({
          id: LAYER_ID,
          type: "raster",
          source: SOURCE_ID,
          "source-layer": metadata.sourceLayerId,
          paint: {
            "raster-opacity": .7,
            "raster-fade-duration": 0,
          },
        } as mapboxgl.LayerSpecification);
      }

      setLayerRanges((current) => {
        const existing = current[selectedLayer.id];
        if (existing?.[0] === metadata.range?.[0] && existing?.[1] === metadata.range?.[1]) {
          return current;
        }

        return { ...current, [selectedLayer.id]: metadata.range };
      });

    //   if (metadata.bounds) {
    //     map.fitBounds(
    //       [
    //         [metadata.bounds[0], metadata.bounds[1]],
    //         [metadata.bounds[2], metadata.bounds[3]],
    //       ],
    //       { padding: 40, duration: 500 },
    //     );
    //   }

      applyRasterPaint(map, rampRef.current, metadata.range);
      setLoadError(null);
      setHoverInfo(null);

      return true;
    };

    if (map.getLayer(LAYER_ID)) {
      map.removeLayer(LAYER_ID);
    }
    if (map.getSource(SOURCE_ID)) {
      map.removeSource(SOURCE_ID);
    }

    sourceLayerIdRef.current = null;

    map.addSource(SOURCE_ID, {
      type: "raster-array",
      url: `mapbox://${selectedLayer.id}`,
      tileSize: 512,
    } as mapboxgl.SourceSpecification);

    if (mountLayer()) return;

    const handleSourceData = (event: mapboxgl.MapSourceDataEvent) => {
      if (event.sourceId !== SOURCE_ID || event.sourceDataType !== "metadata") return;
      if (mountLayer()) {
        map.off("sourcedata", handleSourceData);
        return;
      }

      setLoadError("Unable to derive the range for the selected climate layer.");
    };

    map.on("sourcedata", handleSourceData);

    return () => {
      map.off("sourcedata", handleSourceData);
    };
  }, [mapReady, selectedLayer]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady) return;

    applyRasterPaint(map, ramp, layerRanges[selectedLayerId] ?? null);
  }, [layerRanges, mapReady, ramp, selectedLayerId]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady) return;

    const runHoverQuery = async () => {
      hoverThrottleRef.current = null;

      const hoverPoint = hoverPointRef.current;
      const sourceLayerId = sourceLayerIdRef.current;
      if (!hoverPoint || !sourceLayerId || !map.getSource(SOURCE_ID)) return;

      const requestId = ++hoverRequestIdRef.current;

      try {
        const result = await map.queryRasterValue(SOURCE_ID, hoverPoint.lngLat, {
          layerName: sourceLayerId,
        });

        if (requestId !== hoverRequestIdRef.current) return;

        const value = extractRasterValue(result, sourceLayerId);
        setHoverInfo({
          x: hoverPoint.point.x,
          y: hoverPoint.point.y,
          label: value == null ? "No data" : value.toFixed(2),
        });
      } catch {
        if (requestId !== hoverRequestIdRef.current) return;
        setHoverInfo({
          x: hoverPoint.point.x,
          y: hoverPoint.point.y,
          label: "No data",
        });
      }
    };

    const scheduleHoverQuery = () => {
      if (hoverThrottleRef.current != null) return;
      hoverThrottleRef.current = window.setTimeout(() => {
        void runHoverQuery();
      }, 80);
    };

    const handleMouseMove = (event: mapboxgl.MapMouseEvent) => {
      hoverPointRef.current = { point: event.point, lngLat: event.lngLat };
      scheduleHoverQuery();
    };

    const handleMouseLeave = () => {
      hoverPointRef.current = null;
      hoverRequestIdRef.current += 1;
      if (hoverThrottleRef.current != null) {
        window.clearTimeout(hoverThrottleRef.current);
        hoverThrottleRef.current = null;
      }
      setHoverInfo(null);
    };

    map.on("mousemove", handleMouseMove);
    map.on("mouseout", handleMouseLeave);

    return () => {
      map.off("mousemove", handleMouseMove);
      map.off("mouseout", handleMouseLeave);
      if (hoverThrottleRef.current != null) {
        window.clearTimeout(hoverThrottleRef.current);
        hoverThrottleRef.current = null;
      }
    };
  }, [mapReady]);

  const sidebarTop = (
    <div className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <div className={styles.filterIntro}>
          <div className={styles.filterEyebrowRow}>
            <p className={styles.filterEyebrow}>Climate Explorer</p>
          </div>
        </div>
      </div>

      <section className={styles.sidebarSection}>
        <label className={styles.filterLabel} htmlFor="climate-ramp-select">
          Color ramp
        </label>
        <select
          id="climate-ramp-select"
          value={ramp}
          onChange={(event) => setRamp(event.target.value as RampKey)}
          className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#E91E63]"
        >
          <option value="viridis" className="text-black">
            Viridis
          </option>
          <option value="inferno" className="text-black">
            Inferno
          </option>
          <option value="redblue" className="text-black">
            Red-Blue
          </option>
        </select>
      </section>
    </div>
  );

  const sidebarBody = (
    <div className="space-y-6">
      <section className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHeader}>
          <p className={styles.sidebarSectionEyebrow}>Layers</p>
          <h2 className={styles.sidebarSectionTitle}>Raster Layers</h2>
        </div>
        <div className={styles.resultList}>
          {MAP_LAYERS.map((layer) => {
            const isActive = layer.id === selectedLayerId;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  setLoadError(null);
                  setHoverInfo(null);
                  setSelectedLayerId(layer.id);
                }}
                className={`${isActive ? styles.resultActiveItem : styles.resultItem}`}
                aria-pressed={isActive}
              >
                <span className={styles.resultItemTitle}>{layer.label}</span>
                <span className={styles.resultItemMeta}>
                  {isActive ? "Active layer" : "Click to view"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {loadError && (
        <section className={styles.sidebarSection}>
          <p className={styles.sidebarSectionText}>{loadError}</p>
        </section>
      )}
    </div>
  );

  const mapContent = (
    <div className="relative h-full w-full">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        onLoad={() => setMapReady(true)}
        onError={() => setLoadError("Unable to load the selected climate layer.")}
      >
        <NavigationControl position="bottom-right" visualizePitch showCompass />
        <ScaleControl position="bottom-right" />
      </Map>

      {!MAPBOX_TOKEN && (
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-black px-3 py-2 text-sm text-white">
          Missing `NEXT_PUBLIC_MAPBOX_TOKEN`
        </div>
      )}

      {hoverInfo && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg bg-black/90 px-3 py-2 text-xs text-white shadow-lg"
          style={{
            left: hoverInfo.x + 16,
            top: hoverInfo.y + 16,
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/60">
            Pixel value
          </div>
          <div className="mt-1 text-sm font-semibold">{hoverInfo.label}</div>
        </div>
      )}
    </div>
  );

  return (
    <PdoMapLayout
      sidebar={<PdoSidebarShell top={sidebarTop} body={sidebarBody} />}
      map={mapContent}
      sidebarDefaultSize={30}
      mapDefaultSize={70}
      sidebarMinSize={22}
    />
  );
}
