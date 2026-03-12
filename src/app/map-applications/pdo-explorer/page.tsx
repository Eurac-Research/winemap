"use client";

import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { NavigationControl, Map as ReactMap, ScaleControl, type MapRef } from "react-map-gl/mapbox";
import { isMobile } from "react-device-detect";
import bbox from "@turf/bbox";
import { ChevronLeft } from "lucide-react";
import { DetailFieldList, type DetailField } from "@/app/components/pdo-app/DetailFieldList";
import { PdoFilterPanel, type FilterFieldConfig } from "@/app/components/pdo-app/PdoFilterPanel";
import { PdoMapLayout } from "@/app/components/pdo-app/PdoMapLayout";
import { PdoResultsList } from "@/app/components/pdo-app/PdoResultsList";
import { PdoSidebarShell } from "@/app/components/pdo-app/PdoSidebarShell";
import {
  usePdoData,
  type PDORecord,
  type PdoPointFeature,
} from "@/app/components/pdo-app/usePdoData";
import styles from "@/styles/Home.module.css";
import amendmentIcon from "@/public/icons/Amendment-outline.svg";
import categoryIcon from "@/public/icons/Category.svg";
import countryIcon from "@/public/icons/CountryName-outline.svg";
import densityIcon from "@/public/icons/Planting-density-2-outline.svg";
import infoIcon from "@/public/icons/Information-outline.svg";
import irrigationIcon from "@/public/icons/Irrigation-outline.svg";
import municIcon from "@/public/icons/Municipalities-outline.svg";
import pdoIcon from "@/public/icons/PDOid.svg";
import registrationIcon from "@/public/icons/Registration-outline.svg";
import varietiesOIVIcon from "@/public/icons/Varieties-OIV-outline.svg";
import varietiesOtherIcon from "@/public/icons/Varieties-others-outline.svg";
import yieldHlIcon from "@/public/icons/Yield-hl-3-outline.svg";
import yieldKgIcon from "@/public/icons/Yield-kg-1-outline.svg";

interface FilterState {
  pdoName?: string;
  country?: string;
  municipality?: string;
  category?: string;
  variety?: string;
}

type FilterKey = keyof FilterState;

type SidebarView = "overview" | "list" | "detail";

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
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedPdoId, setSelectedPdoId] = useState<string | null>(null);
  const {
    pdoData,
    isLoadingData,
    loadError,
    pdoOptions,
    municipalityOptions,
    categoryOptions,
    varietyOptions,
    countryOptions,
    pointFeatureByPdoId,
  } = usePdoData();

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
      handlePdoChange,
      handleVarietyChange,
      loadError,
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

  const sidebarTop = (
    <PdoFilterPanel
      eyebrow="European PDO Atlas"
      heading="Filter wine regions"
      filterFields={filterFields}
      filters={filters}
      isLoadingData={isLoadingData}
      filtersDisabled={filtersDisabled}
      loadError={loadError}
      onReset={clearSelection}
    />
  );

  const sidebarBody = (
    <>
      {sidebarView === "overview" && (
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarSectionHeader}>
            <p className={styles.sidebarSectionEyebrow}>Overview</p>
            <h3 className={styles.sidebarSectionTitle}>Explore the dataset</h3>
            <p className={styles.sidebarSectionText}>
              Use the filters above to focus the map. Matching PDOs will appear
              here, and selecting one opens a more detailed sidebar view.
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
        <PdoResultsList
          title={`${filteredPdos.length.toLocaleString()} matching PDOs`}
          summary={filterSummary}
          items={filteredPdos}
          onSelect={openPdoDetail}
        />
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
          <DetailFieldList fields={detailFields} />
          <dl className={styles.detailGrid}>
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
                  Open eAmbrosia
                </a>
              </dd>
            </div>
          </dl>
        </div>
      )}
    </>
  );

  const mapContent = (
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
  );

  return (
    <PdoMapLayout
      sidebar={
        <Suspense fallback={<div>Loading...</div>}>
          <PdoSidebarShell top={sidebarTop} body={sidebarBody} />
        </Suspense>
      }
      map={mapContent}
    />
  );
}
