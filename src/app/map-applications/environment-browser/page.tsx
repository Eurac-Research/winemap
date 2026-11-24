"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  cogProtocol,
  locationValues,
  setColorFunction,
} from "@geomatico/maplibre-cog-protocol";
import { ChevronDown, ExternalLink, Info, Navigation2 } from "lucide-react";
import maplibregl from "maplibre-gl";
import type { MapMouseEvent } from "maplibre-gl";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import {
  getIndicatorGlossaryHref,
  getIndicatorMapLayer,
  getIndicatorsWithMapByApp,
  type ClassificationBreak,
  type Indicator,
  type IndicatorMapConfig,
  type IndicatorMapOption,
} from "@/content/indicators";
import { getMapApplicationByHref } from "@/content/map-applications";
import { BASEMAPS } from "@/content/maps/basemaps";
import { BOUNDARY_OVERLAYS, boundaryCasingId } from "@/content/maps/boundaries";
import { RAMPS, type RampKey } from "@/content/maps/color-ramps";

import {
  MapApplicationHelp,
  MapApplicationHelpButton,
} from "@/components/maps/MapApplicationHelp";
import { MapApplicationNavigation } from "@/components/maps/MapApplicationNavigation";
import { MapLayerControl } from "@/components/maps/MapLayerControl";
import { MapLibreBoundaryLayers } from "@/components/maps/MapLibreBoundaryLayers";
import MapPlaceSearch from "@/components/maps/MapPlaceSearch";
import { VerticalLegend } from "@/components/maps/VerticalLegend";
import { PdoMapLayout } from "@/components/pdo-app/PdoMapLayout";
import { PdoSidebarShell } from "@/components/pdo-app/PdoSidebarShell";
import RespondLogo from "@/components/ui/RespondLogo";
import styles from "@/styles/Home.module.css";
import layerStyles from "./layers.module.css";

type CogMetadata = Awaited<
  ReturnType<typeof import("@geomatico/maplibre-cog-protocol").getCogMetadata>
>;
type ColorFunction = Parameters<typeof setColorFunction>[1];
type TypedArray = Parameters<ColorFunction>[0];

const SOURCE_ID = "environment-raster-source";
const LAYER_ID = "environment-raster-layer";
const LEGEND_RAMP_HEIGHT = 160;
const INITIAL_VIEW_STATE = {
  longitude: 14,
  latitude: 46.611715,
  zoom: 5.2,
};
const mapApplication = getMapApplicationByHref(
  "/map-applications/environment-browser",
);

const environmentIndicators = getIndicatorsWithMapByApp("environment-browser");
const categories = Array.from(
  new Set(environmentIndicators.map((indicator) => indicator.category)),
);

const groupedIndicators = categories.map((category) => ({
  key: category,
  title: category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  items: environmentIndicators.filter(
    (indicator) => indicator.category === category,
  ),
}));

type InspectionSample = {
  scenarioId?: string;
  periodId?: string;
  label: string;
  value: number | null;
};

type InspectionInfo = {
  longitude: number;
  latitude: number;
  value?: number | null;
  currentValue?: number | null;
  samples?: InspectionSample[];
};

let cogProtocolRegistered = false;
if (!cogProtocolRegistered) {
  maplibregl.addProtocol("cog", cogProtocol);
  cogProtocolRegistered = true;
}

const formatUnit = (unit: string | undefined) =>
  unit ? `Unit: ${unit}` : null;

function formatLegendValue(value: number, unit: string | undefined) {
  if (!Number.isFinite(value)) return "N/A";
  const suffix = unit ? ` ${unit}` : "";

  if (Math.abs(value) >= 100 || Number.isInteger(value)) {
    return `${value.toFixed(0)}${suffix}`;
  }

  return `${value.toFixed(1)}${suffix}`;
}

