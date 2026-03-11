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
import type { SelectProps } from "antd";
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

type FilterKey = keyof FilterState;
type FilterOption = NonNullable<SelectProps["options"]>[number];

interface FilterFieldConfig {
  key: FilterKey;
  label: string;
  placeholder: string;
  options: FilterOption[];
  emptyText: string;
  onChange: (value: string | undefined) => void;
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

function FilterSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled,
  emptyText,
  loadingPlaceholder,
}: {
  label: string;
  placeholder: string;
  value?: string;
  options: FilterOption[];
  onChange: (value: string | undefined) => void;
  disabled: boolean;
  emptyText: string;
  loadingPlaceholder?: string;
}) {
  return (
    <div className={styles.filterField}>
      <span className={styles.filterLabel}>{label}</span>
      <Select
        showSearch
        allowClear
        placeholder={loadingPlaceholder ?? placeholder}
        popupMatchSelectWidth={290}
        onChange={onChange}
        options={options}
        value={value}
        className={styles.filterSelect}
        disabled={disabled}
        notFoundContent={emptyText}
      />
    </div>
  );
}

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

  const filterFields = useMemo<FilterFieldConfig[]>(
    () => [
      {
        key: "pdoName",
        label: "PDO name",
        placeholder: "PDO",
        options: pdoOptions,
        emptyText: loadError ?? "No PDOs found",
        onChange: handlePdoChange,
      },
      {
        key: "country",
        label: "Country",
        placeholder: "country",
        options: countryOptions,
        emptyText: loadError ?? "No countries found",
        onChange: handleCountryChange,
      },
      {
        key: "municipality",
        label: "Municipality",
        placeholder: "municipality",
        options: municipalityOptions,
        emptyText: loadError ?? "No municipalities found",
        onChange: handleMunicipalityChange,
      },
      {
        key: "category",
        label: "Category",
        placeholder: "category",
        options: categoryOptions,
        emptyText: loadError ?? "No categories found",
        onChange: handleCategoryChange,
      },
      {
        key: "variety",
        label: "Variety",
        placeholder: "variety",
        options: varietyOptions,
        emptyText: loadError ?? "No varieties found",
        onChange: handleVarietyChange,
      },
    ],
    [
      categoryOptions,
      countryOptions,
      handleCategoryChange,
      handleCountryChange,
      handleMunicipalityChange,
      handlePdoChange,
      handleVarietyChange,
      loadError,
      municipalityOptions,
      pdoOptions,
      varietyOptions,
    ],
  );

  const filtersDisabled = isLoadingData || !!loadError;

  return (
    <div className="fixed inset-0 z-10 pt-[60px]">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        {/* Sidebar */}
        <ResizablePanel defaultSize={isMobile ? 30 : 25} className="relative min-w-0 overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <div className={styles.panelFrame}>
              <div className={styles.frontpageContent}>
                <div id="map-filter-content" className={styles.filterBarContent}>

                  {/* Filters */}
                  <div className={styles.filterFields}>
                    {filterFields.map((field) => (
                      <FilterSelect
                        key={field.key}
                        label={field.label}
                        placeholder={field.placeholder}
                        loadingPlaceholder={
                          field.key === "pdoName" && isLoadingData
                            ? "Loading PDOs..."
                            : undefined
                        }
                        value={filters[field.key]}
                        options={field.options}
                        onChange={field.onChange}
                        disabled={filtersDisabled}
                        emptyText={field.emptyText}
                      />
                    ))}
                    <div className={styles.filterResetWrap}>
                      <button
                        className={styles.filterResetButton}
                        onClick={clearSelection}
                      >
                        reset
                      </button>
                    </div>
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

        {/* Map Panel */}
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
