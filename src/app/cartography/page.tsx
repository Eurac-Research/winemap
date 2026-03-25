"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, HelpCircle, Layers, Navigation2 } from "lucide-react";
import Map, { MapRef, NavigationControl, ScaleControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "@/styles/Home.module.css";
import { getIndicatorsWithMap } from "@/app/components/indicators/indicator-index";
import { PdoMapLayout } from "@/app/components/pdo-app/PdoMapLayout";
import { PdoSidebarShell } from "@/app/components/pdo-app/PdoSidebarShell";

type LayerGroup = "all" | string;

interface Layer {
  id: string;
  name: string;
  description: string;
  category: string;
  mapboxLayerId: string;
  enabled: boolean;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const INITIAL_VIEW_STATE = {
  longitude: 5,
  latitude: 46,
  zoom: 5.2,
};

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

const availableLayers: Layer[] = getIndicatorsWithMap().map((indicator) => ({
  id: indicator.id,
  name: indicator.name,
  description: indicator.description.join(" "),
  category: indicator.category,
  mapboxLayerId: indicator.mapboxLayerId!,
  enabled: false,
}));

const availableCategories = Array.from(
  new Set(availableLayers.map((layer) => layer.category)),
);

export default function CartographyPage() {
  const mapRef = useRef<MapRef>(null);
  const [layers, setLayers] = useState<Layer[]>(availableLayers);
  const [groupBy, setGroupBy] = useState<LayerGroup>("all");
  const [selectedInfo, setSelectedInfo] = useState<Layer | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current.getMap();

    layers.forEach((layer) => {
      if (map.getLayer(layer.mapboxLayerId)) {
        map.setLayoutProperty(
          layer.mapboxLayerId,
          "visibility",
          layer.enabled ? "visible" : "none",
        );
      }
    });
  }, [layers, mapLoaded]);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer,
      ),
    );
  };

  const groupedLayers = useMemo(() => {
    if (groupBy === "all") {
      const categories = Array.from(new Set(layers.map((layer) => layer.category)));
      return categories.map((category) => ({
        title: formatCategoryLabel(category),
        items: layers.filter((layer) => layer.category === category),
      }));
    }

    return [
      {
        title: formatCategoryLabel(groupBy),
        items: layers.filter((layer) => layer.category === groupBy),
      },
    ];
  }, [groupBy, layers]);

  const activeLayers = useMemo(
    () => layers.filter((layer) => layer.enabled).length,
    [layers],
  );

  const sidebarTop = (
    <div className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <div className={styles.filterIntro}>
          <div className={styles.filterEyebrowRow}>
            <p className={styles.filterEyebrow}>Cartography</p>
            <button
              type="button"
              className={styles.filterHelpButton}
              onClick={() => setSelectedInfo(null)}
              aria-label="Cartography layers are described below in the overview and list."
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <h2 className={styles.filterHeading}>Explore geotiff layers</h2>
          <p className={styles.filterHelper}>
            Turn layers on and off, group them by theme, and open the linked
            indicator detail page for full documentation.
          </p>
        </div>
        <div className={styles.filterResetWrap}>
          <button
            type="button"
            className={styles.filterResetButton}
            onClick={() =>
              setLayers((prev) => prev.map((layer) => ({ ...layer, enabled: false })))
            }
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );

  const sidebarBody = (
    <div className="space-y-8">
      <section className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHeader}>
          <p className={styles.sidebarSectionEyebrow}>Overview</p>
          <h3 className={styles.sidebarSectionTitle}>Layer catalogue</h3>
          <p className={styles.sidebarSectionText}>
            This map follows the same atlas layout, but focuses on environmental
            raster layers instead of PDO entities.
          </p>
        </div>
        <div className={styles.statsGrid}>
          <article className={styles.statCard}>
            <span className={styles.statValue}>{layers.length}</span>
            <span className={styles.statLabel}>Available layers</span>
          </article>
          <article className={styles.statCard}>
            <span className={styles.statValue}>{availableCategories.length}</span>
            <span className={styles.statLabel}>Themes</span>
          </article>
          <article className={styles.statCard}>
            <span className={styles.statValue}>{activeLayers}</span>
            <span className={styles.statLabel}>Active layers</span>
          </article>
          <article className={styles.statCard}>
            <span className={styles.statValue}>GeoTIFF</span>
            <span className={styles.statLabel}>Layer format</span>
          </article>
        </div>
      </section>

      <section className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHeader}>
          <p className={styles.sidebarSectionEyebrow}>Filter</p>
          <h3 className={styles.sidebarSectionTitle}>Browse by category</h3>
          <p className={styles.sidebarSectionText}>
            Select a theme to reduce the layer list, or keep all themes visible.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setGroupBy("all")}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
              groupBy === "all"
                ? "border-[#E91E63] bg-[#E91E63] text-white"
                : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            All
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setGroupBy(category)}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                groupBy === category
                  ? "border-[#E91E63] bg-[#E91E63] text-white"
                  : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {formatCategoryLabel(category)}
            </button>
          ))}
        </div>
      </section>

      {groupedLayers.map((group) => (
        <section key={group.title} className={styles.sidebarSection}>
          <div className={styles.sidebarSectionHeader}>
            <p className={styles.sidebarSectionEyebrow}>Layers</p>
            <h3 className={styles.sidebarSectionTitle}>{group.title}</h3>
            <p className={styles.sidebarSectionText}>
              {group.items.length.toLocaleString()} layer
              {group.items.length === 1 ? "" : "s"} in this theme.
            </p>
          </div>
          <div className={styles.resultList}>
            {group.items.map((layer) => (
              <article key={layer.id} className={styles.resultItem}>
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleLayer(layer.id)}
                    className={`relative mt-0.5 h-5 w-10 flex-shrink-0 rounded-full transition-colors ${
                      layer.enabled ? "bg-[#E91E63]" : "bg-white/20"
                    }`}
                    aria-label={`Toggle ${layer.name}`}
                    aria-pressed={layer.enabled}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                        layer.enabled ? "translate-x-[1.125rem]" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleLayer(layer.id)}
                        className="text-left"
                        aria-pressed={layer.enabled}
                        aria-label={`Toggle ${layer.name}`}
                      >
                        <span className={styles.resultItemTitle}>{layer.name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedInfo(layer)}
                        className="text-white/50 transition-colors hover:text-white"
                        aria-label={`More info about ${layer.name}`}
                      >
                        <HelpCircle className="h-4 w-4" />
                      </button>
                    </div>
                    <p className={`${styles.resultItemMeta} mt-1`}>
                      {formatCategoryLabel(layer.category)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  const mapContent = (
    <div className="relative h-full w-full">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/tiacop/cmdg1whvv001s01r2diojaxic"
        onLoad={(event) => {
          const map = event.target;
          layers.forEach((layer) => {
            if (map.getLayer(layer.mapboxLayerId)) {
              map.setLayoutProperty(layer.mapboxLayerId, "visibility", "none");
            }
          });
          setMapLoaded(true);
        }}
      >
        <NavigationControl position="bottom-right" visualizePitch showCompass />
        <ScaleControl position="bottom-right" />
      </Map>

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

      {selectedInfo && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedInfo(null)}
            aria-hidden="true"
          />
          <div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="layer-info-title"
          >
            <div className="rounded-3xl border border-white/15 bg-black/95 p-8 shadow-2xl">
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
                  <dd>{selectedInfo.description}</dd>
                </div>
                <div className={styles.detailItem}>
                  <dt>
                    <Layers className="h-4 w-4" />
                    <span>Map layer id</span>
                  </dt>
                  <dd>{selectedInfo.mapboxLayerId}</dd>
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
                    toggleLayer(selectedInfo.id);
                    setSelectedInfo(null);
                  }}
                  className="rounded-full bg-[#E91E63] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ff4081]"
                >
                  {selectedInfo.enabled ? "Hide layer" : "Show layer"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInfo(null)}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
