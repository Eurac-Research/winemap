"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
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
import { ChevronLeft } from "lucide-react";
import amendmentIcon from "@/public/icons/Amendment-outline.svg";
import categoryIcon from "@/public/icons/Category.svg";
import countryIcon from "@/public/icons/CountryName-outline.svg";
import infoIcon from "@/public/icons/Information-outline.svg";
import irrigationIcon from "@/public/icons/Irrigation-outline.svg";
import municIcon from "@/public/icons/Municipalities-outline.svg";
import pdoIcon from "@/public/icons/PDOid.svg";
import densityIcon from "@/public/icons/Planting-density-2-outline.svg";
import registrationIcon from "@/public/icons/Registration-outline.svg";
import varietiesOIVIcon from "@/public/icons/Varieties-OIV-outline.svg";
import varietiesOtherIcon from "@/public/icons/Varieties-others-outline.svg";
import yieldHlIcon from "@/public/icons/Yield-hl-3-outline.svg";
import yieldKgIcon from "@/public/icons/Yield-kg-1-outline.svg";

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

type SidebarView = "overview" | "list" | "detail";

interface DetailField {
  label: string;
  value: string | number | null;
  icon: StaticImageData;
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
      {/* <span className={styles.filterLabel}>{label}</span> */}
      <Select
        showSearch
        allowClear
        placeholder={loadingPlaceholder ?? placeholder}
        popupMatchSelectWidth={290}
        onChange={onChange}
        options={options}
        value={value}
        className={styles.filterSelect}
        classNames={{
          popup: {
            root: styles.filterDropdown,
          },
        }}
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
  const [selectedPdoId, setSelectedPdoId] = useState<string | null>(null);
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

  const filterSummary = useMemo(() => {
    if (filters.pdoName) return `PDO: ${filters.pdoName}`;
    if (filters.country) {
      return `Country: ${countryOptions.find((option) => option?.value === filters.country)?.label ?? filters.country}`;
    }
    if (filters.municipality) return `Municipality: ${filters.municipality}`;
    if (filters.category) return `Category: ${filters.category}`;
    if (filters.variety) return `Variety: ${filters.variety}`;
    return null;
  }, [countryOptions, filters]);

  const filteredPdos = useMemo(() => {
    const sortByName = (items: PDORecord[]) =>
      [...items].sort((a, b) => a.pdoname.localeCompare(b.pdoname));

    if (filters.pdoName) {
      return sortByName(pdoData.filter((item) => item.pdoname === filters.pdoName));
    }
    if (filters.country) {
      return sortByName(pdoData.filter((item) => item.country === filters.country));
    }
    if (filters.municipality) {
      return sortByName(
        pdoData.filter((item) =>
          item.munic.split("/").some((entry) => entry.trim() === filters.municipality),
        ),
      );
    }
    if (filters.category) {
      return sortByName(
        pdoData.filter((item) =>
          item.category.split("/").some((entry) => entry.trim() === filters.category),
        ),
      );
    }
    if (filters.variety) {
      return sortByName(
        pdoData.filter((item) =>
          (item.varietiesOiv ?? "").split("/").some((entry) => entry.trim() === filters.variety),
        ),
      );
    }
    return [];
  }, [filters, pdoData]);

  const selectedPdo = useMemo(
    () => pdoData.find((item) => item.pdoid === selectedPdoId) ?? null,
    [pdoData, selectedPdoId],
  );

  const sidebarView = useMemo<SidebarView>(() => {
    if (selectedPdo) return "detail";
    if (filteredPdos.length > 0) return "list";
    return "overview";
  }, [filteredPdos.length, selectedPdo]);

