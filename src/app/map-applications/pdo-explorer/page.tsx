"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

export interface JSONObject {
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

export default function MapContainer() {
  const mapRef = useRef<MapRef>(null);
  const MAPBOX_TOKEN = "";

  const [pdos, setPdos] = useState<JSONObject[] | null>(null);
  const [activePDO, setActivePDO] = useState<JSONObject | null>(null);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [selectCatValue, setSelectCatValue] = useState<string | null>(null);
  const [selectMunicValue, setSelectMunicValue] = useState<string | null>(null);
  const [selectCountryValue, setSelectCountryValue] = useState<string | null>(
    null,
  );
  const [selectVarValue, setSelectVarValue] = useState<string | null>(null);
  const [pdoData, setPdoData] = useState<JSONObject[]>([]);
  const data = pdoData;
  const [pdoPointsData, setPdoPointsData] = useState<{ features?: any[] } | null>(
    null,
  );
  const allPDOPoints = useMemo(
    () => pdoPointsData ?? { features: [] },
    [pdoPointsData],
  );
  const paddingResponsive = { top: 100, bottom: 25, left: 0, right: 5 };

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadData = async () => {
      try {
        const [pdoRes, pointsRes] = await Promise.all([
          fetch("/api/data/pdo-eu-id", { signal: controller.signal }),
          fetch("/api/data/pdo-points", { signal: controller.signal }),
        ]);

        if (!pdoRes.ok || !pointsRes.ok) {
          return;
        }

        const [pdoJson, pointsJson] = await Promise.all([
          pdoRes.json(),
          pointsRes.json(),
        ]);

        if (!isActive) return;

        setPdoData(Array.isArray(pdoJson) ? pdoJson : []);
        setPdoPointsData(pointsJson);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to load PDO explorer data", error);
        }
      }
    };

    void loadData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const onClearFilter = useCallback(async () => {
    setActivePDO(null);
    setSelectValue(null);
    setSelectMunicValue(null);
    setSelectCatValue(null);
    setSelectVarValue(null);
    setPdos(null);
    mapRef.current &&
      mapRef.current
        .getMap()
        .setFilter("pdo-area", null)
        .setFilter("pdo-pins", null)
        .setCenter([5, 46])
        .zoomTo(3.6, {
          duration: 1000,
          offset: [100, 50],
        });
    history.replaceState({}, "", window.location.pathname);
  }, [mapRef]);

  const openDetail = useCallback(
    async (id: string) => {
      const match = data.find((i: { pdoid: any }) => id === i.pdoid);
      if (!match) return;
      history.replaceState({}, "", `?pdo=${encodeURI(id)}`);
      setActivePDO(match);
    },
    [data],
  );

  const getPdoIDsByPdoName = useCallback(
    async (pdoname: string) => {
      const PDOList = data.filter((i) => pdoname === i.pdoname);

      if (!PDOList.length) {
        onClearFilter();
        return;
      }

      const showIDs = PDOList.map((item) => {
        return item.pdoid;
      });

      openDetail(showIDs[0]);

      const clearFilter =
        mapRef.current &&
        mapRef.current
          .getMap()
          .setFilter("pdo-area", null)
          .setFilter("pdo-pins", null);

      const filter =
        mapRef.current &&
        mapRef.current
          .getMap()
          .setFilter("pdo-area", [
            "match",
            ["get", "PDOid"],
            showIDs,
            true,
            false,
          ])
          .setFilter("pdo-pins", [
            "match",
            ["get", "PDOid"],
            showIDs,
            true,
            false,
          ]);
      const filteredFeatures =
        allPDOPoints.features?.filter(
          (item: { properties: { PDOid: string } }) =>
            item?.properties?.PDOid === showIDs[0],
        ) ?? [];

      if (filteredFeatures.length > 0) {
        const [minLng, minLat, maxLng, maxLat] = bbox(filteredFeatures[0]);
        mapRef.current &&
          mapRef.current.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat],
            ],
            {
              padding: paddingResponsive,
              duration: 500,
              maxZoom: 8,
            },
          );
      }
    },
    [data, allPDOPoints, onClearFilter, openDetail, mapRef, paddingResponsive],
  );

  const onSelectPdoNameChange = useCallback(
    (value: string) => {
      history.replaceState({}, "", `?pdoname=${encodeURI(value.toString())}`);
      setActivePDO(null);
      setSelectValue(value);
      setSelectMunicValue(null);
      setSelectCatValue(null);
      setSelectVarValue(null);
      setSelectCountryValue(null);
      getPdoIDsByPdoName(value);
    },
    [getPdoIDsByPdoName],
  );

  const selectPdonames = useMemo(() => {
    const uniquePdonames = [...new Set(data.map((item) => item.pdoname))];
    return uniquePdonames
      .filter(Boolean)
      .sort()
      .map((pdoName) => ({ label: pdoName, value: pdoName }));
  }, [data]);

  return (
    <div className="fixed inset-0 z-10 pt-[60px]">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={isMobile ? 30 : 25}
          // minSize={isMobile ? 15 : 25}
          // maxSize={isMobile ? 70 : 45}
          className="relative min-w-0 overflow-hidden"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <div className={styles.panelFrame}>
              <div className={styles.frontpageContent}>
                <div id="map-filter-content" className={styles.filterBarContent}>
                  <div className={styles.filter}>
                    <Select
                      showSearch
                      placeholder="PDO"
                      popupMatchSelectWidth={290}
                      onChange={onSelectPdoNameChange}
                      options={selectPdonames}
                      value={selectValue}
                      className = 'w-full'
                    />
                    {/* <Select
                      showSearch
                      placeholder="country"
                      popupMatchSelectWidth={290}
                      optionFilterProp="children"
                      onChange={onSelectCountryNameChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      fieldNames={{ label: "name", value: "code" }}
                      options={selectCountry}
                      value={selectCountryValue}
                    />
                    <Select
                      showSearch
                      placeholder="municipality"
                      popupMatchSelectWidth={290}
                      optionFilterProp="children"
                      onChange={onSelectMunicChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.value ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      fieldNames={{ label: "label", value: "value" }}
                      options={selectMunic}
                      value={selectMunicValue}
                    />
                    <Select
                      showSearch
                      placeholder="category"
                      popupMatchSelectWidth={290}
                      optionFilterProp="children"
                      onChange={onSearchCatChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.value ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      fieldNames={{ label: "label", value: "value" }}
                      options={selectCategories}
                      value={selectCatValue}
                    />
                    <Select
                      showSearch
                      placeholder="variety"
                      popupMatchSelectWidth={290}
                      optionFilterProp="children"
                      onChange={onSearchVarietyChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.value ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      fieldNames={{ label: "label", value: "value" }}
                      options={selectVarieties}
                      value={selectVarValue}
                    /> */}
                    {/* <button
                      className="px-4 py-1 flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black "
                      onClick={() => onClearFilter()}
                    >
                      reset
                    </button> */}
                  </div>
                  {/* <div className="flex items-center mt-5 gap-3">
                    {zoomLevel && zoomLevel > 7 && (
                      <div className={styles.toggleVineyards}>
                        <button
                          className="px-4 py-1 flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black "
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                          ) => toggleVineyards(e)}
                        >
                          {vineyardVisibility ? "hide" : "show"} vineyards
                        </button>
                      </div>
                    )}
                  </div> */}
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
              initialViewState={{
                latitude: 46,
                longitude: 5,
                zoom: 3.6,
                bearing: 0,
                pitch: 0,
              }}
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
