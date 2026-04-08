"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, HelpCircle, Navigation2 } from "lucide-react";
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
  type Indicator,
} from "@/app/components/indicators/indicator-index";
import { PdoMapLayout } from "@/app/components/pdo-app/PdoMapLayout";
import { PdoSidebarShell } from "@/app/components/pdo-app/PdoSidebarShell";
import styles from "@/styles/Home.module.css";

const BASEMAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const SOURCE_ID = "cartography-raster-source";
const LAYER_ID = "cartography-raster-layer";
const LEGEND_RAMP_HEIGHT = 160;
const INITIAL_VIEW_STATE = {
  longitude: 14,
  latitude: 46.611715,
  zoom: 5.2,
};

const cartographyIndicators = getIndicatorsWithMapByApp("cartography");

type HoverInfo = {
  x: number;
  y: number;
  value: number | null;
};

let cogProtocolRegistered = false;
if (!cogProtocolRegistered) {
  maplibregl.addProtocol("cog", cogProtocol);
  cogProtocolRegistered = true;
}

const formatCategoryLabel = (category: string) =>
  category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const categoryToDetailPage: Record<string, string> = {
  climate: "/climate-environment/climate",
  "ecosystem-services": "/climate-environment/ecosystem-services",
  "ecosystem-conditions": "/climate-environment/ecosystem-services",
};

const getDetailHref = (category: string, indicatorId: string) => {
  const base = categoryToDetailPage[category] ?? "/climate-environment";
  return indicatorId ? `${base}#${indicatorId}` : base;
};

function formatLegendValue(value: number) {
  if (!Number.isFinite(value)) return "N/A";
  if (Math.abs(value) >= 100 || Number.isInteger(value)) {
    return value.toFixed(0);
  }

  return value.toFixed(1);
}

