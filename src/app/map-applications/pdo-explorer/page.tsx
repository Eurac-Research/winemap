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

interface CountryOption {
  code: string;
  name: string;
}

interface FilterState {
  pdoName?: string;
  country?: string;
  municipality?: string;
  category?: string;
  variety?: string;
}

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
  const [countryData, setCountryData] = useState<CountryOption[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadData = async () => {
      setIsLoadingData(true);
      setLoadError(null);

      try {
        const [pdoRes, pointsRes, countryRes] = await Promise.all([
          fetch("/api/data/pdo-eu-id", { signal: controller.signal }),
          fetch("/api/data/pdo-points", { signal: controller.signal }),
          fetch("/api/data/country-codes", { signal: controller.signal }),
        ]);

        if (!pdoRes.ok || !pointsRes.ok || !countryRes.ok) {
          throw new Error("Failed to fetch PDO explorer data");
        }

        const [pdoJson, pointsJson, countryJson] = await Promise.all([
          pdoRes.json(),
          pointsRes.json(),
          countryRes.json(),
        ]);

        if (!isActive) return;

        setPdoData(Array.isArray(pdoJson) ? pdoJson : []);
        setPdoPointsData(pointsJson);
        setCountryData(Array.isArray(countryJson) ? countryJson : []);
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

  const municipalityOptions = useMemo(() => {
    const uniqueMunicipalities = [
      ...new Set(
        pdoData.flatMap((item) =>
          item.munic
            .split("/")
            .map((entry) => entry.trim())
            .filter(Boolean),
        ),
      ),
    ];

    return uniqueMunicipalities
      .sort((a, b) => a.localeCompare(b))
      .map((municipality) => ({ label: municipality, value: municipality }));
  }, [pdoData]);

  const categoryOptions = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        pdoData.flatMap((item) =>
          item.category
            .split("/")
            .map((entry) => entry.trim())
            .filter(Boolean),
        ),
      ),
    ];

    return uniqueCategories
      .sort((a, b) => a.localeCompare(b))
      .map((category) => ({ label: category, value: category }));
  }, [pdoData]);

  const varietyOptions = useMemo(() => {
    const uniqueVarieties = [
      ...new Set(
        pdoData.flatMap((item) =>
          (item.varietiesOiv ?? "")
            .split("/")
            .map((entry) => entry.trim())
            .filter(Boolean),
        ),
      ),
    ];

    return uniqueVarieties
      .sort((a, b) => a.localeCompare(b))
      .map((variety) => ({ label: variety, value: variety }));
  }, [pdoData]);

  const countryOptions = useMemo(() => {
    const usedCountryCodes = new Set(
      pdoData.map((item) => item.country.trim()).filter(Boolean),
    );

    return countryData
      .filter((country) => usedCountryCodes.has(country.code))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((country) => ({
        label: country.name,
        value: country.code,
      }));
  }, [countryData, pdoData]);

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

  const fitMapToPdoIds = useCallback(
    (pdoIds: string[]) => {
      if (!pdoIds.length || !mapRef.current) return;

      const matchingFeatures = pdoIds
        .map((id) => pointFeatureByPdoId.get(id))
        .filter((feature): feature is PdoPointFeature => Boolean(feature));

      if (!matchingFeatures.length) return;

      const [minLng, minLat, maxLng, maxLat] = bbox({
        type: "FeatureCollection",
        features: matchingFeatures,
      });

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
    [pointFeatureByPdoId],
  );

  const showPdoIdsOnMap = useCallback(
    (pdoIds: string[]) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      if (!pdoIds.length) {
        resetMapView();
        return;
      }

      map
        .setFilter("pdo-area", ["match", ["get", "PDOid"], pdoIds, true, false])
        .setFilter("pdo-pins", ["match", ["get", "PDOid"], pdoIds, true, false]);

      fitMapToPdoIds(pdoIds);
    },
    [fitMapToPdoIds, resetMapView],
  );

  const updateUrlForFilter = useCallback((nextFilters: FilterState) => {
    const params = new URLSearchParams();

    if (nextFilters.pdoName) params.set("pdoname", nextFilters.pdoName);
    else if (nextFilters.country) params.set("country", nextFilters.country);
    else if (nextFilters.municipality) params.set("munic", nextFilters.municipality);
    else if (nextFilters.category) params.set("cat", nextFilters.category);
    else if (nextFilters.variety) params.set("variety", nextFilters.variety);

    const query = params.toString();
    history.replaceState({}, "", query ? `?${query}` : window.location.pathname);
  }, []);

  const clearSelection = useCallback(() => {
    setFilters({});
    resetMapView();
    history.replaceState({}, "", window.location.pathname);
  }, [resetMapView]);

  const applyFilter = useCallback(
    (nextFilters: FilterState, matchingPdos: PDORecord[]) => {
      if (!matchingPdos.length) {
        clearSelection();
        return;
      }

      setFilters(nextFilters);
      updateUrlForFilter(nextFilters);
      showPdoIdsOnMap(matchingPdos.map((item) => item.pdoid));
    },
    [clearSelection, showPdoIdsOnMap, updateUrlForFilter],
  );

  const handlePdoChange = useCallback(
    (value: string | undefined) => {
      if (!value) {
        clearSelection();
        return;
      }

      const matchingPdos = pdoData.filter((item) => item.pdoname === value);
      applyFilter({ pdoName: value }, matchingPdos);
    },
    [applyFilter, clearSelection, pdoData],
  );

  const handleCountryChange = useCallback(
    (value: string | undefined) => {
      if (!value) {
        clearSelection();
        return;
      }

      const matchingPdos = pdoData.filter((item) => item.country === value);
      applyFilter({ country: value }, matchingPdos);
    },
    [applyFilter, clearSelection, pdoData],
  );

  const handleMunicipalityChange = useCallback(
    (value: string | undefined) => {
      if (!value) {
        clearSelection();
        return;
      }

      const matchingPdos = pdoData.filter((item) =>
        item.munic.split("/").some((entry) => entry.trim() === value),
      );
      applyFilter({ municipality: value }, matchingPdos);
    },
    [applyFilter, clearSelection, pdoData],
  );

  const handleCategoryChange = useCallback(
    (value: string | undefined) => {
      if (!value) {
        clearSelection();
        return;
      }

      const matchingPdos = pdoData.filter((item) =>
        item.category.split("/").some((entry) => entry.trim() === value),
      );
      applyFilter({ category: value }, matchingPdos);
    },
    [applyFilter, clearSelection, pdoData],
  );

  const handleVarietyChange = useCallback(
    (value: string | undefined) => {
      if (!value) {
        clearSelection();
        return;
      }

      const matchingPdos = pdoData.filter((item) =>
        (item.varietiesOiv ?? "").split("/").some((entry) => entry.trim() === value),
      );
      applyFilter({ variety: value }, matchingPdos);
    },
    [applyFilter, clearSelection, pdoData],
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
                      value={filters.pdoName}
                      className="w-full"
                      disabled={isLoadingData || !!loadError}
                      notFoundContent={loadError ?? "No PDOs found"}
                    />
                    <Select
                      showSearch
                      allowClear
                      placeholder="country"
                      popupMatchSelectWidth={290}
                      onChange={handleCountryChange}
                      options={countryOptions}
                      value={filters.country}
                      className="w-full"
                      disabled={isLoadingData || !!loadError}
                      notFoundContent={loadError ?? "No countries found"}
                    />
                    <Select
                      showSearch
                      allowClear
                      placeholder="municipality"
                      popupMatchSelectWidth={290}
                      onChange={handleMunicipalityChange}
                      options={municipalityOptions}
                      value={filters.municipality}
                      className="w-full"
                      disabled={isLoadingData || !!loadError}
                      notFoundContent={loadError ?? "No municipalities found"}
                    />
                    <Select
                      showSearch
                      allowClear
                      placeholder="category"
                      popupMatchSelectWidth={290}
                      onChange={handleCategoryChange}
                      options={categoryOptions}
                      value={filters.category}
                      className="w-full"
                      disabled={isLoadingData || !!loadError}
                      notFoundContent={loadError ?? "No categories found"}
                    />
                    <Select
                      showSearch
                      allowClear
                      placeholder="variety"
                      popupMatchSelectWidth={290}
                      onChange={handleVarietyChange}
                      options={varietyOptions}
                      value={filters.variety}
                      className="w-full"
                      disabled={isLoadingData || !!loadError}
                      notFoundContent={loadError ?? "No varieties found"}
                    />
                    <button
                      className="px-4 py-1 flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black "
                      onClick={clearSelection}
                    >
                      reset
                    </button>
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
