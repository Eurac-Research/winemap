"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  NavigationControl,
  Map as ReactMap,
  ScaleControl,
  type MapRef,
} from "react-map-gl/mapbox";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/app/components/ui/resizable";
import { isMobile } from "react-device-detect";
import styles from "@/styles/Home.module.css";
import { Select } from "antd";
import bbox from "@turf/bbox";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export interface PDORecord {
  country: string;
  pdoid: string;
  pdoname: string;
  registration: string | null;
  category: string;
  varietiesOiv: string | null;
  varieties: string | null;
  "max-yield-hl": number | null;
  "max-yield-kg": number | null;
  "min-planting-density": number | null;
  irrigation: string | null;
  amendment: string;
  pdoinfo: string;
  munic: string;
  "begin-lifes": string;
}

type PdoPointFeature = Feature<Geometry, GeoJsonProperties & { PDOid?: string }>;
type PdoPointCollection = FeatureCollection<Geometry, GeoJsonProperties & { PDOid?: string }>;

const MAPBOX_TOKEN = "";
const INITIAL_VIEW_STATE = {
  latitude: 46,
  longitude: 5,
  zoom: 3.6,
  bearing: 0,
  pitch: 0,
};
const DEFAULT_PADDING = { top: 100, bottom: 25, left: 0, right: 5 };

export default function PdoExplorerPage() {
  const mapRef = useRef<MapRef>(null);

  const [pdoData, setPdoData] = useState<PDORecord[]>([]);
  const [pdoPointsData, setPdoPointsData] = useState<PdoPointCollection | null>(null);
  const [selectedPdoName, setSelectedPdoName] = useState<string | undefined>();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadData = async () => {
      setIsLoadingData(true);
      setLoadError(null);

      try {
        const [pdoRes, pointsRes] = await Promise.all([
          fetch("/api/data/pdo-eu-id", { signal: controller.signal }),
          fetch("/api/data/pdo-points", { signal: controller.signal }),
        ]);

        if (!pdoRes.ok || !pointsRes.ok) {
          throw new Error("Failed to fetch PDO explorer data");
        }

        const [pdoJson, pointsJson] = await Promise.all([
          pdoRes.json(),
          pointsRes.json(),
        ]);

        if (!isActive) return;

        setPdoData(Array.isArray(pdoJson) ? pdoJson : []);
        setPdoPointsData(pointsJson);
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }

        if (!isActive) return;
        setLoadError("Failed to load PDO explorer data.");
        console.error("Failed to load PDO explorer data", error);
      } finally {
        if (isActive) {
          setIsLoadingData(false);
        }
      }
    };

    void loadData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const pdoOptions = useMemo(() => {
    const uniqueNames = [...new Set(pdoData.map((item) => item.pdoname.trim()))];

    return uniqueNames
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .map((pdoname) => ({ label: pdoname, value: pdoname }));
  }, [pdoData]);

  const pointFeatureByPdoId = useMemo(() => {
    const lookup = new Map<string, PdoPointFeature>();

    for (const feature of pdoPointsData?.features ?? []) {
      const pdoId = feature.properties?.PDOid;
      if (pdoId && !lookup.has(pdoId)) {
        lookup.set(pdoId, feature);
      }
    }

    return lookup;
  }, [pdoPointsData]);

  const resetMapView = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    map
      .setFilter("pdo-area", null)
      .setFilter("pdo-pins", null)
      .setCenter([INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude])
      .zoomTo(INITIAL_VIEW_STATE.zoom, {
        duration: 1000,
        offset: [100, 50],
      });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPdoName(undefined);
    resetMapView();
    history.replaceState({}, "", window.location.pathname);
  }, [resetMapView]);

  const handlePdoChange = useCallback(
    (value: string | undefined) => {
      if (!value) {
        clearSelection();
        return;
      }

      setSelectedPdoName(value);
      history.replaceState({}, "", `?pdoname=${encodeURI(value)}`);

      const matchingPdos = pdoData.filter((item) => item.pdoname === value);
      if (!matchingPdos.length) {
        clearSelection();
        return;
      }

      const showIds = matchingPdos.map((item) => item.pdoid);
      const map = mapRef.current?.getMap();

      map
        ?.setFilter("pdo-area", ["match", ["get", "PDOid"], showIds, true, false])
        ?.setFilter("pdo-pins", ["match", ["get", "PDOid"], showIds, true, false]);

      const selectedFeature = pointFeatureByPdoId.get(showIds[0]);
      if (!selectedFeature || !mapRef.current) return;

      const [minLng, minLat, maxLng, maxLat] = bbox(selectedFeature);
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: DEFAULT_PADDING,
          duration: 500,
          maxZoom: 8,
        },
      );
    },
    [clearSelection, pdoData, pointFeatureByPdoId],
  );

  return (
    <div className="fixed inset-0 z-10 pt-[60px]">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        <ResizablePanel defaultSize={isMobile ? 30 : 25} className="relative min-w-0 overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <div className={styles.panelFrame}>
              <div className={styles.frontpageContent}>
                <div id="map-filter-content" className={styles.filterBarContent}>
                  <div className={styles.filter}>
                    <Select
                      showSearch
                      allowClear
                      placeholder={isLoadingData ? "Loading PDOs..." : "PDO"}
                      popupMatchSelectWidth={290}
                      onChange={handlePdoChange}
                      options={pdoOptions}
                      value={selectedPdoName}
                      className="w-full"
                      disabled={isLoadingData || !!loadError}
                      notFoundContent={loadError ?? "No PDOs found"}
                    />
                  </div>
                  {loadError && <p className="mt-4 text-sm text-white/70">{loadError}</p>}
                </div>
              </div>
            </div>
          </Suspense>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className={`${isMobile
            ? "h-3 w-full cursor-row-resize hover:h-4"
            : "h-full w-2 cursor-col-resize hover:w-3"
            } flex items-center justify-center bg-[#E91E63] opacity-60 hover:opacity-100 text-[#E91E63] hover:brightness-110 transition-all relative group z-20`}
        />

        <ResizablePanel
          defaultSize={isMobile ? 60 : 70}
          minSize={isMobile ? 30 : 30}
          className="relative min-w-0 overflow-hidden"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMap
              ref={mapRef}
              minZoom={isMobile ? 1 : 3}
              initialViewState={INITIAL_VIEW_STATE}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/tiacop/clas8a92e003c15o2bpopdfqt"
              mapboxAccessToken={MAPBOX_TOKEN}
              interactiveLayerIds={[
                "pdo-area",
                "pdo-pins",
                "pdo-municipality",
                "vulnerabilityLayer",
              ]}
            >
              <NavigationControl
                position="bottom-right"
                visualizePitch={true}
                showCompass={true}
              />
              <ScaleControl position="bottom-right" />
            </ReactMap>
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
