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
const CLIMATE_DATA_BASE_URL =
  "https://pub-7fe518f63b9f4e28b80569979cc136fc.r2.dev";

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
type ClimateIndexId = "huglin" | "cni" | "di";
type ScenarioId = "historical" | "ssp370" | "ssp585";
type PeriodId = "1981-2010" | "2041-2070" | "2071-2100";
type ClassificationBreak = {
  label: string;
  min?: number;
  max?: number;
};
type ClimateAsset = {
  url: string;
};
type ClimateIndexConfig = {
  id: ClimateIndexId;
  label: string;
  shortLabel: string;
  unit: string;
  defaultRamp: RampKey;
  displayRange: [number, number];
  classifications: ClassificationBreak[];
  assets: Record<ScenarioId, Partial<Record<PeriodId, ClimateAsset>>>;
};
type HoverSample = {
  scenarioId: ScenarioId;
  periodId: PeriodId;
  label: string;
  value: number | null;
};
type HoverInfo = {
  x: number;
  y: number;
  currentValue: number | null;
  samples: HoverSample[];
};

const SCENARIO_OPTIONS: {
  id: ScenarioId;
  label: string;
  shortLabel: string;
}[] = [
  { id: "historical", label: "Historical", shortLabel: "Historical" },
  { id: "ssp370", label: "SSP3-7.0", shortLabel: "SSP3-7.0" },
  { id: "ssp585", label: "SSP5-8.5", shortLabel: "SSP5-8.5" },
];

const PERIOD_OPTIONS: PeriodId[] = ["1981-2010", "2041-2070", "2071-2100"];

function buildClimateAssetUrl(
  indexId: ClimateIndexId,
  scenarioId: ScenarioId,
  periodId: PeriodId,
) {
  const fileName =
    scenarioId === "historical"
      ? `${indexId}_${periodId}.tiff`
      : `${indexId}_${periodId}_${scenarioId}.tiff`;

  return `${CLIMATE_DATA_BASE_URL}/${fileName}`;
}

const CLIMATE_INDICES: Record<ClimateIndexId, ClimateIndexConfig> = {
  huglin: {
    id: "huglin",
    label: "Huglin Index",
    shortLabel: "Huglin",
    unit: "GDD",
    defaultRamp: "redblue",
    displayRange: [0, 3500],
    classifications: [
      { label: "Too cool", max: 1200 },
      { label: "Very cool", min: 1200, max: 1500 },
      { label: "Cool", min: 1500, max: 1800 },
      { label: "Temperate", min: 1800, max: 2100 },
      { label: "Warm temperate", min: 2100, max: 2400 },
      { label: "Warm", min: 2400, max: 2700 },
      { label: "Very warm", min: 2700, max: 3000 },
      { label: "Too hot", min: 3000 },
    ],
    assets: {
      historical: {
        "1981-2010": {
          url: buildClimateAssetUrl("huglin", "historical", "1981-2010"),
        },
      },
      ssp370: {
        "2041-2070": {
          url: buildClimateAssetUrl("huglin", "ssp370", "2041-2070"),
        },
        "2071-2100": {
          url: buildClimateAssetUrl("huglin", "ssp370", "2071-2100"),
        },
      },
      ssp585: {
        "2041-2070": {
          url: buildClimateAssetUrl("huglin", "ssp585", "2041-2070"),
        },
        "2071-2100": {
          url: buildClimateAssetUrl("huglin", "ssp585", "2071-2100"),
        },
      },
    },
  },
  cni: {
    id: "cni",
    label: "Cool Night Index",
    shortLabel: "Cool Night",
    unit: "deg C",
    defaultRamp: "viridis",
    displayRange: [-5, 25],
    classifications: [
      { label: "Very cool", max: 12 },
      { label: "Cool", min: 12, max: 14 },
      { label: "Temperate", min: 14, max: 18 },
      { label: "Warm", min: 18 },
    ],
    assets: {
      historical: {
        "1981-2010": {
          url: buildClimateAssetUrl("cni", "historical", "1981-2010"),
        },
      },
      ssp370: {
        "2041-2070": {
          url: buildClimateAssetUrl("cni", "ssp370", "2041-2070"),
        },
        "2071-2100": {
          url: buildClimateAssetUrl("cni", "ssp370", "2071-2100"),
        },
      },
      ssp585: {
        "2041-2070": {
          url: buildClimateAssetUrl("cni", "ssp585", "2041-2070"),
        },
        "2071-2100": {
          url: buildClimateAssetUrl("cni", "ssp585", "2071-2100"),
        },
      },
    },
  },
  di: {
    id: "di",
    label: "Dryness Index",
    shortLabel: "Dryness",
    unit: "mm",
    defaultRamp: "inferno",
    displayRange: [-150, 200],
    classifications: [
      { label: "Very dry", max: -100 },
      { label: "Moderately dry", min: -100, max: 50 },
      { label: "Subhumid", min: 50, max: 150 },
      { label: "Humid", min: 150 },
    ],
    assets: {
      historical: {
        "1981-2010": {
          url: buildClimateAssetUrl("di", "historical", "1981-2010"),
        },
      },
      ssp370: {
        "2041-2070": {
          url: buildClimateAssetUrl("di", "ssp370", "2041-2070"),
        },
        "2071-2100": {
          url: buildClimateAssetUrl("di", "ssp370", "2071-2100"),
        },
      },
      ssp585: {
        "2041-2070": {
          url: buildClimateAssetUrl("di", "ssp585", "2041-2070"),
        },
        "2071-2100": {
          url: buildClimateAssetUrl("di", "ssp585", "2071-2100"),
        },
      },
    },
  },
};

