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
              aria-label="Cartography layer controls"
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
              onClick={() => setGroupBy("all")}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                groupBy === "all"
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
                onClick={() => setGroupBy(category)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                  groupBy === category
                    ? "border-[color:var(--accent-strong)] bg-[color:var(--accent-strong)] text-[color:var(--text-inverse)]"
                    : "border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] text-[color:var(--text-muted)] hover:bg-[color:var(--surface-panel-muted)]"
                }`}
              >
                {formatCategoryLabel(category)}
              </button>
            ))}
          </div>
        </section>
    </div>
  );

  const sidebarBody = (
    <div className="space-y-8">
      {groupedLayers.map((group) => (
        <section key={group.title} className={ `$styles.sidebarSection` }>
          <div className={styles.sidebarSectionHeader}>
            <h3 className={styles.sidebarSectionTitle}>{group.title}</h3>
          </div>
          <div className={styles.resultList}>
            {group.items.map((layer) => (
              <article key={layer.id} className={styles.resultItem}>
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleLayer(layer.id)}
                    className={`relative mt-0.5 h-5 w-10 flex-shrink-0 rounded-full transition-colors ${
                      layer.enabled ? "bg-[color:var(--accent-strong)]" : "bg-[color:var(--border-strong)]"
                    }`}
                    aria-label={`Toggle ${layer.name}`}
                    aria-pressed={layer.enabled}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-[color:var(--surface)] transition-transform ${
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
                        className="transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]"
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
                  <dd>{selectedInfo.description}</dd>
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
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-colors bg-[color:var(--accent-strong)] text-[color:var(--text-inverse)] hover:brightness-110"
                >
                  {selectedInfo.enabled ? "Hide layer" : "Show layer"}
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
      )}
    </>
  );
}
