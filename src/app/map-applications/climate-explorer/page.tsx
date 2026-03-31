"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  cogProtocol,
  locationValues,
  setColorFunction,
} from "@geomatico/maplibre-cog-protocol";
import type {
  CogMetadata,
  TypedArray,
} from "@geomatico/maplibre-cog-protocol/dist/types/types";
import maplibregl from "maplibre-gl";
import type { LngLat, MapMouseEvent, PointLike } from "maplibre-gl";
import Map, {
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import { PdoMapLayout } from "@/app/components/pdo-app/PdoMapLayout";
import { PdoSidebarShell } from "@/app/components/pdo-app/PdoSidebarShell";
import styles from "@/styles/Home.module.css";

const BASEMAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const SOURCE_ID = "climate-raster-source";
const LAYER_ID = "climate-raster-layer";
const LEGEND_RAMP_HEIGHT = 160;
const INITIAL_VIEW_STATE = {
  longitude: 10,
  latitude: 45,
  zoom: 4,
};

const MAP_LAYERS = [
  {
    id: "huglin_1981-2010",
    label: "Huglin Index 1981-2010",
    url: "https://pub-7fe518f63b9f4e28b80569979cc136fc.r2.dev/huglin_1981-2010.tiff",
    range: [0, 3500] as [number, number],
  },
  {
    id: "cni_1981-2010",
    label: "Cool Night Index 1981-2010",
    url: "https://pub-7fe518f63b9f4e28b80569979cc136fc.r2.dev/cni_1981-2010.tiff",
    range: [-5, 25] as [number, number],
  },
  {
    id: "di_1981-2010",
    label: "Dryness Index 1981-2010",
    url: "https://pub-7fe518f63b9f4e28b80569979cc136fc.r2.dev/di_1981-2010.tiff",
    range: [-60, 200] as [number, number],
  },
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
type LayerId = (typeof MAP_LAYERS)[number]["id"];
type ClassificationBreak = {
  label: string;
  min?: number;
  max?: number;
};
type HoverInfo = {
  x: number;
  y: number;
  value: number | null;
  label: string;
};

const LAYER_CLASSIFICATIONS: Partial<Record<LayerId, ClassificationBreak[]>> = {
  "huglin_1981-2010": [
    { label: "Too cool", max: 1200 },
    { label: "Very cool", min: 1200, max: 1500 },
    { label: "Cool", min: 1500, max: 1800 },
    { label: "Temperate", min: 1800, max: 2100 },
    { label: "Warm temperate", min: 2100, max: 2400 },
    { label: "Warm", min: 2400, max: 2700 },
    { label: "Very warm", min: 2700, max: 3000 },
    { label: "Too hot", min: 3000 },
  ],
  "cni_1981-2010": [
    { label: "Very cool", max: 12 },
    { label: "Cool", min: 12, max: 14 },
    { label: "Temperate", min: 14, max: 18 },
    { label: "Warm", min: 18 },
  ],
  "di_1981-2010": [
    { label: "Very dry", max: -100 },
    { label: "Moderately dry", min: -100, max: 50 },
    { label: "Subhumid", min: 50, max: 150 },
    { label: "Humid", min: 150 },
  ],
};

let cogProtocolRegistered = false;
if (!cogProtocolRegistered) {
  maplibregl.addProtocol("cog", cogProtocol);
  cogProtocolRegistered = true;
}

function formatLegendValue(value: number) {
  if (!Number.isFinite(value)) return "N/A";
  if (Math.abs(value) >= 100 || Number.isInteger(value)) {
    return value.toFixed(0);
  }

  return value.toFixed(1);
}

function matchesClassBreak(value: number, classBreak: ClassificationBreak) {
  const meetsMin = classBreak.min == null || value >= classBreak.min;
  const meetsMax = classBreak.max == null || value < classBreak.max;
  return meetsMin && meetsMax;
}

function getBreakOffset(value: number, range: [number, number]) {
  const [min, max] = range;
  if (max <= min) return `${LEGEND_RAMP_HEIGHT}px`;

  const normalized = (value - min) / (max - min);
  const clamped = Math.min(1, Math.max(0, normalized));
  return `${Math.round((1 - clamped) * LEGEND_RAMP_HEIGHT)}px`;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function buildRampInterpolator(ramp: RampKey, range: [number, number]) {
  const [min, max] = range;
  const stops = RAMPS[ramp].map(([stop, color]) => ({
    stop,
    rgb: hexToRgb(color),
  }));

  return (value: number, color: Uint8ClampedArray) => {
    if (!Number.isFinite(value)) {
      color.set([0, 0, 0, 0]);
      return;
    }

    const normalized = Math.min(1, Math.max(0, (value - min) / (max - min)));

    for (let index = 1; index < stops.length; index += 1) {
      const previous = stops[index - 1];
      const current = stops[index];

      if (normalized > current.stop) continue;

      const segmentSpan = current.stop - previous.stop || 1;
      const segmentOffset = (normalized - previous.stop) / segmentSpan;
      color[0] = Math.round(
        previous.rgb[0] + (current.rgb[0] - previous.rgb[0]) * segmentOffset,
      );
      color[1] = Math.round(
        previous.rgb[1] + (current.rgb[1] - previous.rgb[1]) * segmentOffset,
      );
      color[2] = Math.round(
        previous.rgb[2] + (current.rgb[2] - previous.rgb[2]) * segmentOffset,
      );
      color[3] = 255;
      return;
    }

    const last = stops[stops.length - 1]!;
    color[0] = last.rgb[0];
    color[1] = last.rgb[1];
    color[2] = last.rgb[2];
    color[3] = 255;
  };
}

function applyScaleOffset(value: number, metadata: CogMetadata) {
  const scale = metadata.scale ?? 1;
  const offset = metadata.offset ?? 0;
  return offset + value * scale;
}

function isNoDataValue(value: number, noData: number | undefined) {
  if (Number.isNaN(value)) return true;
  if (noData == null) return false;
  return Number.isNaN(noData) ? Number.isNaN(value) : value === noData;
}

function removeRasterLayer(map: maplibregl.Map) {
  if (map.getLayer(LAYER_ID)) {
    map.removeLayer(LAYER_ID);
  }

  if (map.getSource(SOURCE_ID)) {
    map.removeSource(SOURCE_ID);
  }
}

export default function ClimateExplorerPage() {
  const mapRef = useRef<MapRef>(null);
  const hoverThrottleRef = useRef<number | null>(null);
  const hoverRequestIdRef = useRef(0);
  const hoverPointRef = useRef<{
    point: { x: number; y: number };
    lngLat: LngLat;
  } | null>(null);

  const [selectedLayerId, setSelectedLayerId] = useState<LayerId>(
    MAP_LAYERS[0]?.id ?? "huglin_1981-2010",
  );
  const [ramp, setRamp] = useState<RampKey>("viridis");
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const selectedLayer = useMemo(
    () =>
      MAP_LAYERS.find((layer) => layer.id === selectedLayerId) ?? MAP_LAYERS[0],
    [selectedLayerId],
  );

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedLayer) return;

    const colorizePixel = buildRampInterpolator(ramp, selectedLayer.range);
    setColorFunction(
      selectedLayer.url,
      (pixel: TypedArray, color: Uint8ClampedArray, metadata: CogMetadata) => {
        const rawValue = pixel[0];
        if (
          typeof rawValue !== "number" ||
          isNoDataValue(rawValue, metadata.noData)
        ) {
          color.set([0, 0, 0, 0]);
          return;
        }

        colorizePixel(applyScaleOffset(rawValue, metadata), color);
      },
    );

    removeRasterLayer(map);

    map.addSource(SOURCE_ID, {
      type: "raster",
      url: `cog://${selectedLayer.url}`,
      tileSize: 256,
    });

    map.addLayer({
      id: LAYER_ID,
      type: "raster",
      source: SOURCE_ID,
      paint: {
        "raster-opacity": 0.7,
        "raster-fade-duration": 0,
      },
    });

    setLoadError(null);
    setHoverInfo(null);

    return () => {
      removeRasterLayer(map);
    };
  }, [mapReady, ramp, selectedLayer]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedLayer) return;

    const runHoverQuery = async () => {
      hoverThrottleRef.current = null;

      const hoverPoint = hoverPointRef.current;
      if (!hoverPoint) return;

      const requestId = ++hoverRequestIdRef.current;

      try {
        const [value] = await locationValues(
          selectedLayer.url,
          {
            latitude: hoverPoint.lngLat.lat,
            longitude: hoverPoint.lngLat.lng,
          },
          map.getZoom(),
        );

        if (requestId !== hoverRequestIdRef.current) return;

        setHoverInfo({
          x: hoverPoint.point.x,
          y: hoverPoint.point.y,
          value: Number.isFinite(value) ? value : null,
          label: Number.isFinite(value) ? value.toFixed(2) : "No data",
        });
      } catch {
        if (requestId !== hoverRequestIdRef.current) return;
        setHoverInfo({
          x: hoverPoint.point.x,
          y: hoverPoint.point.y,
          value: null,
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

    const handleMouseMove = (event: MapMouseEvent & { point: PointLike }) => {
      hoverPointRef.current = {
        point: { x: event.point.x, y: event.point.y },
        lngLat: event.lngLat,
      };
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
  }, [mapReady, selectedLayer]);

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

  const activeRange = selectedLayer?.range ?? null;
  const activeClassification = selectedLayer
    ? LAYER_CLASSIFICATIONS[selectedLayer.id]
    : undefined;
  const activeRampStops = RAMPS[ramp];
  const legendGradient = useMemo(() => {
    const stops = activeRampStops
      .map(([stop, color]) => `${color} ${stop * 100}%`)
      .join(", ");

    return `linear-gradient(to top, ${stops})`;
  }, [activeRampStops]);

  const hoverMarkerOffset = useMemo(() => {
    if (!activeRange || hoverInfo?.value == null) return null;
    return getBreakOffset(hoverInfo.value, activeRange);
  }, [activeRange, hoverInfo]);

  const hoveredClassBreak = useMemo(() => {
    if (!activeClassification || hoverInfo?.value == null) return null;
    const hoverValue = hoverInfo.value;
    return (
      activeClassification.find((classBreak) =>
        matchesClassBreak(hoverValue, classBreak),
      ) ?? null
    );
  }, [activeClassification, hoverInfo]);

  const classMarkers = useMemo(() => {
    if (!activeClassification || !activeRange) return [];

    return activeClassification
      .map((classBreak) => {
        if (classBreak.min == null) return null;

        return {
          label: classBreak.label,
          top: getBreakOffset(classBreak.min, activeRange),
          isActive: hoveredClassBreak?.label === classBreak.label,
        };
      })
      .filter(
        (marker): marker is { label: string; top: string; isActive: boolean } =>
          marker !== null,
      );
  }, [activeClassification, activeRange, hoveredClassBreak]);

  const mapContent = (
    <div className="relative h-full w-full">
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: "100%", height: "100%" }}
        mapStyle={BASEMAP_STYLE}
        onLoad={() => {
          setMapReady(true);
        }}
        onError={() =>
          setLoadError("Unable to load the selected climate layer.")
        }
      >
        <NavigationControl position="bottom-right" visualizePitch showCompass />
        <ScaleControl position="bottom-right" />
      </Map>

      {hoverInfo && (
        <div
          className="pointer-events-none absolute z-10 -translate-y-full rounded-lg border border-white/15 bg-black/80 px-3 py-2 text-xs text-white shadow-lg backdrop-blur"
          style={{
            left: hoverInfo.x + 12,
            top: hoverInfo.y - 12,
          }}
        >
          <div className="font-medium">
            {selectedLayer?.label ?? "Climate layer"}
          </div>
          <div>{hoverInfo.label}</div>
        </div>
      )}

      <div className={styles.mapLegend}>
        <div className={styles.mapLegendTitle}>Legend</div>
        <div className={styles.mapLegendContent}>
          <div className={styles.mapLegendScaleLabels}>
            {activeClassification?.map((classBreak) => {
              const markerValue = classBreak.min;
              const markerTop =
                activeRange && markerValue != null
                  ? getBreakOffset(markerValue, activeRange)
                  : null;
              const isActive = hoveredClassBreak?.label === classBreak.label;

              if (markerTop == null) return null;

              return (
                <div
                  key={`${classBreak.label}-${markerValue}`}
                  className={styles.mapLegendScaleLabel}
                  style={{ top: markerTop }}
                >
                  <div
                    className={
                      isActive
                        ? styles.mapLegendScaleTextActive
                        : styles.mapLegendScaleText
                    }
                  >
                    {classBreak.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.mapLegendRamp}>
            <div
              className={styles.mapLegendRampFill}
              style={{ background: legendGradient }}
            />
            {classMarkers.map((marker) => (
              <div
                key={`${marker.label}-${marker.top}`}
                className={
                  marker.isActive
                    ? styles.mapLegendBreakLineActive
                    : styles.mapLegendBreakLine
                }
                style={{ top: marker.top }}
              />
            ))}
            {hoverMarkerOffset && (
              <div
                className={styles.mapLegendMarker}
                style={{ top: hoverMarkerOffset }}
              />
            )}
          </div>
          <div className={styles.mapLegendValues}>
            <div>
              <div className={styles.mapLegendLabel}>Max</div>
              <div className={styles.mapLegendValue}>
                {activeRange ? formatLegendValue(activeRange[1]) : "Loading"}
              </div>
            </div>
            {hoverInfo?.value != null && (
              <div>
                <div className={styles.mapLegendLabel}>Hover</div>
                <div className={styles.mapLegendValue}>
                  {formatLegendValue(hoverInfo.value)}
                </div>
              </div>
            )}
            <div>
              <div className={styles.mapLegendLabel}>Min</div>
              <div className={styles.mapLegendValue}>
                {activeRange ? formatLegendValue(activeRange[0]) : "Loading"}
              </div>
            </div>
          </div>
        </div>
      </div>
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