function formatSampleValue(value: number | null, unit: string | undefined) {
  if (value == null || !Number.isFinite(value)) return "No data";
  return formatLegendValue(value, unit);
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

function removeRasterLayer(map: maplibregl.Map | null | undefined) {
  if (!map) return;

  try {
    if (map.getLayer(LAYER_ID)) {
      map.removeLayer(LAYER_ID);
    }

    if (map.getSource(SOURCE_ID)) {
      map.removeSource(SOURCE_ID);
    }
  } catch {
    // MapLibre may already have disposed the previous map instance during remount.
  }
}

function getOptionLabel(
  options: IndicatorMapOption[] | undefined,
  optionId: string | undefined,
) {
  if (!optionId) return "";
  return options?.find((option) => option.id === optionId)?.label ?? optionId;
}

function getAvailablePeriods(
  mapConfig: IndicatorMapConfig,
  scenarioId?: string,
) {
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

function buildInspectionSampleLabel(
  mapConfig: IndicatorMapConfig,
  scenarioId?: string,
  periodId?: string,
) {
  const scenarioLabel = getOptionLabel(mapConfig.scenarios, scenarioId);
  const periodLabel = getOptionLabel(mapConfig.periods, periodId);

  if (scenarioLabel && periodLabel) return `${scenarioLabel} ${periodLabel}`;
  return scenarioLabel || periodLabel || "Active layer";
}

export default function EnvironmentBrowserPage() {
  const mapRef = useRef<MapRef>(null);
  const inspectionRequestIdRef = useRef(0);

  const [selectedIndicatorId, setSelectedIndicatorId] = useState("");
  const [selectedInfo, setSelectedInfo] = useState<Indicator | null>(null);
  const [selectedBasemapId, setSelectedBasemapId] = useState("light");
  const [selectedScenarioId, setSelectedScenarioId] = useState("");
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [mapReady, setMapReady] = useState(false);
  const [visibleBoundaryIds, setVisibleBoundaryIds] = useState<string[]>(() =>
    BOUNDARY_OVERLAYS.filter((overlay) => overlay.defaultVisible).map(
      (overlay) => overlay.id,
    ),
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [inspectionInfo, setInspectionInfo] = useState<InspectionInfo | null>(
    null,
  );
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        groupedIndicators.map((group) => [group.key, false]),
      ) as Record<string, boolean>,
  );

  const selectedIndicator =
    environmentIndicators.find(
      (indicator) => indicator.id === selectedIndicatorId,
    ) ?? null;

  const mapConfig = selectedIndicator?.map;
  const selectedBasemap =
    BASEMAPS.find((basemap) => basemap.id === selectedBasemapId) ?? BASEMAPS[0];
  const hasScenarioOptions =
    (mapConfig?.scenarios?.length ?? 0) > 0 ||
    (mapConfig?.periods?.length ?? 0) > 0;

  const availableScenarios = mapConfig?.scenarios ?? [];
  const activeScenarioId =
    selectedScenarioId &&
    availableScenarios.some((item) => item.id === selectedScenarioId)
      ? selectedScenarioId
      : (mapConfig?.defaultScenarioId ?? availableScenarios[0]?.id ?? "");

  const availablePeriods = useMemo(
    () => (mapConfig ? getAvailablePeriods(mapConfig, activeScenarioId) : []),
    [activeScenarioId, mapConfig],
  );

  const activePeriodId =
    selectedPeriodId &&
    availablePeriods.some((item) => item.id === selectedPeriodId)
      ? selectedPeriodId
      : (mapConfig?.defaultPeriodId ?? availablePeriods[0]?.id ?? "");

  const ramp = (mapConfig?.defaultRamp ?? "viridis") as RampKey;

  const selectedAsset = useMemo(() => {
    if (!selectedIndicator || !mapConfig) return null;

    if (hasScenarioOptions) {
      return (
        getIndicatorMapLayer(selectedIndicator, {
          scenarioId: activeScenarioId || undefined,
          periodId: activePeriodId || undefined,
        }) ??
        mapConfig.layers[0] ??
        null
      );
    }

    return (
      getIndicatorMapLayer(selectedIndicator) ?? mapConfig.layers[0] ?? null
    );
  }, [
    activePeriodId,
    activeScenarioId,
    hasScenarioOptions,
    mapConfig,
    selectedIndicator,
  ]);

  const inspectionSampleTargets = useMemo(() => {
    if (!mapConfig || !hasScenarioOptions) return [];

    return mapConfig.layers.map((layer) => ({
      scenarioId: layer.scenarioId,
      periodId: layer.periodId,
      url: layer.url,
      label: buildInspectionSampleLabel(
        mapConfig,
        layer.scenarioId,
        layer.periodId,
      ),
    }));
  }, [hasScenarioOptions, mapConfig]);

  const toggleCategory = (categoryKey: string) => {
    setOpenCategories((current) => ({
      ...current,
      [categoryKey]: !current[categoryKey],
    }));
  };

  const clearInspection = () => {
    inspectionRequestIdRef.current += 1;
    setInspectionInfo(null);
  };

  const clearSelection = () => {
    setSelectedIndicatorId("");
    setSelectedScenarioId("");
    setSelectedPeriodId("");
    setLoadError(null);
    clearInspection();
  };

  const selectIndicator = (indicatorId: string) => {
    if (indicatorId === selectedIndicatorId) {
      clearSelection();
      return;
    }

    const indicator =
      environmentIndicators.find((item) => item.id === indicatorId) ?? null;
    setSelectedIndicatorId(indicatorId);
    setSelectedScenarioId(indicator?.map?.defaultScenarioId ?? "");
    setSelectedPeriodId(indicator?.map?.defaultPeriodId ?? "");
    setLoadError(null);
    clearInspection();
  };

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady) return;
    if (!selectedAsset || !mapConfig) {
      removeRasterLayer(map);
      return;
    }

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

    const syncRasterLayer = () => {
      if (!map.isStyleLoaded()) return;

      removeRasterLayer(map);

      map.addSource(SOURCE_ID, {
        type: "raster",
        url: `cog://${selectedAsset.url}`,
        tileSize: 256,
      });

      // A newly selected raster must stay beneath any mounted boundaries.
      const boundaryIds = new Set(
        BOUNDARY_OVERLAYS.map((overlay) => boundaryCasingId(overlay.id)),
      );
      const firstBoundaryId = map
        .getStyle()
        .layers.find((layer) => boundaryIds.has(layer.id))?.id;
      map.addLayer(
        {
          id: LAYER_ID,
          type: "raster",
          source: SOURCE_ID,
          paint: {
            "raster-opacity": 0.7,
            "raster-fade-duration": 0,
          },
        },
        firstBoundaryId,
      );
    };

    const handleStyleLoad = () => {
      syncRasterLayer();
    };

    map.on("style.load", handleStyleLoad);
    syncRasterLayer();

    return () => {
      map.off("style.load", handleStyleLoad);
      removeRasterLayer(map);
    };
  }, [mapConfig, mapReady, ramp, selectedAsset]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapReady || !selectedAsset || !mapConfig) return;

    const runInspectionQuery = async (event: MapMouseEvent) => {
      // Popup clicks (including closing it) must not inspect the map beneath it.
      const target = event.originalEvent.target;
      if (target instanceof Element && target.closest(".maplibregl-popup"))
        return;

      const requestId = ++inspectionRequestIdRef.current;
      setInspectionInfo(null);
      const coordinates = {
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng,
      };
      const zoom = map.getZoom();

      if (hasScenarioOptions && inspectionSampleTargets.length > 0) {
        const results = await Promise.allSettled(
          inspectionSampleTargets.map(async (sampleTarget) => {
            const [value] = await locationValues(
              sampleTarget.url,
              coordinates,
              zoom,
            );
            return {
              scenarioId: sampleTarget.scenarioId,
              periodId: sampleTarget.periodId,
              label: sampleTarget.label,
              value: Number.isFinite(value) ? value : null,
            } satisfies InspectionSample;
          }),
        );

        if (requestId !== inspectionRequestIdRef.current) return;

        const samples = results.map((result, index) => {
          const target = inspectionSampleTargets[index]!;
          if (result.status === "fulfilled") {
            return result.value;
          }

          return {
            scenarioId: target.scenarioId,
            periodId: target.periodId,
            label: target.label,
            value: null,
          } satisfies InspectionSample;
        });

        const currentSample =
          samples.find(
            (sample) =>
              sample.scenarioId === selectedAsset.scenarioId &&
              sample.periodId === selectedAsset.periodId,
          ) ?? null;

        setInspectionInfo({
          ...coordinates,
          currentValue: currentSample?.value ?? null,
          samples,
        });
        return;
      }

      try {
        const [value] = await locationValues(
          selectedAsset.url,
          coordinates,
          zoom,
        );
        if (requestId !== inspectionRequestIdRef.current) return;

        setInspectionInfo({
          ...coordinates,
          value: Number.isFinite(value) ? value : null,
        });
      } catch {
        if (requestId !== inspectionRequestIdRef.current) return;
        setInspectionInfo({
          ...coordinates,
          value: null,
        });
      }
    };

    const handleClick = (event: MapMouseEvent) => {
      void runInspectionQuery(event);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
      // Ignore results from requests made for a previous layer or map instance.
      inspectionRequestIdRef.current += 1;
    };
  }, [
    hasScenarioOptions,
    inspectionSampleTargets,
    mapConfig,
    mapReady,
    selectedAsset,
  ]);

  if (environmentIndicators.length === 0) {
    return (
      <>
        <PdoMapLayout
          className="top-[calc(var(--top-nav-height)+3.5rem)] sm:left-14 sm:top-[var(--top-nav-height)]"
          sidebar={
            <PdoSidebarShell
              top={
                <div className={styles.filterPanel}>
                  <div className={styles.filterHeader}>
                    <div className={styles.filterIntro}>
                      <div className={styles.filterEyebrowRow}>
                        <p className={styles.filterEyebrow}>WINEMAP Explorer</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              body={
                <div className="space-y-6">
                  <section className={styles.sidebarSection}>
                    <p className={styles.sidebarSectionText}>
                      No environment indicators are available.
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
        <MapApplicationNavigation activeHref="/map-applications/environment-browser" />
      </>
    );
  }

  const activeRange = mapConfig?.displayRange ?? null;
  const activeClassification = mapConfig?.classifications ?? [];
  const inspectionValue =
    inspectionInfo?.currentValue ?? inspectionInfo?.value ?? null;
  const inspectionMarkerOffset =
    inspectionValue != null && activeRange
      ? getBreakOffset(inspectionValue, activeRange)
      : null;

  const inspectedClassBreak =
    inspectionValue != null
      ? (activeClassification.find((classBreak) =>
          matchesClassBreak(inspectionValue, classBreak),
        ) ?? null)
      : null;

  const legendBreaks = activeRange
    ? activeClassification
        .filter((classBreak) => classBreak.min != null)
        .map((classBreak) => ({
          label: classBreak.label,
          offset: getBreakOffset(classBreak.min as number, activeRange),
          isActive: inspectedClassBreak?.label === classBreak.label,
        }))
    : [];

  const sidebarTop = (
    <div className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <div className={styles.filterIntro}>
          <div className={styles.filterEyebrowRow}>
            <p className={styles.filterEyebrow}>WINEMAP Explorer</p>
            {mapApplication?.help ? (
              <MapApplicationHelpButton ariaLabel="Open help for WINEMAP Explorer">
                <MapApplicationHelp help={mapApplication.help} />
              </MapApplicationHelpButton>
            ) : null}
          </div>
        </div>
      </div>

      <section className={styles.sidebarSection}>
        <button
          type="button"
          onClick={clearSelection}
          disabled={!selectedIndicator}
          className={styles.clearButton}
        >
          Clear Selection
        </button>

        {selectedIndicator && hasScenarioOptions ? (
          <>
            <label
              className={`${styles.filterLabel} mt-4 block`}
              htmlFor="environment-scenario-select"
            >
              Scenario
            </label>
            <div className={styles.mapDropdownWrap}>
              <select
                id="environment-scenario-select"
                value={activeScenarioId}
                onChange={(event) => {
                  setLoadError(null);
                  clearInspection();
                  setSelectedScenarioId(event.target.value);
                }}
                className={styles.mapDropdown}
              >
                {availableScenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.label}
                  </option>
                ))}
              </select>
            </div>

            <label
              className={`${styles.filterLabel} mt-4 block`}
              htmlFor="environment-period-select"
            >
              Period
            </label>
            <div className={styles.mapDropdownWrap}>
              <select
                id="environment-period-select"
                value={activePeriodId}
                onChange={(event) => {
                  setLoadError(null);
                  clearInspection();
                  setSelectedPeriodId(event.target.value);
                }}
                className={styles.mapDropdown}
              >
                {availablePeriods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );

  const sidebarBody = (
    <div className={layerStyles.layers}>
      {groupedIndicators.map((group) => (
        <section key={group.key} className={layerStyles.category}>
          <button
            type="button"
            className={layerStyles.categoryToggle}
            aria-expanded={openCategories[group.key]}
            aria-controls={`environment-group-${group.key}`}
            onClick={() => toggleCategory(group.key)}
          >
            <span>{group.title}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${openCategories[group.key] ? "" : "-rotate-90"}`}
            />
          </button>
          {openCategories[group.key] ? (
            <div
              id={`environment-group-${group.key}`}
              className={layerStyles.list}
            >
              {group.items.map((indicator) => {
                const isActive = indicator.id === selectedIndicatorId;

                return (
                  <div
                    key={indicator.id}
                    className={layerStyles.row}
                    data-active={isActive}
                  >
                    <button
                      type="button"
                      onClick={() => selectIndicator(indicator.id)}
                      className={layerStyles.selection}
                      aria-pressed={isActive}
                    >
                      <span className={layerStyles.marker} aria-hidden="true" />
                      <span>{indicator.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedInfo(indicator)}
                      className={layerStyles.info}
                      aria-label={`More info about ${indicator.name}`}
                      title={`More info about ${indicator.name}`}
                    >
                      <Info size={15} aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      ))}

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
        key={selectedBasemap.id}
        ref={mapRef}
        mapLib={maplibregl}
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={selectedBasemap.style}
        styleDiffing={false}
        onLoad={() => {
          setLoadError(null);
          setMapReady(true);
        }}
        onError={() => setLoadError("Unable to load the selected layer.")}
      >
        <MapLibreBoundaryLayers
          overlays={BOUNDARY_OVERLAYS}
          visibleIds={visibleBoundaryIds}
        />
        <NavigationControl position="bottom-right" visualizePitch showCompass />
        <ScaleControl position="bottom-right" />
        {inspectionInfo && selectedIndicator ? (
          <>
            <Marker
              longitude={inspectionInfo.longitude}
              latitude={inspectionInfo.latitude}
              anchor="center"
              style={{ pointerEvents: "none" }}
            >
              <div
                role="img"
                aria-label="Selected location"
                className="h-3 w-3 rounded-full border-2 border-white bg-[color:var(--accent)] shadow-[0_0_0_1px_rgba(0,0,0,0.6)]"
              />
            </Marker>
            <Popup
              longitude={inspectionInfo.longitude}
              latitude={inspectionInfo.latitude}
              closeButton={false}
              closeOnClick={false}
              closeOnMove={false}
              focusAfterOpen={false}
              maxWidth="260px"
              anchor="bottom"
              offset={12}
              className="[&_.maplibregl-popup-content]:!bg-transparent [&_.maplibregl-popup-content]:!p-0 [&_.maplibregl-popup-content]:!shadow-none [&_.maplibregl-popup-tip]:!border-transparent"
            >
              <div
                className="relative rounded-lg border px-3 py-2 text-xs shadow-lg backdrop-blur"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                }}
              >
                <button
                  type="button"
                  aria-label="Close pixel values"
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded text-lg hover:bg-black/10 focus-visible:outline"
                  onClick={(event) => {
                    event.stopPropagation();
                    clearInspection();
                  }}
                >
                  ×
                </button>
                <div className="pr-6 font-medium">{selectedIndicator.name}</div>
                {inspectionInfo.samples && inspectionInfo.samples.length > 0 ? (
                  <>
                    <div className="mt-2 space-y-1">
                      {inspectionInfo.samples.map((sample) => {
                        const isActive =
                          sample.scenarioId === selectedAsset?.scenarioId &&
                          sample.periodId === selectedAsset?.periodId;

                        return (
                          <div
                            key={`${sample.scenarioId ?? "none"}-${sample.periodId ?? "none"}`}
                            className="flex items-start justify-between gap-3"
                            style={{
                              color: isActive
                                ? "var(--accent)"
                                : "var(--foreground)",
                              fontWeight: isActive ? 600 : 400,
                            }}
                          >
                            <span>{sample.label}</span>
                            <span>
                              {formatSampleValue(sample.value, mapConfig?.unit)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {mapConfig?.unit ? (
                      <div
                        className="mt-1 text-[11px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {formatUnit(mapConfig.unit)}
                      </div>
                    ) : null}
                    <div className="mt-2 font-semibold">
                      {formatSampleValue(
                        inspectionInfo.value ?? null,
                        mapConfig?.unit,
                      )}
                    </div>
                  </>
                )}
              </div>
            </Popup>
          </>
        ) : null}
      </Map>

      <div className="absolute left-6 right-4 top-3 z-20 flex flex-col items-start gap-3 pointer-events-none [&>*]:pointer-events-auto">
        <MapPlaceSearch
          onSelect={(result) => {
            setLoadError(null);
            mapRef.current?.flyTo({
              center: [result.longitude, result.latitude],
              zoom: Math.max(viewState.zoom, 9),
              essential: true,
            });
          }}
        />
        <MapLayerControl
          basemaps={BASEMAPS}
          selectedBasemapId={selectedBasemap.id}
          onBasemapChange={(id) => {
            if (id === selectedBasemapId) return;
            setMapReady(false);
            clearInspection();
            setSelectedBasemapId(id);
          }}
          referenceAreas={{
            overlays: BOUNDARY_OVERLAYS,
            visibleIds: visibleBoundaryIds,
            onVisibilityChange: (id, visible) => {
              setVisibleBoundaryIds((current) =>
                visible
                  ? [...new Set([...current, id])]
                  : current.filter((item) => item !== id),
              );
            },
          }}
        />
      </div>

      <div className="absolute bottom-13 right-12 w-auto bg-background rounded-xl">
        <RespondLogo width={170} />
      </div>

      {selectedIndicator && mapConfig && activeRange ? (
        <VerticalLegend
          ramp={ramp}
          title={selectedIndicator.name}
          subtitle={mapConfig.unit ? `Unit: ${mapConfig.unit}` : undefined}
          breaks={legendBreaks.length > 0 ? legendBreaks : undefined}
          currentOffset={inspectionMarkerOffset}
          currentLabel={
            inspectionValue != null
              ? formatLegendValue(inspectionValue, mapConfig.unit)
              : undefined
          }
          maxLabel={formatLegendValue(activeRange[1], mapConfig.unit)}
          minLabel={formatLegendValue(activeRange[0], mapConfig.unit)}
          height={LEGEND_RAMP_HEIGHT}
        />
      ) : null}
    </div>
  );

  return (
    <>
      <PdoMapLayout
        className="top-[calc(var(--top-nav-height)+3.5rem)] sm:left-14 sm:top-[var(--top-nav-height)]"
        sidebar={<PdoSidebarShell top={sidebarTop} body={sidebarBody} />}
        map={mapContent}
        sidebarDefaultSize={30}
        mapDefaultSize={70}
        sidebarMinSize={22}
      />
      <MapApplicationNavigation activeHref="/map-applications/environment-browser" />

      {selectedInfo ? (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-[color:var(--surface-inverse)]/20"
            onClick={() => setSelectedInfo(null)}
            aria-hidden="true"
          />
          <div
            className={styles.modalDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="layer-info-title"
          >
            <div className={styles.modalSurface}>
              <div className={styles.detailHeader}>
                <p className={styles.sidebarSectionEyebrow}>Layer detail</p>
                <h3 id="layer-info-title" className={styles.detailTitle}>
                  {selectedInfo.name}
                </h3>
                {selectedInfo.subtitle ? (
                  <p className={styles.sidebarSectionText}>
                    {selectedInfo.subtitle}
                  </p>
                ) : selectedInfo.map?.unit ? (
                  <p className={styles.sidebarSectionText}>
                    {formatUnit(selectedInfo.map.unit)}
                  </p>
                ) : null}
              </div>

              <dl className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <dt>
                    <Navigation2 className="h-4 w-4" />
                    <span>Description</span>
                  </dt>
                  <dd>{selectedInfo.description.join(" ")}</dd>
                </div>
                <div className={styles.detailItem}>
                  <dt>
                    <ExternalLink className="h-4 w-4" />
                    <span>Documentation</span>
                  </dt>
                  <dd>
                    <Link
                      href={getIndicatorGlossaryHref(selectedInfo.id)}
                      className={styles.detailLink}
                    >
                      View definition
                    </Link>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    selectIndicator(selectedInfo.id);
                    setSelectedInfo(null);
                  }}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-colors bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:brightness-110"
                >
                  Show layer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInfo(null)}
                  className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors border-[color:var(--border)] bg-[color:var(--surface-overlay)] app-text-color hover:bg-[color:var(--surface-muted)]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