const CLIMATE_INDEX_ORDER: ClimateIndexId[] = ["huglin", "cni", "di"];

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

function formatSampleValue(value: number | null, unit: string) {
  if (value == null || !Number.isFinite(value)) return "No data";
  return `${formatLegendValue(value)} ${unit}`;
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

function getScenarioLabel(scenarioId: ScenarioId) {
  return (
    SCENARIO_OPTIONS.find((option) => option.id === scenarioId)?.label ??
    scenarioId
  );
}

function getAvailablePeriods(
  indexConfig: ClimateIndexConfig,
  scenarioId: ScenarioId,
) {
  return PERIOD_OPTIONS.filter(
    (periodId) => indexConfig.assets[scenarioId][periodId] != null,
  );
}

function buildHoverSampleLabel(scenarioId: ScenarioId, periodId: PeriodId) {
  return `${getScenarioLabel(scenarioId)} ${periodId}`;
}

export default function ClimateExplorerPage() {
  const mapRef = useRef<MapRef>(null);
  const hoverThrottleRef = useRef<number | null>(null);
  const hoverRequestIdRef = useRef(0);
  const hoverPointRef = useRef<{
    point: { x: number; y: number };
    lngLat: LngLat;
  } | null>(null);

  const [selectedIndexId, setSelectedIndexId] =
    useState<ClimateIndexId>("huglin");
  const [selectedScenarioId, setSelectedScenarioId] =
    useState<ScenarioId>("historical");
  const [selectedPeriodId, setSelectedPeriodId] =
    useState<PeriodId>("1981-2010");
  const [ramp, setRamp] = useState<RampKey>(
    CLIMATE_INDICES.huglin.defaultRamp,
  );
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const selectedIndex = CLIMATE_INDICES[selectedIndexId];
  const availablePeriods = useMemo(
    () => getAvailablePeriods(selectedIndex, selectedScenarioId),
    [selectedIndex, selectedScenarioId],
  );
  const activePeriodId = availablePeriods.includes(selectedPeriodId)
    ? selectedPeriodId
    : (availablePeriods[0] ?? "1981-2010");

  const selectedAsset = useMemo(
    () => selectedIndex.assets[selectedScenarioId][activePeriodId] ?? null,
    [activePeriodId, selectedIndex, selectedScenarioId],
  );

  const hoverSampleTargets = useMemo(
    () =>
      SCENARIO_OPTIONS.flatMap((scenario) =>
        PERIOD_OPTIONS.flatMap((periodId) => {
          const asset = selectedIndex.assets[scenario.id][periodId];
          if (!asset) return [];

          return [
            {
              scenarioId: scenario.id,
              periodId,
              url: asset.url,
              label: buildHoverSampleLabel(scenario.id, periodId),
            },
          ];
        }),
      ),
    [selectedIndex],
  );

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedAsset) return;

    const colorizePixel = buildRampInterpolator(ramp, selectedIndex.displayRange);
    setColorFunction(
      selectedAsset.url,
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
      url: `cog://${selectedAsset.url}`,
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

    return () => {
      removeRasterLayer(map);
    };
  }, [mapReady, ramp, selectedAsset, selectedIndex.displayRange]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedAsset) return;

    const runHoverQuery = async () => {
      hoverThrottleRef.current = null;

      const hoverPoint = hoverPointRef.current;
      if (!hoverPoint) return;

      const requestId = ++hoverRequestIdRef.current;
      const coordinates = {
        latitude: hoverPoint.lngLat.lat,
        longitude: hoverPoint.lngLat.lng,
      };
      const zoom = map.getZoom();

      const results = await Promise.allSettled(
        hoverSampleTargets.map(async (sampleTarget) => {
          const [value] = await locationValues(sampleTarget.url, coordinates, zoom);
          return {
            scenarioId: sampleTarget.scenarioId,
            periodId: sampleTarget.periodId,
            label: sampleTarget.label,
            value: Number.isFinite(value) ? value : null,
          } satisfies HoverSample;
        }),
      );

      if (requestId !== hoverRequestIdRef.current) return;

      const samples = results.map((result, index) => {
        const target = hoverSampleTargets[index]!;
        if (result.status === "fulfilled") {
          return result.value;
        }

        return {
          scenarioId: target.scenarioId,
          periodId: target.periodId,
          label: target.label,
          value: null,
        } satisfies HoverSample;
      });

      const currentSample =
        samples.find(
          (sample) =>
            sample.scenarioId === selectedScenarioId &&
            sample.periodId === activePeriodId,
        ) ?? null;

      setHoverInfo({
        x: hoverPoint.point.x,
        y: hoverPoint.point.y,
        currentValue: currentSample?.value ?? null,
        samples,
      });
    };

    const scheduleHoverQuery = () => {
      if (hoverThrottleRef.current != null) return;
      hoverThrottleRef.current = window.setTimeout(() => {
        void runHoverQuery();
      }, 100);
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
  }, [
    activePeriodId,
    hoverSampleTargets,
    mapReady,
    selectedAsset,
    selectedScenarioId,
  ]);

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
          className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus-visible:border-[color:var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)]"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--surface-overlay)",
            color: "var(--text-strong)",
          }}
        >
          <option
            value="viridis"
            style={{
              background: "var(--surface)",
              color: "var(--text-strong)",
            }}
          >
            Viridis
          </option>
          <option
            value="inferno"
            style={{
              background: "var(--surface)",
              color: "var(--text-strong)",
            }}
          >
            Inferno
          </option>
          <option
            value="redblue"
            style={{
              background: "var(--surface)",
              color: "var(--text-strong)",
            }}
          >
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
          <p className={styles.sidebarSectionEyebrow}>Indices</p>
          <h2 className={styles.sidebarSectionTitle}>Bioclimatic Indicators</h2>
        </div>
        <div className={styles.resultList}>
          {CLIMATE_INDEX_ORDER.map((indexId) => {
            const indexConfig = CLIMATE_INDICES[indexId];
            const isActive = indexId === selectedIndexId;

            return (
              <button
                key={indexId}
                type="button"
                onClick={() => {
                  setLoadError(null);
                  setHoverInfo(null);
                  setSelectedIndexId(indexId);
                  setRamp(indexConfig.defaultRamp);
                }}
                className={
                  isActive ? styles.resultActiveItem : styles.resultItem
                }
                aria-pressed={isActive}
              >
                <span className={styles.resultItemTitle}>{indexConfig.label}</span>
                <span className={styles.resultItemMeta}>
                  Unit: {indexConfig.unit}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHeader}>
          <p className={styles.sidebarSectionEyebrow}>Projection</p>
          <h2 className={styles.sidebarSectionTitle}>Scenario and period</h2>
        </div>
        <label className={styles.filterLabel} htmlFor="climate-scenario-select">
          Scenario
        </label>
        <select
          id="climate-scenario-select"
          value={selectedScenarioId}
          onChange={(event) => {
            setLoadError(null);
            setHoverInfo(null);
            setSelectedScenarioId(event.target.value as ScenarioId);
          }}
          className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus-visible:border-[color:var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)]"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--surface-overlay)",
            color: "var(--text-strong)",
          }}
        >
          {SCENARIO_OPTIONS.map((scenario) => (
            <option
              key={scenario.id}
              value={scenario.id}
              style={{
                background: "var(--surface)",
                color: "var(--text-strong)",
              }}
            >
              {scenario.label}
            </option>
          ))}
        </select>

        <label
          className={`${styles.filterLabel} mt-4 block`}
          htmlFor="climate-period-select"
        >
          Period
        </label>
        <select
          id="climate-period-select"
          value={activePeriodId}
          onChange={(event) => {
            setLoadError(null);
            setHoverInfo(null);
            setSelectedPeriodId(event.target.value as PeriodId);
          }}
          className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus-visible:border-[color:var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)]"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--surface-overlay)",
            color: "var(--text-strong)",
          }}
        >
          {availablePeriods.map((periodId) => (
            <option
              key={periodId}
              value={periodId}
              style={{
                background: "var(--surface)",
                color: "var(--text-strong)",
              }}
            >
              {periodId}
            </option>
          ))}
        </select>

        <p className={`${styles.sidebarSectionText} mt-4`}>
          Hover any location to compare {selectedIndex.shortLabel.toLowerCase()}{" "}
          values across historical and future projections.
        </p>
      </section>

      {loadError && (
        <section className={styles.sidebarSection}>
          <p className={styles.sidebarSectionText}>{loadError}</p>
        </section>
      )}
    </div>
  );

  const activeRange = selectedIndex.displayRange;
  const activeClassification = selectedIndex.classifications;
  const activeRampStops = RAMPS[ramp];
  const legendGradient = useMemo(() => {
    const stops = activeRampStops
      .map(([stop, color]) => `${color} ${stop * 100}%`)
      .join(", ");

    return `linear-gradient(to top, ${stops})`;
  }, [activeRampStops]);

  const hoverMarkerOffset = useMemo(() => {
    if (hoverInfo?.currentValue == null) return null;
    return getBreakOffset(hoverInfo.currentValue, activeRange);
  }, [activeRange, hoverInfo]);

  const hoveredClassBreak = useMemo(() => {
    if (hoverInfo?.currentValue == null) return null;
    const hoverValue = hoverInfo.currentValue;
    return (
      activeClassification.find((classBreak) =>
        matchesClassBreak(hoverValue, classBreak),
      ) ?? null
    );
  }, [activeClassification, hoverInfo]);

  const classMarkers = useMemo(
    () =>
      activeClassification
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
        ),
    [activeClassification, activeRange, hoveredClassBreak],
  );

  const mapContent = (
    <div className="relative h-full w-full">
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: "100%", height: "100%" }}
        mapStyle={BASEMAP_STYLE}
        onLoad={() => {
          setLoadError(null);
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
          className="pointer-events-none absolute z-10 max-w-[260px] -translate-y-full rounded-lg border px-3 py-2 text-xs shadow-lg backdrop-blur"
          style={{
            left: hoverInfo.x + 12,
            top: hoverInfo.y - 12,
            borderColor: "var(--border-soft)",
            background: "var(--surface-panel-strong)",
            color: "var(--text-strong)",
          }}
        >
          <div className="font-medium">{selectedIndex.label}</div>
          <div
            className="mt-1 text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            Active layer: {getScenarioLabel(selectedScenarioId)} {activePeriodId}
          </div>
          <div className="mt-2 space-y-1">
            {hoverInfo.samples.map((sample) => {
              const isActive =
                sample.scenarioId === selectedScenarioId &&
                sample.periodId === activePeriodId;

              return (
                <div
                  key={`${sample.scenarioId}-${sample.periodId}`}
                  className="flex items-start justify-between gap-3"
                  style={{
                    color: isActive
                      ? "var(--accent-strong)"
                      : "var(--text-strong)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span>{sample.label}</span>
                  <span>{formatSampleValue(sample.value, selectedIndex.unit)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.mapLegend}>
        <div className={styles.mapLegendTitle}>Legend</div>
        <div className={styles.mapLegendContent}>
          <div className={styles.mapLegendScaleLabels}>
            {activeClassification.map((classBreak) => {
              const markerValue = classBreak.min;
              const markerTop =
                markerValue != null ? getBreakOffset(markerValue, activeRange) : null;
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
                {formatLegendValue(activeRange[1])}
              </div>
            </div>
            {hoverInfo?.currentValue != null && (
              <div>
                <div className={styles.mapLegendLabel}>Hover</div>
                <div className={styles.mapLegendValue}>
                  {formatLegendValue(hoverInfo.currentValue)}
                </div>
              </div>
            )}
            <div>
              <div className={styles.mapLegendLabel}>Min</div>
              <div className={styles.mapLegendValue}>
                {formatLegendValue(activeRange[0])}
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
