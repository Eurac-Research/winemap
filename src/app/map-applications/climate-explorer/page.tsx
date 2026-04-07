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

import {
  ColorRampSelect,
  RAMPS,
  type RampKey,
  VerticalLegend,
} from "@/app/components/colorRamps";
import {
  getIndicatorMapLayer,
  getIndicatorsWithMapByApp,
  type ClassificationBreak,
  type IndicatorMapConfig,
  type IndicatorMapOption,
} from "@/app/components/indicators/indicator-index";
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

const climateIndicators = getIndicatorsWithMapByApp("climate-explorer");

type HoverSample = {
  scenarioId?: string;
  periodId?: string;
  label: string;
  value: number | null;
};

type HoverInfo = {
  x: number;
  y: number;
  currentValue: number | null;
  samples: HoverSample[];
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

function formatSampleValue(value: number | null, unit?: string) {
  if (value == null || !Number.isFinite(value)) return "No data";
  return unit ? `${formatLegendValue(value)} ${unit}` : formatLegendValue(value);
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

function getOptionLabel(
  options: IndicatorMapOption[] | undefined,
  optionId: string | undefined,
) {
  if (!optionId) return "";
  return options?.find((option) => option.id === optionId)?.label ?? optionId;
}

function getAvailablePeriods(mapConfig: IndicatorMapConfig, scenarioId?: string) {
  const periods = mapConfig.periods ?? [];

  if (periods.length === 0) return [];
  if (!scenarioId) return periods;

  return periods.filter((period) =>
    mapConfig.layers.some(
      (layer) =>
        layer.periodId === period.id &&
        (layer.scenarioId == null || layer.scenarioId === scenarioId),
    ),
  );
}

function buildHoverSampleLabel(
  mapConfig: IndicatorMapConfig,
  scenarioId?: string,
  periodId?: string,
) {
  const scenarioLabel = getOptionLabel(mapConfig.scenarios, scenarioId);
  const periodLabel = getOptionLabel(mapConfig.periods, periodId);

  if (scenarioLabel && periodLabel) return `${scenarioLabel} ${periodLabel}`;
  return scenarioLabel || periodLabel || "Active layer";
}

export default function ClimateExplorerPage() {
  const mapRef = useRef<MapRef>(null);
  const hoverThrottleRef = useRef<number | null>(null);
  const hoverRequestIdRef = useRef(0);
  const hoverPointRef = useRef<{
    point: { x: number; y: number };
    lngLat: LngLat;
  } | null>(null);

  const initialIndicator = climateIndicators[0] ?? null;
  const [selectedIndicatorId, setSelectedIndicatorId] = useState(
    initialIndicator?.id ?? "",
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    initialIndicator?.map?.defaultScenarioId ?? "",
  );
  const [selectedPeriodId, setSelectedPeriodId] = useState(
    initialIndicator?.map?.defaultPeriodId ?? "",
  );
  const [ramp, setRamp] = useState<RampKey>(
    initialIndicator?.map?.defaultRamp ?? "viridis",
  );
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const selectedIndicator =
    climateIndicators.find((indicator) => indicator.id === selectedIndicatorId) ??
    initialIndicator;

  const mapConfig = selectedIndicator?.map;

  const availableScenarios = mapConfig?.scenarios ?? [];
  const activeScenarioId =
    selectedScenarioId && availableScenarios.some((item) => item.id === selectedScenarioId)
      ? selectedScenarioId
      : (mapConfig?.defaultScenarioId ?? availableScenarios[0]?.id ?? "");

  const availablePeriods = useMemo(
    () => (mapConfig ? getAvailablePeriods(mapConfig, activeScenarioId) : []),
    [activeScenarioId, mapConfig],
  );

  const activePeriodId =
    selectedPeriodId && availablePeriods.some((item) => item.id === selectedPeriodId)
      ? selectedPeriodId
      : (mapConfig?.defaultPeriodId ?? availablePeriods[0]?.id ?? "");

  const selectedAsset = useMemo(() => {
    if (!selectedIndicator || !mapConfig) return null;
    return (
      getIndicatorMapLayer(selectedIndicator, {
        scenarioId: activeScenarioId || undefined,
        periodId: activePeriodId || undefined,
      }) ?? mapConfig.layers[0] ?? null
    );
  }, [activePeriodId, activeScenarioId, mapConfig, selectedIndicator]);

  const hoverSampleTargets = useMemo(() => {
    if (!mapConfig) return [];

    return mapConfig.layers.map((layer) => ({
      scenarioId: layer.scenarioId,
      periodId: layer.periodId,
      url: layer.url,
      label: buildHoverSampleLabel(mapConfig, layer.scenarioId, layer.periodId),
    }));
  }, [mapConfig]);

  useEffect(() => {
    if (!mapConfig) return;
    setRamp(mapConfig.defaultRamp ?? "viridis");
    setSelectedScenarioId(mapConfig.defaultScenarioId ?? "");
    setSelectedPeriodId(mapConfig.defaultPeriodId ?? "");
    setHoverInfo(null);
    setLoadError(null);
  }, [mapConfig, selectedIndicatorId]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedAsset || !mapConfig) return;

    const colorizePixel = buildRampInterpolator(ramp, mapConfig.displayRange);
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
  }, [mapConfig, mapReady, ramp, selectedAsset]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedAsset || !mapConfig) return;

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
            sample.scenarioId === selectedAsset.scenarioId &&
            sample.periodId === selectedAsset.periodId,
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
  }, [hoverSampleTargets, mapConfig, mapReady, selectedAsset]);

  if (!selectedIndicator || !mapConfig) {
    return (
      <PdoMapLayout
        sidebar={
          <PdoSidebarShell
            top={
              <div className={styles.filterPanel}>
                <div className={styles.filterHeader}>
                  <div className={styles.filterIntro}>
                    <div className={styles.filterEyebrowRow}>
                      <p className={styles.filterEyebrow}>Climate Explorer</p>
                    </div>
                  </div>
                </div>
              </div>
            }
            body={
              <div className="space-y-6">
                <section className={styles.sidebarSection}>
                  <p className={styles.sidebarSectionText}>
                    No climate indicators are available.
                  </p>
                </section>
              </div>
            }
          />
        }
        map={<div className="h-full w-full" />}
        sidebarDefaultSize={30}
        mapDefaultSize={70}
        sidebarMinSize={22}
      />
    );
  }

  const activeRange = mapConfig.displayRange;
  const activeClassification = mapConfig.classifications ?? [];
  const hoverMarkerOffset =
    hoverInfo?.currentValue != null
      ? getBreakOffset(hoverInfo.currentValue, activeRange)
      : null;

  const hoveredClassBreak =
    hoverInfo?.currentValue != null
      ? (activeClassification.find((classBreak) =>
          matchesClassBreak(hoverInfo.currentValue as number, classBreak),
        ) ?? null)
      : null;

  const legendBreaks = activeClassification
    .filter((classBreak) => classBreak.min != null)
    .map((classBreak) => ({
      label: classBreak.label,
      offset: getBreakOffset(classBreak.min as number, activeRange),
      isActive: hoveredClassBreak?.label === classBreak.label,
    }));

  const activeLayerLabel = buildHoverSampleLabel(
    mapConfig,
    selectedAsset?.scenarioId,
    selectedAsset?.periodId,
  );

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
        <ColorRampSelect
          id="climate-ramp-select"
          value={ramp}
          onChange={setRamp}
          className="mt-2"
          labelClassName={styles.filterLabel}
        />
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
          {climateIndicators.map((indicator) => {
            const isActive = indicator.id === selectedIndicator.id;

            return (
              <button
                key={indicator.id}
                type="button"
                onClick={() => {
                  setSelectedIndicatorId(indicator.id);
                }}
                className={isActive ? styles.resultActiveItem : styles.resultItem}
                aria-pressed={isActive}
              >
                <span className={styles.resultItemTitle}>{indicator.name}</span>
                {indicator.map?.unit ? (
                  <span className={styles.resultItemMeta}>
                    Unit: {indicator.map.unit}
                  </span>
                ) : null}
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
          value={activeScenarioId}
          onChange={(event) => {
            setLoadError(null);
            setHoverInfo(null);
            setSelectedScenarioId(event.target.value);
          }}
          className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus-visible:border-[color:var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)]"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--surface-overlay)",
            color: "var(--text-strong)",
          }}
        >
          {availableScenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
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
            setSelectedPeriodId(event.target.value);
          }}
          className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus-visible:border-[color:var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)]"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--surface-overlay)",
            color: "var(--text-strong)",
          }}
        >
          {availablePeriods.map((period) => (
            <option key={period.id} value={period.id}>
              {period.label}
            </option>
          ))}
        </select>

        <p className={`${styles.sidebarSectionText} mt-4`}>
          Hover any location to compare {selectedIndicator.name.toLowerCase()} values
          across historical and future projections.
        </p>
      </section>

      {loadError ? (
        <section className={styles.sidebarSection}>
          <p className={styles.sidebarSectionText}>{loadError}</p>
        </section>
      ) : null}
    </div>
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

      {hoverInfo ? (
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
          <div className="font-medium">{selectedIndicator.name}</div>
          <div
            className="mt-1 text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            Active layer: {activeLayerLabel}
          </div>
          <div className="mt-2 space-y-1">
            {hoverInfo.samples.map((sample) => {
              const isActive =
                sample.scenarioId === selectedAsset?.scenarioId &&
                sample.periodId === selectedAsset?.periodId;

              return (
                <div
                  key={`${sample.scenarioId ?? "none"}-${sample.periodId ?? "none"}`}
                  className="flex items-start justify-between gap-3"
                  style={{
                    color: isActive
                      ? "var(--accent-strong)"
                      : "var(--text-strong)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span>{sample.label}</span>
                  <span>{formatSampleValue(sample.value, mapConfig.unit)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <VerticalLegend
        ramp={ramp}
        title="Legend"
        breaks={legendBreaks}
        currentOffset={hoverMarkerOffset}
        currentLabel={
          hoverInfo?.currentValue != null
            ? formatLegendValue(hoverInfo.currentValue)
            : undefined
        }
        maxLabel={formatLegendValue(activeRange[1])}
        minLabel={formatLegendValue(activeRange[0])}
        height={LEGEND_RAMP_HEIGHT}
      />
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
