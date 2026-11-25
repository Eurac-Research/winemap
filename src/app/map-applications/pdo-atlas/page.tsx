"use client";

import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { getMapApplicationByHref } from "@/content/map-applications";
import { BASEMAPS } from "@/content/maps/basemaps";
import { BOUNDARY_OVERLAYS } from "@/content/maps/boundaries";
import { ChevronLeft } from "lucide-react";
import { isMobile } from "react-device-detect";
import {
  NavigationControl,
  Map as ReactMap,
  ScaleControl,
  type MapLayerMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre";

import { MapApplicationHelp } from "@/components/maps/MapApplicationHelp";
import { MapApplicationNavigation } from "@/components/maps/MapApplicationNavigation";
import { MapLayerControl } from "@/components/maps/MapLayerControl";
import { MapLibreBoundaryLayers } from "@/components/maps/MapLibreBoundaryLayers";
import {
  DetailFieldList,
  type DetailField,
} from "@/components/pdo-app/DetailFieldList";
import {
  PdoFilterPanel,
  type FilterFieldConfig,
} from "@/components/pdo-app/PdoFilterPanel";
import { PdoLayers } from "@/components/pdo-app/PdoLayers";
import { PdoMapHoverTooltip } from "@/components/pdo-app/PdoMapHoverTooltip";
import { PdoMapLayout } from "@/components/pdo-app/PdoMapLayout";
import { PdoResultsList } from "@/components/pdo-app/PdoResultsList";
import { PdoSidebarShell } from "@/components/pdo-app/PdoSidebarShell";
import { usePdoAreas } from "@/components/pdo-app/usePdoAreas";
import { usePdoData, type PDORecord } from "@/components/pdo-app/usePdoData";

import "maplibre-gl/dist/maplibre-gl.css";

import { usePdoMapHover } from "@/components/pdo-app/usePdoMapHover";
import styles from "@/styles/Home.module.css";
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

interface FilterState {
  pdoName?: string;
  country?: string;
  municipality?: string;
  category?: string;
  variety?: string;
}

type FilterKey = keyof FilterState;

type SidebarView = "overview" | "list" | "detail";

const INITIAL_VIEW_STATE = {
  longitude: 14,
  latitude: 46.611715,
  zoom: 3.6,
  bearing: 0,
  pitch: 0,
};
const DEFAULT_PADDING = { top: 100, bottom: 25, left: 0, right: 5 };
const mapApplication = getMapApplicationByHref("/map-applications/pdo-atlas");

export default function PdoExplorerPage() {
  const mapRef = useRef<MapRef>(null);
  const [selectedBasemapId, setSelectedBasemapId] = useState("light");
  const selectedBasemap =
    BASEMAPS.find((item) => item.id === selectedBasemapId) ?? BASEMAPS[0];
  const [visibleBoundaryIds, setVisibleBoundaryIds] = useState<string[]>(() =>
    BOUNDARY_OVERLAYS.filter((item) => item.defaultVisible).map(
      (item) => item.id,
    ),
  );
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [mapError, setMapError] = useState<string | null>(null);
  const { areas, boundsById, areaError } = usePdoAreas();
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedPdoId, setSelectedPdoId] = useState<string | null>(null);
  const [mapSelectedPdoIds, setMapSelectedPdoIds] = useState<string[]>([]);
  const {
    pdoData,
    pdoPointsData,
    isLoadingData,
    loadError,
    pdoOptions,
    municipalityOptions,
    categoryOptions,
    varietyOptions,
    countryOptions,
    pointFeatureByPdoId,
  } = usePdoData(true);
  const { hoverInfo, getPdoNameById, onHover, clearHover } =
    usePdoMapHover(pdoData);

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
      return sortByName(
        pdoData.filter((item) => item.pdoname === filters.pdoName),
      );
    }
    if (filters.country) {
      return sortByName(
        pdoData.filter((item) => item.country === filters.country),
      );
    }
    if (filters.municipality) {
      return sortByName(
        pdoData.filter((item) =>
          item.munic
            .split("/")
            .some((entry) => entry.trim() === filters.municipality),
        ),
      );
    }
    if (filters.category) {
      return sortByName(
        pdoData.filter((item) =>
          item.category
            .split("/")
            .some((entry) => entry.trim() === filters.category),
        ),
      );
    }
    if (filters.variety) {
      return sortByName(
        pdoData.filter((item) =>
          (item.varietiesOiv ?? "")
            .split("/")
            .some((entry) => entry.trim() === filters.variety),
        ),
      );
    }
    return [];
  }, [filters, pdoData]);

  const selectedPdo = useMemo(
    () => pdoData.find((item) => item.pdoid === selectedPdoId) ?? null,
    [pdoData, selectedPdoId],
  );

  const mapSelectedPdos = useMemo(
    () => pdoData.filter((item) => mapSelectedPdoIds.includes(item.pdoid)),
    [mapSelectedPdoIds, pdoData],
  );

  const sidebarListPdos =
    mapSelectedPdos.length > 0 ? mapSelectedPdos : filteredPdos;
  const listSummary =
    mapSelectedPdos.length > 0
      ? "Overlapping PDOs at the selected location"
      : filterSummary;

  const sidebarView = useMemo<SidebarView>(() => {
    if (selectedPdo) return "detail";
    if (sidebarListPdos.length > 0) return "list";
    return "overview";
  }, [selectedPdo, sidebarListPdos.length]);

  const overviewStats = useMemo(() => {
    const countryCount = new Set(
      pdoData.map((item) => item.country).filter(Boolean),
    ).size;
    const categoryCount = new Set(
      pdoData.flatMap((item) =>
        item.category
          .split("/")
          .map((entry) => entry.trim())
          .filter(Boolean),
      ),
    ).size;
    const varietyCount = new Set(
      pdoData.flatMap((item) =>
        (item.varietiesOiv ?? "")
          .split("/")
          .map((entry) => entry.trim())
          .filter(Boolean),
      ),
    ).size;

    return [
      { label: "PDO regions", value: pdoData.length.toLocaleString() },
      { label: "Countries", value: countryCount.toString() },
      { label: "Categories", value: categoryCount.toString() },
      { label: "Varieties", value: varietyCount.toString() },
    ];
  }, [pdoData]);
  const resetMapView = useCallback(() => {
    mapRef.current?.flyTo({
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
    });
  }, []);
  const showPdoIdsOnMap = useCallback(
    (ids: string[]) => {
      const bounds = ids.flatMap<number[]>((id) => {
        const areaBounds = boundsById.get(id);
        if (areaBounds) return [areaBounds];
        const point = pointFeatureByPdoId.get(id)?.geometry;
        if (point?.type !== "Point") return [];
        const [x, y] = point.coordinates;
        return [[x, y, x, y]];
      });
      if (!bounds.length) return;
      mapRef.current?.fitBounds(
        [
          [
            Math.min(...bounds.map((b) => b[0])),
            Math.min(...bounds.map((b) => b[1])),
          ],
          [
            Math.max(...bounds.map((b) => b[2])),
            Math.max(...bounds.map((b) => b[3])),
          ],
        ],
        { padding: DEFAULT_PADDING, duration: 700, maxZoom: 12 },
      );
    },
    [boundsById, pointFeatureByPdoId],
  );
  const visiblePdoIds = useMemo(
    () =>
      Object.keys(filters).length ? filteredPdos.map((pdo) => pdo.pdoid) : null,
    [filters, filteredPdos],
  );

  const updateSidebarUrl = useCallback(
    (nextFilters: FilterState, detailPdoId?: string | null) => {
      const params = new URLSearchParams();

      if (detailPdoId) params.set("pdo", detailPdoId);
      else if (nextFilters.pdoName) params.set("pdoname", nextFilters.pdoName);
      else if (nextFilters.country) params.set("country", nextFilters.country);
      else if (nextFilters.municipality)
        params.set("munic", nextFilters.municipality);
      else if (nextFilters.category) params.set("cat", nextFilters.category);
      else if (nextFilters.variety) params.set("variety", nextFilters.variety);

      const query = params.toString();
      history.replaceState(
        {},
        "",
        query ? `?${query}` : window.location.pathname,
      );
    },
    [],
  );

  const clearSelectionInPlace = useCallback(() => {
    setFilters({});
    setSelectedPdoId(null);
    setMapSelectedPdoIds([]);
    history.replaceState({}, "", window.location.pathname);
  }, []);

  const clearSelection = useCallback(() => {
    clearSelectionInPlace();
    resetMapView();
  }, [clearSelectionInPlace, resetMapView]);

  const applyFilter = useCallback(
    (nextFilters: FilterState, matchingPdos: PDORecord[]) => {
      if (!matchingPdos.length) {
        clearSelection();
        return;
      }

      setSelectedPdoId(null);
      setMapSelectedPdoIds([]);
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
        (item.varietiesOiv ?? "")
          .split("/")
          .some((entry) => entry.trim() === value),
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

    if (mapSelectedPdoIds.length > 0) {
      showPdoIdsOnMap(mapSelectedPdoIds);
      history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (filteredPdos.length > 0) {
      showPdoIdsOnMap(filteredPdos.map((item) => item.pdoid));
      updateSidebarUrl(filters, null);
      return;
    }

    updateSidebarUrl({}, null);
  }, [
    filteredPdos,
    filters,
    mapSelectedPdoIds,
    showPdoIdsOnMap,
    updateSidebarUrl,
  ]);

  const handleMapClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const pdoIds = Array.from(
        new Set(
          event.features
            ?.map((feature) => {
              const pdoId = feature?.properties?.pdoid;
              return typeof pdoId === "string" ? pdoId : null;
            })
            .filter((pdoId): pdoId is string => Boolean(pdoId)) ?? [],
        ),
      );

      if (!pdoIds.length) {
        clearSelectionInPlace();
        return;
      }

      if (pdoIds.length > 1) {
        setSelectedPdoId(null);
        setMapSelectedPdoIds(pdoIds);
        history.replaceState({}, "", window.location.pathname);
        return;
      }

      setMapSelectedPdoIds([]);
      openPdoDetail(pdoIds[0]);
    },
    [clearSelectionInPlace, openPdoDetail],
  );

  const filterFields = useMemo<FilterFieldConfig<FilterKey>[]>(
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
        {
          label: "Registration",
          value: selectedPdo.registration,
          icon: registrationIcon,
        },
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
        {
          label: "Irrigation",
          value: selectedPdo.irrigation,
          icon: irrigationIcon,
        },
        {
          label: "Amendment",
          value: selectedPdo.amendment,
          icon: amendmentIcon,
        },
        {
          label: "Municipalities",
          value: selectedPdo.munic.replaceAll("/", ", "),
          icon: municIcon,
        },
        {
          label: "Begin LIFES",
          value: selectedPdo["begin-lifes"],
          icon: infoIcon,
        },
      ]
    : [];

  const sidebarTop = (
    <PdoFilterPanel
      eyebrow="European PDO Atlas"
      heading="Filter wine regions"
      helpContent={
        mapApplication?.help ? (
          <MapApplicationHelp help={mapApplication.help} />
        ) : undefined
      }
      filterFields={filterFields}
      filters={filters}
      isLoadingData={isLoadingData}
      filtersDisabled={filtersDisabled}
      loadError={loadError ?? areaError}
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
          title={`${sidebarListPdos.length.toLocaleString()} matching PDOs`}
          summary={listSummary}
          items={sidebarListPdos}
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
    <div className="relative h-full w-full">
      <ReactMap
        key={selectedBasemap.id}
        ref={mapRef}
        minZoom={isMobile ? 1 : 3}
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={selectedBasemap.style}
        onLoad={() => setMapError(null)}
        onError={(event) => {
          console.error("PDO map resource error", event.error);
          queueMicrotask(() =>
            setMapError(
              "Some map resources could not be loaded. Try another basemap.",
            ),
          );
        }}
        interactiveLayerIds={["pdo-area", "pdo-pins"]}
        cursor={hoverInfo ? "pointer" : "grab"}
        onClick={handleMapClick}
        onMouseMove={onHover}
        onMouseLeave={clearHover}
      >
        <PdoLayers
          points={pdoPointsData}
          areas={areas}
          visibleIds={visiblePdoIds}
          selectedId={selectedPdoId}
        />
        <MapLibreBoundaryLayers
          overlays={BOUNDARY_OVERLAYS}
          visibleIds={visibleBoundaryIds}
        />
        <NavigationControl
          position="bottom-right"
          visualizePitch={true}
          showCompass={true}
        />
        <ScaleControl position="bottom-right" />
      </ReactMap>
      <div className="absolute top-3 left-5 z-10">
        <MapLayerControl
          basemaps={BASEMAPS}
          selectedBasemapId={selectedBasemap.id}
          onBasemapChange={(id) => {
            clearHover();
            setMapError(null);
            setSelectedBasemapId(id);
          }}
          referenceAreas={{
            overlays: BOUNDARY_OVERLAYS,
            visibleIds: visibleBoundaryIds,
            onVisibilityChange: (id, visible) =>
              setVisibleBoundaryIds((current) =>
                visible
                  ? [...new Set([...current, id])]
                  : current.filter((item) => item !== id),
              ),
          }}
        />
      </div>
      {(!areas || mapError) && (
        <div
          role="status"
          className="absolute bottom-8 left-3 rounded bg-[var(--surface)] p-2 text-sm"
        >
          {areaError ?? mapError ?? "Loading PDO boundaries…"}
        </div>
      )}
      {hoverInfo && (
        <PdoMapHoverTooltip
          hoverInfo={hoverInfo}
          getPdoNameById={getPdoNameById}
        />
      )}
    </div>
  );

  return (
    <>
      <PdoMapLayout
        className="top-[calc(var(--top-nav-height)+3.5rem)] sm:left-14 sm:top-[var(--top-nav-height)]"
        sidebar={
          <Suspense fallback={<div>Loading...</div>}>
            <PdoSidebarShell top={sidebarTop} body={sidebarBody} />
          </Suspense>
        }
        map={mapContent}
      />
      <MapApplicationNavigation activeHref="/map-applications/pdo-atlas" />
    </>
  );
}