function formatSampleValue(value: number | null) {
  if (value == null || !Number.isFinite(value)) return "No data";
  return formatLegendValue(value);
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

export default function CartographyPage() {
  const mapRef = useRef<MapRef>(null);
  const hoverThrottleRef = useRef<number | null>(null);
  const hoverRequestIdRef = useRef(0);
  const hoverPointRef = useRef<{
    point: { x: number; y: number };
    lngLat: LngLat;
  } | null>(null);

  const initialIndicator = cartographyIndicators[0] ?? null;
  const [selectedIndicatorId, setSelectedIndicatorId] = useState(
    initialIndicator?.id ?? "",
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedInfo, setSelectedInfo] = useState<Indicator | null>(null);
  const [ramp, setRamp] = useState<RampKey>(
    initialIndicator?.map?.defaultRamp ?? "viridis",
  );
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const selectedIndicator =
    cartographyIndicators.find((indicator) => indicator.id === selectedIndicatorId) ??
    initialIndicator;

  const mapConfig = selectedIndicator?.map;
  const selectedAsset = selectedIndicator
    ? getIndicatorMapLayer(selectedIndicator) ?? selectedIndicator.map?.layers[0] ?? null
    : null;

  const availableCategories = Array.from(
    new Set(cartographyIndicators.map((indicator) => indicator.category)),
  );

  const groupedIndicators = useMemo(() => {
    const filtered =
      selectedCategory === "all"
        ? cartographyIndicators
        : cartographyIndicators.filter(
            (indicator) => indicator.category === selectedCategory,
          );

    const categories = Array.from(new Set(filtered.map((indicator) => indicator.category)));

    return categories.map((category) => ({
      title: formatCategoryLabel(category),
      items: filtered.filter((indicator) => indicator.category === category),
    }));
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedIndicator?.map) return;
    setRamp(selectedIndicator.map.defaultRamp ?? "viridis");
    setLoadError(null);
    setHoverInfo(null);
  }, [selectedIndicator]);

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

      try {
        const [value] = await locationValues(selectedAsset.url, coordinates, zoom);
        if (requestId !== hoverRequestIdRef.current) return;

        setHoverInfo({
          x: hoverPoint.point.x,
          y: hoverPoint.point.y,
          value: Number.isFinite(value) ? value : null,
        });
      } catch {
        if (requestId !== hoverRequestIdRef.current) return;
        setHoverInfo({
          x: hoverPoint.point.x,
          y: hoverPoint.point.y,
          value: null,
        });
      }
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
  }, [mapReady, selectedAsset]);

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
                      <p className={styles.filterEyebrow}>Cartography</p>
                    </div>
                  </div>
                </div>
              </div>
            }
            body={
              <div className="space-y-6">
                <section className={styles.sidebarSection}>
                  <p className={styles.sidebarSectionText}>
                    No cartography indicators are available.
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
  const hoverMarkerOffset =
    hoverInfo?.value != null ? getBreakOffset(hoverInfo.value, activeRange) : null;

  const sidebarTop = (
    <div className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <div className={styles.filterIntro}>
          <div className={styles.filterEyebrowRow}>
            <p className={styles.filterEyebrow}>Cartography</p>
            <button
              type="button"
              className={styles.filterHelpButton}
              onClick={() => setSelectedInfo(selectedIndicator)}
              aria-label={`More info about ${selectedIndicator.name}`}
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <section className={styles.sidebarSection}>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
              selectedCategory === "all"
                ? "border-[color:var(--accent-strong)] bg-[color:var(--accent-strong)] text-[color:var(--text-inverse)]"
                : "border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] text-[color:var(--text-muted)] hover:bg-[color:var(--surface-panel-muted)]"
            }`}
          >
            All
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                selectedCategory === category
                  ? "border-[color:var(--accent-strong)] bg-[color:var(--accent-strong)] text-[color:var(--text-inverse)]"
                  : "border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] text-[color:var(--text-muted)] hover:bg-[color:var(--surface-panel-muted)]"
              }`}
            >
              {formatCategoryLabel(category)}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.sidebarSection}>
        <ColorRampSelect
          id="cartography-ramp-select"
          value={ramp}
          onChange={setRamp}
          className="mt-2"
          labelClassName={styles.filterLabel}
        />
      </section>
    </div>
  );

  const sidebarBody = (
    <div className="space-y-8">
      {groupedIndicators.map((group) => (
        <section key={group.title} className={styles.sidebarSection}>
          <div className={styles.sidebarSectionHeader}>
            <h3 className={styles.sidebarSectionTitle}>{group.title}</h3>
          </div>
          <div className={styles.resultList}>
            {group.items.map((indicator) => {
              const isActive = indicator.id === selectedIndicator.id;

              return (
                <button
                  key={indicator.id}
                  type="button"
                  onClick={() => {
                    setSelectedIndicatorId(indicator.id);
                    setLoadError(null);
                    setHoverInfo(null);
                  }}
                  className={isActive ? styles.resultActiveItem : styles.resultItem}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 text-left">
                      <span className={styles.resultItemTitle}>{indicator.name}</span>
                      <p className={`${styles.resultItemMeta} mt-1`}>
                        {formatCategoryLabel(indicator.category)}
                      </p>
                    </div>
                    <span
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedInfo(indicator);
                      }}
                      className="cursor-pointer transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]"
                      aria-label={`More info about ${indicator.name}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedInfo(indicator);
                        }
                      }}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
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
          setLoadError("Unable to load the selected cartography layer.")
        }
      >
        <NavigationControl position="bottom-right" visualizePitch showCompass />
        <ScaleControl position="bottom-right" />
      </Map>

      {hoverInfo ? (
        <div
          className="pointer-events-none absolute z-10 max-w-[220px] -translate-y-full rounded-lg border px-3 py-2 text-xs shadow-lg backdrop-blur"
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
            {formatCategoryLabel(selectedIndicator.category)}
          </div>
          <div className="mt-2 font-semibold">
            {formatSampleValue(hoverInfo.value)}
          </div>
        </div>
      ) : null}

      <VerticalLegend
        ramp={ramp}
        title={selectedIndicator.name}
        subtitle={mapConfig.unit ? `Unit: ${mapConfig.unit}` : undefined}
        currentOffset={hoverMarkerOffset}
        currentLabel={
          hoverInfo?.value != null ? formatLegendValue(hoverInfo.value) : undefined
        }
        maxLabel={formatLegendValue(activeRange[1])}
        minLabel={formatLegendValue(activeRange[0])}
        height={LEGEND_RAMP_HEIGHT}
      />
    </div>
  );

  return (
    <>
      <PdoMapLayout
        sidebar={<PdoSidebarShell top={sidebarTop} body={sidebarBody} />}
        map={mapContent}
        sidebarDefaultSize={30}
        mapDefaultSize={70}
        sidebarMinSize={22}
      />

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
                <p className={styles.sidebarSectionText}>
                  {formatCategoryLabel(selectedInfo.category)}
                </p>
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
                      href={getDetailHref(selectedInfo.category, selectedInfo.id)}
                      className={styles.detailLink}
                    >
                      View full description
                    </Link>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndicatorId(selectedInfo.id);
                    setSelectedInfo(null);
                  }}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-colors bg-[color:var(--accent-strong)] text-[color:var(--text-inverse)] hover:brightness-110"
                >
                  Show layer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInfo(null)}
                  className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)]"
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
