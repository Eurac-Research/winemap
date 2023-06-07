"use client";

import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  NavigationControl,
  Map as ReactMap,
  ScaleControl,
  type MapRef,
} from "react-map-gl";

import Accordion from "@/app/components/accordion";
import styles from "@/styles/Home.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import Link from "next/link";
import bbox from "@turf/bbox";
import { Select } from "antd";
import { isMobile } from "react-device-detect";

import data from "@/app/data/PDO_EU_id.json";
import allCountries from "@/app/data/countryCodesFromDataHub.io.json";
import allPDOPoints from "@/app/data/pdo-points.json";
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
import Chart from "./components/charts/racechart";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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
export interface RootObject {
  type: string;
  name: string;
  features: Features[];
}
export interface Features {
  type: string;
  properties: Properties;
  geometry: Geometry;
}
export interface Properties {
  OBJECTID: number;
  PDOid: string;
}
export interface Geometry {
  type: string;
  coordinates: number[];
}
export default function Page({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const mapRef = useRef<MapRef>(null);

  const [hoverInfo, setHoverInfo] = useState<{
    count: number;
    feature: string[];
    munic: string[] | undefined;
    x: number;
    y: number;
  }>();

  const [pdos, setPdos] = useState<JSONObject[] | null>(null);
  const [activePDO, setActivePDO] = useState<JSONObject | null>(null);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [selectCatValue, setSelectCatValue] = useState<string | null>(null);
  const [selectMunicValue, setSelectMunicValue] = useState<string | null>(null);
  const [selectCountryValue, setSelectCountryValue] = useState<string | null>(
    null,
  );
  const [selectVarValue, setSelectVarValue] = useState<string | null>(null);
  const [fromSearch, setFromSearch] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number | null>(null);
  const [vineyardVisibility, setVineyardVisibility] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const year = new Date().getFullYear();
  /* fix fitBounds for mobile device */
  const paddingResponsive = isMobile
    ? { top: 100, bottom: 100, left: 0, right: 0 }
    : { top: 100, bottom: 25, left: 400, right: 5 };

  // navigate the page by passing the url params
  useEffect(() => {
    if (!mapLoaded) {
      return;
    }
    if (searchParams?.country) {
      onSelectCountryNameChange(decodeURI(searchParams?.country.toString()));
    } else if (searchParams?.pdoname) {
      onSelectPdoNameChange(decodeURI(searchParams?.pdoname.toString()));
    } else if (searchParams?.cat) {
      onSearchCatChange(decodeURI(searchParams?.cat.toString()));
    } else if (searchParams?.variety) {
      onSearchVarietyChange(decodeURI(searchParams?.variety.toString()));
    } else if (searchParams?.munic) {
      onSelectMunicChange(decodeURI(searchParams?.munic.toString()));
    } else if (searchParams?.pdo) {
      /* detail view */
      openDetail(decodeURI(searchParams?.pdo.toString()));
      showPDOonMap(decodeURI(searchParams?.pdo.toString()));
    }
  }, [
    mapLoaded,
    searchParams?.country,
    searchParams?.pdoname,
    searchParams?.cat,
    searchParams?.variety,
    searchParams?.munic,
    searchParams?.pdo,
  ]);

  async function openDetail(id: string) {
    const PDO = data.filter((i: { pdoid: any }) => id === i.pdoid);
    history.replaceState({}, "", `/?pdo=${encodeURI(id)}`);
    setActivePDO(PDO[0]);
  }
  /* return PDO Name by given PDOid */
  function getPDONameById(
    id:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined,
  ) {
    const PDO = data.filter((i: { pdoid: any }) => id === i.pdoid);
    return PDO[0].pdoname;
  }

  const onSelectPdoNameChange = (value: string) => {
    history.replaceState({}, "", `/?pdoname=${encodeURI(value.toString())}`);
    setActivePDO(null);
    setSelectValue(value);
    setSelectMunicValue(null);
    setSelectCatValue(null);
    setSelectVarValue(null);
    setSelectCountryValue(null);
    getPdoIDsByPdoName(value);
  };
  const onSearchCatChange = (value: string) => {
    history.replaceState({}, "", `/?cat=${encodeURI(value.toString())}`);
    setFromSearch(true);
    setActivePDO(null);
    setSelectValue(null);
    setSelectMunicValue(null);
    setSelectCatValue(value);
    setSelectVarValue(null);
    setSelectCountryValue(null);
    getPdoIDsByFilter(value, "category");
  };
  const onSearchVarietyChange = (value: string) => {
    history.replaceState({}, "", `/?variety=${encodeURI(value.toString())}`);
    setFromSearch(true);
    setActivePDO(null);
    setSelectValue(null);
    setSelectMunicValue(null);
    setSelectCatValue(null);
    setSelectVarValue(value);
    setSelectCountryValue(null);
    getPdoIDsByFilter(value, "varietiesOiv");
  };
  const onSelectCountryNameChange = (value: string) => {
    history.replaceState({}, "", `/?country=${encodeURI(value.toString())}`);
    setFromSearch(true);
    setActivePDO(null);
    setSelectValue(null);
    setSelectMunicValue(null);
    setSelectCatValue(null);
    setSelectVarValue(null);
    setSelectCountryValue(value);
    getPdoIDsByFilter(value, "country");
  };
  const onSelectMunicChange = (value: string) => {
    history.replaceState({}, "", `/?munic=${encodeURI(value.toString())}`);
    setFromSearch(true);
    setActivePDO(null);
    setSelectValue(null);
    setSelectMunicValue(value);
    setSelectCatValue(null);
    setSelectVarValue(null);
    setSelectCountryValue(null);
    getPdoIDsByFilter(value, "munic");
  };

  const onSearch = (value: string) => {
    //console.log("search:", value);
  };

  // unique PDONames for select
  const uniquePdonames = [...new Set(data.map((item) => item.pdoname))];
  let selectPdonames = uniquePdonames.sort().map((pdoName) => {
    let object = {
      label: pdoName,
      value: pdoName,
    };
    return object;
  });

  // unique varieties for select
  const varieties = data.map((item) => item?.varietiesOiv?.split("/"));
  let uniqueVarieties = [...new Set(varieties.flat())];
  let selectVarieties = uniqueVarieties.sort().map((varietyName) => {
    let object = {
      label: varietyName,
      value: varietyName,
    };

    return object;
  });

  // unique categories for select
  const categories = data.map((item) => item.category.split("/"));
  let uniqueCategories = [...new Set(categories.flat())];
  let selectCategories = uniqueCategories.sort().map((categoryName) => {
    let object = {
      label: categoryName,
      value: categoryName,
    };
    return object;
  });

  // unique municipalities for select
  const munic = data.map((item) => item.munic.split("/"));
  let uniqueMunic = [...new Set(munic.flat())];
  let selectMunic = uniqueMunic.sort().map((municName) => {
    let object = {
      label: municName,
      value: municName,
    };
    return object;
  });

  // unique countries for select
  const country = data.map((item) => item.country);
  let uniqueCountry = [...new Set(country.flat())];

  // ordered by countryName ... does not return a defined object but the filtered countries, aka: {name: "bla", code: "bla"}
  let selectCountry = allCountries.filter((country) => {
    for (const cc of uniqueCountry) {
      if (cc === country.code) {
        return cc;
      }
    }
  });

  const onHover = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    //console.log("features", features);
    const hoveredFeature =
      features &&
      features.map((feature) => {
        // console.log("feature", feature)
        return feature?.properties?.PDOid ? feature?.properties?.PDOid : null;
        //return feature?.properties?.PDOid !== undefined;
      });

    // do not return null or undefined
    const feat = hoveredFeature && hoveredFeature.filter((f) => f != null);

    // get municipality name from
    const hoveredMunic = features && features[0]?.properties?.Name;

    // console.log("count", hoveredFeature.length);
    if (feat && feat.length) {
      setHoverInfo({
        count: feat.length,
        feature: feat,
        munic: hoveredMunic,
        x,
        y,
      });
    }
  }, []);

  const onOut = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
    setHoverInfo(undefined);
  }, []);

  const onClick = useCallback(async (event: mapboxgl.MapLayerMouseEvent) => {
    const { features } = event;
    const overlappingPDOs =
      features &&
      features.map((f) => {
        return f?.properties?.PDOid;
      });

    if (overlappingPDOs && overlappingPDOs?.length > 1) {
      /* destroy active PDO */
      setActivePDO(null);
      /* get list of overlapping PDOs */
      return getListData(overlappingPDOs);
    }
    /* click on non-overlapping single PDO */
    overlappingPDOs && openDetail(overlappingPDOs[0]);
  }, []);

  /* clear all filter and zoom to inital view */
  async function onClearFilter() {
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
    setActivePDO(null);
    setSelectValue(null);
    setSelectMunicValue(null);
    setSelectCatValue(null);
    setSelectVarValue(null);
    setPdos(null);
    history.replaceState({}, "", "/");
  }

  async function getListData(overlappingPDOs: any[] | undefined) {
    const PDOList = overlappingPDOs?.map((item: any) => {
      return data.filter((i: { pdoid: any }) => item === i.pdoid);
    });
    const flattenPDOS = PDOList?.flat();
    if (flattenPDOS) {
      setPdos(flattenPDOS);
    }
  }

  const onMapZoom = useCallback(() => {
    const zoom = mapRef.current && mapRef.current.getMap().getZoom();
    setZoomLevel(zoom);
  }, []);

  const toggleVineyards = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVineyardVisibility(!vineyardVisibility);
    mapRef.current &&
      mapRef.current
        .getMap()
        .setPaintProperty("vineyards", "fill-color", "#00d619")
        .setPaintProperty(
          "vineyards",
          "fill-opacity",
          vineyardVisibility === false ? 0.6 : 0,
        );
  };

  async function getPdoIDsByPdoName(pdoname: string) {
    const PDOList = data.filter((i) => pdoname === i.pdoname);

    if (!PDOList.length) {
      onClearFilter();
      return;
    }

    const showIDs = PDOList.map((item) => {
      return item.pdoid;
    });

    // open sidebar and show PDO details
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
    const filteredFeatures = allPDOPoints.features?.filter(
      (item: { properties: { PDOid: string } }) =>
        item?.properties?.PDOid === showIDs[0],
    );

    if (filteredFeatures) {
      // calculate the bounding box of the feature
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
  }

  // generic filter by munic/varietiesOiv/category
  async function getPdoIDsByFilter(term: string, filterBy: string) {
    const PDOList = data.filter((i) => {
      for (const [key, value] of Object.entries(i)) {
        if (key === filterBy && typeof value === "string") {
          return value.includes(term);
        }
      }
    });
    if (!PDOList.length) {
      onClearFilter();
      return;
    }

    const showIDs = PDOList.map((item) => {
      return item.pdoid;
    });

    if (showIDs.length === 1) {
      // open sidebar and show PDO details
      openDetail(showIDs[0]);
    }
    const flattenPDOS = PDOList?.flat();
    setPdos(flattenPDOS);

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

    /* push coordinates of filtered items to new array */
    const coordinateArr = new Array();
    allPDOPoints?.features?.some((i) => {
      showIDs.includes(i?.properties?.PDOid) &&
        coordinateArr.push(i.geometry.coordinates);
    });

    /* create geojson like object */
    const bounds = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [coordinateArr],
      },
    };

    if (coordinateArr.length > 0) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(bounds);

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
  }

  // show one single PDO on the map
  function showPDOonMap(id: string) {
    const filteredFeatures = allPDOPoints.features?.filter(
      (item: { properties: { PDOid: string } }) =>
        item?.properties?.PDOid === id,
    );

    if (!filteredFeatures.length) return;

    mapRef.current &&
      mapRef.current
        .getMap()
        .setFilter("pdo-area", ["match", ["get", "PDOid"], id, true, false]);

    // calculate the bounding box of the feature
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

  /* RETURN */

  return (
    <div className={styles.container}>
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
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/tiacop/clas8a92e003c15o2bpopdfqt"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[
          "pdo-area",
          "pdo-pins",
          "pdo-municipality",
        ]} /* defined in mapbox studio */
        onMouseMove={onHover}
        onMouseLeave={onOut}
        onClick={onClick}
        onZoom={onMapZoom}
        onLoad={() => setMapLoaded(true)}
      >
        <NavigationControl
          position="bottom-right"
          visualizePitch={true}
          showCompass={true}
        />
        <ScaleControl position="bottom-right" />
      </ReactMap>
      {/* tooltip like mouse over for the map */}
      {hoverInfo && (
        <div
          className="tooltip"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          {hoverInfo.count > 1 && (
            <div style={{ marginBottom: "6px" }}>
              {hoverInfo.count} overlapping PDOs
            </div>
          )}
          {hoverInfo.feature.map(
            (
              f:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined,
              index: any,
            ) => {
              const pdoName = getPDONameById(f);

              return (
                <span key={f + index}>
                  {pdoName} ({f})
                </span>
              );
            },
          )}
          {hoverInfo?.munic && (
            <span className={styles.municName}>
              Municipality <br />
              {hoverInfo.munic}
            </span>
          )}
        </div>
      )}
      {/* aka frontpage */}
      {!pdos && !activePDO && (
        <div className={styles.contentFrame}>
          <div className={styles.frontpageContent}>
            <h1>WINEMAP</h1>
            <p>
              The Winemap provides a comprehensive overview of the 1,174
              European wine regions which fall under the{" "}
              <strong>Protected Designation of Origin (PDO)</strong> label. It
              is an essential resource for anyone interested in wine or who
              works in the wine industry and can be used to increase knowledge
              as well as appreciation of regional wines and as an instrument for
              wine sector decision making. The map is based on a collection of
              legal information, including grape varieties, geospatial
              boundaries, and production details, and is the first
              representation of European PDO regions in one comprehensive
              resource.
            </p>

            <p className={styles.homeNavigation}>
              <Link href="/about">About the project</Link>
            </p>
            <p>
              <Link href="/about-pdo">What’s a PDO?</Link>
            </p>
            <p>
              <Link href="/about-data">About the data</Link>
            </p>
            <p>
              <Link href="/team">The Team</Link>
            </p>

            {/* <button onClick={() => setShowChart(!showChart)}>
              Did you know?
            </button> */}
          </div>
        </div>
      )}
      {showChart && (
        <div className={styles.chartContainer}>
          <div
            className={styles.close}
            onClick={() => setShowChart(!showChart)}
          >
            <svg width="800" height="800" viewBox="0 0 256 256">
              <path d="M202.829 197.172a4 4 0 1 1-5.658 5.656L128 133.658l-69.171 69.17a4 4 0 0 1-5.658-5.656L122.343 128 53.171 58.828a4 4 0 0 1 5.658-5.656L128 122.342l69.171-69.17a4 4 0 0 1 5.658 5.656L133.657 128Z" />
            </svg>
          </div>
          <Chart />
        </div>
      )}
      {/* list of PDOs */}
      {pdos && !activePDO && (
        <div className={styles.contentFrame}>
          {pdos.length > 1 && (
            <h3 className={styles.amountOfItems}>
              {pdos.length} {!fromSearch && "overlapping"} PDOs found
            </h3>
          )}
          {pdos.map((pdo) => (
            <div
              key={pdo?.pdoid}
              className={styles.PDOlistitem}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                openDetail(pdo?.pdoid)
              }
            >
              <h2>{pdo?.pdoname}</h2>
              {pdo?.registration && (
                <p>
                  <Image
                    src={registrationIcon}
                    alt="Registration Date"
                    width={35}
                    height={35}
                  />
                  <span className="bold">Registration:</span>{" "}
                  {pdo?.registration}
                </p>
              )}
              {pdo?.category && (
                <p>
                  <Image
                    src={categoryIcon}
                    alt="Category"
                    width={35}
                    height={35}
                  />
                  <span className="bold">Category:</span>{" "}
                  {pdo?.category.replaceAll("/", ", ")}
                </p>
              )}
              <span
                className={`${styles.arrow} ${styles.right} ${styles.alignRight}`}
              ></span>
            </div>
          ))}
        </div>
      )}
      {/* PDO detail */}
      {activePDO && (
        <div className={`${styles.contentFrame}`}>
          {pdos && (
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                setActivePDO(null)
              }
              className={styles.actionBar}
            >
              <span className={`${styles.arrow} ${styles.left}`}></span>
              back to list
            </div>
          )}
          <div
            className={`${styles.PDOdetail}${pdos ? ` ${styles.margin}` : ``} `}
          >
            <h2>{activePDO.pdoname}</h2>
            <div className={styles.buttonDiv}>
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  showPDOonMap(activePDO.pdoid)
                }
              >
                show on map
              </button>
              <button onClick={() => onClearFilter()}>reset</button>
            </div>
            {activePDO?.country && (
              <p>
                <Image src={countryIcon} alt="Country" width={35} height={35} />
                <span>Country:</span> {activePDO?.country}
              </p>
            )}
            {activePDO?.registration && (
              <p>
                <Image
                  src={registrationIcon}
                  alt="Registration Date"
                  width={35}
                  height={35}
                />
                <span className="bold">Registration:</span>{" "}
                {activePDO?.registration}
              </p>
            )}
            {activePDO?.category && (
              <Accordion
                title="Category:"
                content={activePDO?.category.replaceAll("/", ", ")}
                icon={categoryIcon}
              />
            )}
            <p>
              <Image src={pdoIcon} alt="PDO Id" width={35} height={35} />
              <span className="bold">PDO ID:</span> {activePDO?.pdoid}
            </p>
            {activePDO?.["varietiesOiv"] && (
              <Accordion
                title="Varieties OIV:"
                content={activePDO?.["varietiesOiv"].replaceAll("/", ", ")}
                icon={varietiesOIVIcon}
              />
            )}
            {activePDO?.["varieties"] && (
              <Accordion
                title="Varieties other:"
                content={activePDO?.["varieties"].replaceAll("/", ", ")}
                icon={varietiesOtherIcon}
              />
            )}
            {activePDO?.["max-yield-hl"] && (
              <p>
                <Image
                  src={yieldHlIcon}
                  alt="Maximum Yield (hl)"
                  width={35}
                  height={35}
                />
                <span className="bold">Maximum Yield (hl):</span>{" "}
                {activePDO?.["max-yield-hl"]} hl
              </p>
            )}
            {activePDO?.["max-yield-kg"] && (
              <p>
                <Image
                  src={yieldKgIcon}
                  alt="Maximum Yield (kg)"
                  width={35}
                  height={35}
                />
                <span className="bold">Maximum Yield (kg):</span>{" "}
                {activePDO?.["max-yield-kg"]} kg
              </p>
            )}
            {activePDO?.["min-planting-density"] && (
              <p>
                <Image
                  src={densityIcon}
                  alt="Minimum Planting Density"
                  width={35}
                  height={35}
                />
                <span className="bold">Minimum Planting Density:</span>{" "}
                {activePDO?.["min-planting-density"]} vine stocks/ha
              </p>
            )}
            {activePDO?.["irrigation"] && (
              <p>
                <Image
                  src={irrigationIcon}
                  alt="Irrigation"
                  width={35}
                  height={35}
                />
                <span className="bold">Irrigation:</span>{" "}
                {activePDO?.["irrigation"]}{" "}
              </p>
            )}
            {activePDO?.["amendment"] && (
              <p>
                <Image
                  src={amendmentIcon}
                  alt="Amendment"
                  width={35}
                  height={35}
                />
                <span className="bold">Amendment:</span>{" "}
                {activePDO?.["amendment"]}{" "}
              </p>
            )}
            {activePDO?.["munic"] && (
              <Accordion
                title="Municipalities:"
                content={activePDO?.["munic"].replaceAll("/", ", ")}
                icon={municIcon}
              />
            )}
            {activePDO?.["pdoinfo"] && (
              <p>
                <Image src={infoIcon} alt="Info" width={35} height={35} />

                <a
                  href={activePDO?.["pdoinfo"]}
                  target="_blank"
                  rel="noreferrer"
                >
                  More info on{" "}
                  <span style={{ textDecoration: "underline" }}>eAmbrosia</span>
                </a>
              </p>
            )}
          </div>
        </div>
      )}
      <div className={styles.filterBar}>
        <header className={styles.header}>
          <Link
            href="/"
            className={styles.frontpageLink}
            onClick={() => onClearFilter()}
          >
            WINEMAP by
          </Link>
          <a href="https://www.eurac.edu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="178.793"
              height="22"
              viewBox="0 0 178.793 19.536"
            >
              <path
                d="M165.199 19.215c.679-.027 1.709-.081 2.768-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171V8.303a6.188 6.188 0 0 1 3.147-1.058c2.307 0 2.849 1.275 2.849 3.337v5.562c0 1.9-.271 2.062-.9 2.171l-.9.135v.765c.678-.027 1.709-.081 2.767-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171v-5.866c0-2.74-.923-4.639-4.124-4.639a6.3 6.3 0 0 0-3.88 1.763V0a20.047 20.047 0 0 1-3.771 1.465v.65c1.763.352 1.763.678 1.763 2.062v11.967c0 1.9-.271 2.062-.9 2.171l-.9.135Zm-6.539.326a4.838 4.838 0 0 0 4.016-1.737l-.136-.705a5.725 5.725 0 0 1-3.147.841c-2.822 0-4.8-1.927-4.8-5.4 0-3.608 1.927-5.725 4.232-5.725 1.927 0 2.551 1.031 2.632 2.577h1.031c0-.9.027-2.2.109-3.093a10.729 10.729 0 0 0-3.608-.651c-3.555 0-6.513 3.12-6.513 7.163 0 4.124 2.306 6.729 6.186 6.729m-16.037-.325c.678-.027 1.709-.109 2.767-.109 1.031 0 2.5.082 3.175.109v-.76l-1.247-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.73 4.73 0 0 1 2.879-1.031 4.092 4.092 0 0 1 1.493.244l.218-1.872a4.463 4.463 0 0 0-1.167-.163 5.094 5.094 0 0 0-3.419 1.9V5.508a26.914 26.914 0 0 1-3.771 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-9.415-1.248a2.045 2.045 0 0 1-2.225-2.152c0-1.655 1.248-2.659 4.042-2.659.3 0 .761 0 1.059.028-.027.569-.081 2.6-.081 3.581a3.744 3.744 0 0 1-2.795 1.194m-.732 1.574a4.534 4.534 0 0 0 3.608-1.845h.055a1.777 1.777 0 0 0 1.98 1.845 4.134 4.134 0 0 0 2.063-.489v-.76c-1.656 0-2.144-.379-2.144-1.709 0-2.442.109-4.5.109-6.62 0-2.632-1.52-4.314-4.586-4.314a5.427 5.427 0 0 0-3.717 1.546l.136.787a6.281 6.281 0 0 1 3.094-.732c2.116 0 3.039 1.112 3.039 3.2v1.578c-.407-.027-1.086-.027-1.466-.027-3.473 0-5.725 1.628-5.725 4.178a3.316 3.316 0 0 0 3.555 3.365m-14.19-8.846c.217-1.845 1.356-3.852 3.636-3.852a2.977 2.977 0 0 1 2.846 3.256c0 .379-.162.6-.624.6Zm3.88 8.846c1.953 0 3.663-.842 4.178-1.683l-.081-.678a7.9 7.9 0 0 1-3.581.76c-3.039 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.816 5.816 0 0 0 .055-.977 4.832 4.832 0 0 0-4.993-5.155c-3.527 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.133 6.729m-13.648 0c2.713 0 4.694-1.818 4.694-3.989 0-4.857-6.838-3.554-6.838-6.7 0-1.383 1.059-2.089 2.687-2.089 1.818 0 2.632.9 2.767 2.632h1a22.693 22.693 0 0 1-.054-3.039 10.491 10.491 0 0 0-3.609-.705c-2.632 0-4.585 1.411-4.585 3.581 0 4.911 6.81 3.256 6.81 6.648 0 1.519-1.194 2.469-2.9 2.469-2.307 0-2.876-1.058-3.12-2.985h-1a31.179 31.179 0 0 1 .074 3.555 12.844 12.844 0 0 0 4.07.624m-15.38-8.849c.217-1.845 1.357-3.852 3.636-3.852a2.978 2.978 0 0 1 2.845 3.256c0 .379-.163.6-.624.6Zm3.88 8.846c1.954 0 3.663-.842 4.179-1.683l-.082-.678a7.9 7.9 0 0 1-3.581.76c-3.038 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.931 5.931 0 0 0 .054-.977 4.832 4.832 0 0 0-4.992-5.155c-3.528 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.132 6.729m-15.986-.322c.678-.027 1.709-.109 2.767-.109 1.032 0 2.5.082 3.175.109v-.76l-1.248-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.728 4.728 0 0 1 2.881-1.031 4.091 4.091 0 0 1 1.492.244l.218-1.872a4.458 4.458 0 0 0-1.167-.163 5.091 5.091 0 0 0-3.419 1.9V5.508a26.95 26.95 0 0 1-3.772 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-13.296.321a10.166 10.166 0 0 0 3.687-.663v-4.032a5.963 5.963 0 0 1-3.283.778c-1.7 0-2.707-1.152-2.707-3.283 0-2.592 1.094-3.629 2.679-3.629a8.352 8.352 0 0 1 3.082.6V5.366a12.034 12.034 0 0 0-3.573-.518c-5.011 0-7.6 3.2-7.6 7.488 0 4.464 2.362 7.2 7.719 7.2M50.66 16.048c-.806 0-1.325-.259-1.325-1.066 0-.95.518-1.325 1.959-1.325a5.282 5.282 0 0 1 .633.029V15.5a1.742 1.742 0 0 1-1.267.547m-1.76 3.489a4.211 4.211 0 0 0 3.718-1.788 3.347 3.347 0 0 0 3.37 1.786 4.056 4.056 0 0 0 2.391-.576v-3.2a2.9 2.9 0 0 1-.462.058c-.576 0-.806-.346-.806-1.009v-4.43c0-3.772-1.872-5.529-6.48-5.529a14.844 14.844 0 0 0-4.751.72v3.83a14.846 14.846 0 0 1 3.859-.6c1.556 0 2.189.547 2.189 1.728v.461c-.2 0-.433-.029-.921-.029-3.888 0-6.711 1.095-6.711 4.349 0 2.966 2.045 4.233 4.609 4.233m-15.525-.234h5.184v-9.274a7.4 7.4 0 0 1 3.11-.72 6.513 6.513 0 0 1 1.584.173V4.992a3.481 3.481 0 0 0-1.152-.144 4.839 4.839 0 0 0-3.657 1.728V5.078H33.38Zm-12.3.231a6.047 6.047 0 0 0 3.888-1.354v1.123h5.04V5.078h-5.182v9.706a3.025 3.025 0 0 1-1.728.748c-1.037 0-1.555-.461-1.555-1.757V5.078H16.33v9.476c0 2.851 1.239 4.982 4.752 4.982M5.414 10.548c.058-1.009.49-2.045 1.728-2.045 1.095 0 1.555.95 1.555 1.872v.173Zm2.42 8.986a13.961 13.961 0 0 0 4.838-.806v-3.829a11.914 11.914 0 0 1-4.406.864c-2.3 0-2.852-.864-2.938-2.419h8.324a13.521 13.521 0 0 0 .086-1.527c0-3.657-1.584-6.969-6.624-6.969C2.275 4.848 0 8.39 0 12.163c0 4.32 2.16 7.373 7.834 7.373"
                fill="#fff"
              ></path>
            </svg>
          </a>
        </header>

        <div className={styles.filter}>
          <Select
            showSearch
            placeholder="PDO"
            // style={{ width: 250 }}
            // disabled={true}
            // allowClear={true}
            dropdownMatchSelectWidth={290}
            optionFilterProp="children"
            onChange={onSelectPdoNameChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{ label: "label", value: "value" }}
            options={selectPdonames}
            value={selectValue}
          />
          <Select
            showSearch
            placeholder="country"
            dropdownMatchSelectWidth={290}
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
            dropdownMatchSelectWidth={290}
            optionFilterProp="children"
            onChange={onSelectMunicChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{ label: "label", value: "value" }}
            options={selectMunic}
            value={selectMunicValue}
          />
          <Select
            showSearch
            placeholder="category"
            dropdownMatchSelectWidth={290}
            optionFilterProp="children"
            onChange={onSearchCatChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{ label: "label", value: "value" }}
            options={selectCategories}
            value={selectCatValue}
          />
          <Select
            showSearch
            placeholder="variety"
            dropdownMatchSelectWidth={290}
            optionFilterProp="children"
            onChange={onSearchVarietyChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{ label: "label", value: "value" }}
            options={selectVarieties}
            value={selectVarValue}
          />
          <button onClick={() => onClearFilter()}>reset</button>
        </div>
        {zoomLevel && zoomLevel > 7 && (
          <div className={styles.toggleVineyards}>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                toggleVineyards(e)
              }
            >
              {vineyardVisibility ? "hide" : "show"} vineyards
            </button>
          </div>
        )}
      </div>
      <div className={styles.imprintBoxMap}>
        <span>
          © {year} Eurac Research{" "}
          <Link href="/imprint-privacy">Imprint / Privacy</Link>
        </span>
      </div>
    </div>
  );
}