  const overviewStats = useMemo(() => {
    const countryCount = new Set(pdoData.map((item) => item.country).filter(Boolean)).size;
    const categoryCount = new Set(
      pdoData.flatMap((item) => item.category.split("/").map((entry) => entry.trim()).filter(Boolean)),
    ).size;
    const varietyCount = new Set(
      pdoData.flatMap((item) => (item.varietiesOiv ?? "").split("/").map((entry) => entry.trim()).filter(Boolean)),
    ).size;

    return [
      { label: "PDO regions", value: pdoData.length.toLocaleString() },
      { label: "Countries", value: countryCount.toString() },
      { label: "Categories", value: categoryCount.toString() },
      { label: "Varieties", value: varietyCount.toString() },
    ];
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

  const updateSidebarUrl = useCallback((nextFilters: FilterState, detailPdoId?: string | null) => {
    const params = new URLSearchParams();

    if (detailPdoId) params.set("pdo", detailPdoId);
    else if (nextFilters.pdoName) params.set("pdoname", nextFilters.pdoName);
    else if (nextFilters.country) params.set("country", nextFilters.country);
    else if (nextFilters.municipality) params.set("munic", nextFilters.municipality);
    else if (nextFilters.category) params.set("cat", nextFilters.category);
    else if (nextFilters.variety) params.set("variety", nextFilters.variety);

    const query = params.toString();
    history.replaceState({}, "", query ? `?${query}` : window.location.pathname);
  }, []);

  const clearSelection = useCallback(() => {
    setFilters({});
    setSelectedPdoId(null);
    resetMapView();
    history.replaceState({}, "", window.location.pathname);
  }, [resetMapView]);

  const applyFilter = useCallback(
    (nextFilters: FilterState, matchingPdos: PDORecord[]) => {
      if (!matchingPdos.length) {
        clearSelection();
        return;
      }

      setSelectedPdoId(null);
      setFilters(nextFilters);
      updateSidebarUrl(nextFilters, null);
      showPdoIdsOnMap(matchingPdos.map((item) => item.pdoid));
    },
    [clearSelection, showPdoIdsOnMap, updateSidebarUrl],
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

  const openPdoDetail = useCallback(
    (pdoId: string) => {
      setSelectedPdoId(pdoId);
      showPdoIdsOnMap([pdoId]);
      updateSidebarUrl(filters, pdoId);
    },
    [filters, showPdoIdsOnMap, updateSidebarUrl],
  );

  const closePdoDetail = useCallback(() => {
    setSelectedPdoId(null);

    if (filteredPdos.length > 0) {
      showPdoIdsOnMap(filteredPdos.map((item) => item.pdoid));
      updateSidebarUrl(filters, null);
      return;
    }

    updateSidebarUrl({}, null);
  }, [filteredPdos, filters, showPdoIdsOnMap, updateSidebarUrl]);

  const filterFields = useMemo<FilterFieldConfig[]>(
    () => [
      {
        key: "pdoName",
        label: "PDO name",
        placeholder: "Name",
        options: pdoOptions,
        emptyText: loadError ?? "No PDOs found",
        onChange: handlePdoChange,
      },
      {
        key: "country",
        label: "Country",
        placeholder: "Country",
        options: countryOptions,
        emptyText: loadError ?? "No countries found",
        onChange: handleCountryChange,
      },
      // {
      //   key: "municipality",
      //   label: "Municipality",
      //   placeholder: "Municipality",
      //   options: municipalityOptions,
      //   emptyText: loadError ?? "No municipalities found",
      //   onChange: handleMunicipalityChange,
      // },
      {
        key: "category",
        label: "Category",
        placeholder: "Category",
        options: categoryOptions,
        emptyText: loadError ?? "No categories found",
        onChange: handleCategoryChange,
      },
      {
        key: "variety",
        label: "Variety",
        placeholder: "Variety",
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
  const detailFields: DetailField[] = selectedPdo
    ? [
        { label: "Country", value: selectedPdo.country, icon: countryIcon },
        { label: "PDO ID", value: selectedPdo.pdoid, icon: pdoIcon },
        { label: "PDO name", value: selectedPdo.pdoname, icon: pdoIcon },
        { label: "Registration", value: selectedPdo.registration, icon: registrationIcon },
        { label: "Category", value: selectedPdo.category, icon: categoryIcon },
        {
          label: "Varieties OIV",
          value: selectedPdo.varietiesOiv?.replaceAll("/", ", ") ?? null,
          icon: varietiesOIVIcon,
        },
        {
          label: "Varieties",
          value: selectedPdo.varieties?.replaceAll("/", ", ") ?? null,
          icon: varietiesOtherIcon,
        },
        {
          label: "Max yield (hl)",
          value:
            selectedPdo["max-yield-hl"] != null
              ? `${selectedPdo["max-yield-hl"]} hl`
              : null,
          icon: yieldHlIcon,
        },
        {
          label: "Max yield (kg)",
          value:
            selectedPdo["max-yield-kg"] != null
              ? `${selectedPdo["max-yield-kg"]} kg`
              : null,
          icon: yieldKgIcon,
        },
        {
          label: "Min planting density",
          value:
            selectedPdo["min-planting-density"] != null
              ? `${selectedPdo["min-planting-density"]} vine stocks/ha`
              : null,
          icon: densityIcon,
        },
        { label: "Irrigation", value: selectedPdo.irrigation, icon: irrigationIcon },
        { label: "Amendment", value: selectedPdo.amendment, icon: amendmentIcon },
        {
          label: "Municipalities",
          value: selectedPdo.munic.replaceAll("/", ", "),
          icon: municIcon,
        },
        { label: "Begin LIFES", value: selectedPdo["begin-lifes"], icon: infoIcon },
      ]
    : [];

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
              <div className={styles.sidebarShell}>
                <div id="map-filter-content" className={styles.filterBarContent}>
                  <div className={styles.filterPanel}>
                    <div className={styles.filterHeader}>
                      <div className={styles.filterIntro}>
                        <p className={styles.filterEyebrow}>PDO Explorer</p>
                        <h2 className={styles.filterHeading}>Filter wine regions</h2>
                      </div>
                      <div className={styles.filterResetWrap}>
                        <button
                          className={styles.filterResetButton}
                          onClick={clearSelection}
                        >
                          reset
                        </button>
                      </div>
                    </div>

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
                    </div>
                    {loadError && <p className="mt-4 text-sm text-white/70">{loadError}</p>}
                  </div>
                </div>

                <div className={styles.sidebarBody}>
                  {sidebarView === "overview" && (
                    <div className={styles.sidebarSection}>
                      <div className={styles.sidebarSectionHeader}>
                        <p className={styles.sidebarSectionEyebrow}>Overview</p>
                        <h3 className={styles.sidebarSectionTitle}>Explore the dataset</h3>
                        <p className={styles.sidebarSectionText}>
                          Use the filters above to focus the map. Matching PDOs will
                          appear here, and selecting one opens a more detailed
                          sidebar view.
                        </p>
                      </div>
                      <div className={styles.statsGrid}>
                        {overviewStats.map((stat) => (
                          <article key={stat.label} className={styles.statCard}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {sidebarView === "list" && (
                    <div className={styles.sidebarSection}>
                      <div className={styles.sidebarSectionHeader}>
                        <p className={styles.sidebarSectionEyebrow}>Results</p>
                        <h3 className={styles.sidebarSectionTitle}>
                          {filteredPdos.length.toLocaleString()} matching PDOs
                        </h3>
                        {filterSummary && (
                          <p className={styles.sidebarSectionText}>{filterSummary}</p>
                        )}
                      </div>
                      <div className={styles.resultList}>
                        {filteredPdos.map((pdo) => (
                          <button
                            key={pdo.pdoid}
                            type="button"
                            className={styles.resultItem}
                            onClick={() => openPdoDetail(pdo.pdoid)}
                          >
                            <span className={styles.resultItemTitle}>{pdo.pdoname}</span>
                            <span className={styles.resultItemMeta}>
                              {pdo.country} · {pdo.category}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {sidebarView === "detail" && selectedPdo && (
                    <div className={styles.sidebarSection}>
                      <div className={styles.detailHeader}>
                        <button
                          type="button"
                          className={styles.detailBackButton}
                          onClick={closePdoDetail}
                        >
                          <ChevronLeft size={14} strokeWidth={2.25} />
                          <span>Back to results</span>
                        </button>
                        <p className={styles.sidebarSectionEyebrow}>PDO detail</p>
                        <h3 className={styles.detailTitle}>{selectedPdo.pdoname}</h3>
                        <p className={styles.sidebarSectionText}>
                          {selectedPdo.country} · {selectedPdo.category}
                        </p>
                      </div>
                      <dl className={styles.detailGrid}>
                        {detailFields.map((field) => (
                          <div key={field.label} className={styles.detailItem}>
                            <dt>
                              <Image
                                src={field.icon}
                                alt=""
                                width={22}
                                height={22}
                                className={styles.detailIcon}
                              />
                              <span>{field.label}</span>
                            </dt>
                            <dd>{field.value ?? "No data"}</dd>
                          </div>
                        ))}
                        <div className={styles.detailItem}>
                          <dt>
                            <Image
                              src={infoIcon}
                              alt=""
                              width={22}
                              height={22}
                              className={styles.detailIcon}
                            />
                            <span>PDO information</span>
                          </dt>
                          <dd>
                            <a
                              href={selectedPdo.pdoinfo}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.detailLink}
                            >
                              Open official entry
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  )}
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
