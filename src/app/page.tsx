"use client";

import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  NavigationControl,
  Map as ReactMap,
  ScaleControl,
  type MapRef,
} from "react-map-gl";

//import { twMerge } from "tailwind-merge";

import Accordion from "@/app/components/accordion";
import styles from "@/styles/Home.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import Link from "next/link";
import bbox from "@turf/bbox";
import { Radio, RadioChangeEvent, Select } from "antd";
import type { Expression } from "mapbox-gl";
import { isMobile } from "react-device-detect";

import data from "@/app/data/PDO_EU_id.json";
import allCountries from "@/app/data/countryCodesFromDataHub.io.json";
import allPDOPoints from "@/app/data/pdo-points.json";
import vulnerability from "@/app/data/vulnerability.json";
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
//import Chart from "./components/charts/racechart";

import AdaptiveChart from "./components/adaptiveChart";
import Pie from "./components/pie";
import Smallheader from "./components/smallheader";
import VulnerabilityDot from "./components/vulnerabilityDot";

//import VulnerabilityLegend from "./components/vulnerabilityLegend";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface VulnerabilityType {
  PDOid: string;
  financial: number;
  natural: number;
  physical: number;
  social: number;
  human: number;
  adaptiveCap: number;
  Exposure: number;
  Sensitivity: number;
  Vulnerability: string;
  AdaptiveTxt?: string;
  ExposureTxt?: string;
  SensitivityTxt?: string;
}
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
  vulneral?: VulnerabilityType | null;
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
export default function Page() {
  const searchParams = useSearchParams();

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
  //const [showChart, setShowChart] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number | null>(null);
  const [vineyardVisibility, setVineyardVisibility] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [vulnerabilityVisibility, setVulnerabilityVisibility] =
    useState<boolean>(false);

  // const [selectVulneralValue, setSelectVulneralValue] = useState<string | null>(
  //   null,
  // );
  const year = new Date().getFullYear();
  /* fix fitBounds for mobile device */
  const paddingResponsive = useMemo(() => {
    return isMobile
      ? { top: 100, bottom: 100, left: 0, right: 0 }
      : { top: 100, bottom: 25, left: 400, right: 5 };
  }, []);

  /* vulnerability magic */
  // done this way or via a <source> and a custom <layer>

  const matchExpression: Expression = ["match", ["get", "PDOid"]];

  // old colors:
  // Low: #4FF47C
  // Moderate: #F5DA5C
  // High: #FF6D31
  // Very high: #F51C1C

  //new colors:
  // Low: #97BE6C
  // Moderate: #E8C360
  // High: #DD7C75
  // Very high: #DE1355

  if (vulnerabilityVisibility && vulnerability.length > 1) {
    for (const row of vulnerability) {
      let color = "#fff";
      if (row["Vulnerability"] === "low") {
        color = "#97BE6C";
      } else if (row["Vulnerability"] === "moderate") {
        color = "#E8C360";
      } else if (row["Vulnerability"] === "high (low-mod Exposure)") {
        color = "#DD7C75";
      } else if (row["Vulnerability"] === "high (low-mod Sensitivity)") {
        color = "#DD7C75";
      } else if (row["Vulnerability"] === "high (mod-high Adapt. capacity)") {
        color = "#DD7C75";
      } else if (row["Vulnerability"] === "very high") {
        color = "#DE1355";
      }
      matchExpression.push(row["PDOid"], color);
    }

    // show only PDOs that are in the vulnerability.json
    const showOnlyVulneralIDs = vulnerability.map((item) => {
      return item.PDOid;
    });

    //console.log("pdos", pdos);

    if (!fromSearch) {
      mapRef.current &&
        mapRef.current
          .getMap()
          .setFilter("pdo-pins", [
            "match",
            ["get", "PDOid"],
            showOnlyVulneralIDs,
            true,
            false,
          ]);

      mapRef.current &&
        mapRef.current
          .getMap()
          .setFilter("pdo-area", [
            "match",
            ["get", "PDOid"],
            showOnlyVulneralIDs,
            true,
            false,
          ]);
    }
  }
  // matchExpression.push("blue");
  matchExpression.push("rgba(0,0,0,0)"); // all other PDOs that are not in the vulnerability.json - should not be visible because of the filter

  const circleRadiusValues = {
    type: "exponential",
    base: 1.75,
    stops: [
      [0, 2], // 0 = zoom level, 2 = circle radius
      [6, 8],
      [8, 26],
    ],
  };
  const circleOpacityValues = {
    type: "exponential",
    stops: [
      [0, 1], // 0 = zoom level, 1 opacity
      [12, 0.5],
      [16, 0.8],
    ],
  };

  if (vulnerabilityVisibility) {
    mapRef.current &&
      mapRef.current
        .getMap()
        .setPaintProperty("pdo-area", "fill-color", matchExpression)
        .setPaintProperty("pdo-pins", "circle-color", matchExpression)
        .setPaintProperty("pdo-pins", "circle-radius", circleRadiusValues)
        .setPaintProperty("pdo-pins", "circle-opacity", circleOpacityValues);
    // .setPaintProperty("pdo-pins", "circle-opacity", 0);
    // .setPaintProperty("vulnerability", "circle-radius", "200");
    // .setLayerZoomRange("pdo-pins", 0, 22)
    // .setPaintProperty("pdo-pins", "circle-color", "green");
  } else {
    mapRef.current &&
      mapRef.current
        .getMap()
        .setPaintProperty("pdo-area", "fill-color", "hsl(338, 96%, 38%)")
        .setPaintProperty("pdo-pins", "circle-color", "hsl(338, 96%, 38%)")
        .setPaintProperty("pdo-pins", "circle-radius", 3.63)
        .setPaintProperty("pdo-pins", "circle-opacity", 1);
  }

  const openDetail = useCallback(
    async (id: string) => {
      let PDO: JSONObject[] = data.filter(
        (i: { pdoid: any }) => id === i.pdoid,
      );
      if (!PDO.length) return; // no PDO found - clicked on the ocean

      if (vulnerabilityVisibility) {
        const vul = vulnerability.filter((v: any) => id === v.PDOid);

        if (!vul[0]) {
          setActivePDO(PDO[0]);
          return;
        }

        PDO[0].vulneral = vul[0]; // Add 'vulneral' property

        // Adaptive Capacity 0-38 low, 38-55 moderate, 55-100 high
        if (PDO[0].vulneral.adaptiveCap * 100 < 38) {
          PDO[0].vulneral.AdaptiveTxt = "low";
        } else if (PDO[0].vulneral.adaptiveCap * 100 < 55) {
          PDO[0].vulneral.AdaptiveTxt = "moderate";
        } else {
          PDO[0].vulneral.AdaptiveTxt = "high";
        }
        // Sensitivity 0-55 low, 55-72 moderate, 72-100 high
        if (PDO[0].vulneral.Sensitivity * 100 < 55) {
          PDO[0].vulneral.SensitivityTxt = "low";
        } else if (PDO[0].vulneral.Sensitivity * 100 < 72) {
          PDO[0].vulneral.SensitivityTxt = "moderate";
        } else {
          PDO[0].vulneral.SensitivityTxt = "high";
        }
        // Exposure 0-62 low, 62-75 moderate, 75-100 high
        if (PDO[0].vulneral.Exposure * 100 < 62) {
          PDO[0].vulneral.ExposureTxt = "low";
        } else if (PDO[0].vulneral.Exposure * 100 < 75) {
          PDO[0].vulneral.ExposureTxt = "moderate";
        } else {
          PDO[0].vulneral.ExposureTxt = "high";
        }
      }

      history.replaceState({}, "", `/?pdo=${encodeURI(id)}`);
      setActivePDO(PDO[0]);
    },
    [vulnerabilityVisibility],
  );

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
    let PDO: JSONObject[] = data.filter((i: { pdoid: any }) => id === i.pdoid);
    if (vulnerabilityVisibility) {
      const vul = vulnerability.filter((v: any) => id === v.PDOid);
      PDO[0].vulneral = vul[0]; // Add 'vulneral' property
    }

    return PDO[0].pdoname;
  }

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
        // console.log("feature", feature);

        return feature?.properties?.PDOid ? feature?.properties?.PDOid : null;
        //return feature?.properties?.PDOid !== undefined;
      });

    // do not return null or undefined
    const feat = hoveredFeature && hoveredFeature.filter((f) => f != null);

    // get municipality name from
    const hoveredMunic = features && features[0]?.properties?.Name;

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

  //console.log("hoverInfo: ", hoverInfo);

  /* clear all filter and zoom to inital view */
  const onClearFilter = useCallback(async () => {
    setFromSearch(false);
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
    history.replaceState({}, "", "/");
  }, [mapRef]);

  const getListData = useCallback(
    async (overlappingPDOs: any[] | undefined) => {
      const PDOList = overlappingPDOs?.map((item: any) => {
        let myData = data.filter((i: { pdoid: any }) => item === i.pdoid);

        if (vulnerabilityVisibility) {
          myData.map((i: any) => {
            const vul = vulnerability.filter((v: any) => i.pdoid === v.PDOid);
            i.vulneral = vul[0];
          });
        }
        return myData;
      });

      //console.log("PDOList", PDOList);

      const flattenPDOS = PDOList?.flat();
      if (flattenPDOS) {
        setPdos(flattenPDOS);
      }
    },
    [vulnerabilityVisibility, setPdos],
  );

  const onOut = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
    setHoverInfo(undefined);
  }, []);

  const onClick = useCallback(
    async (event: mapboxgl.MapLayerMouseEvent) => {
      const { features } = event;
      const overlappingPDOs =
        features &&
        features
          .map((f) => {
            return f?.properties?.PDOid;
          })
          .filter((id) => id !== undefined);
      if (overlappingPDOs && overlappingPDOs?.length > 1) {
        /* destroy active PDO */
        setActivePDO(null);
        /* get list of overlapping PDOs */
        return getListData(overlappingPDOs);
      }
      /* click on non-overlapping single PDO */
      overlappingPDOs && openDetail(overlappingPDOs[0]);
    },
    [getListData, openDetail],
  );
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

  const getPDOsByVulnerability = useCallback(
    async (value: string) => {
      const PDOList = data?.map((item: any) => {
        let myData = vulnerability.filter((v: any) => item.pdoid === v.PDOid);
        item.vulneral = myData[0];

        // console.log("item", item);
        // console.log("mydata: ", myData);

        // reset the vulnerability filter
        if (value === "all") {
          if (item.vulneral) {
            return item;
          }
          return null;
        }
        if (myData[0]?.Vulnerability?.startsWith(value)) {
          return item;
        }
      });
      // console.log("PDOList", PDOList);

      // remove undefined values
      PDOList.filter((item) => item);

      const flattenPDOS = PDOList.filter((item) => item)?.flat();
      if (flattenPDOS) {
        setPdos(flattenPDOS);
      }

      const showIDs = flattenPDOS.map((item) => {
        return item.pdoid;
      });

      mapRef.current &&
        mapRef.current
          .getMap()
          .setFilter("pdo-area", null)
          .setFilter("pdo-pins", null);

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
      // console.log("flattenPDOS", flattenPDOS);
    },
    [setPdos, mapRef],
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
    },
    [onClearFilter, openDetail, mapRef, paddingResponsive],
  );

  // generic filter by munic/varietiesOiv/category
  const getPdoIDsByFilter = useCallback(
    async (term: string, filterBy: string) => {
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

      // const showIDs = PDOList.map((item) => {
      //   if (vulnerabilityVisibility) {
      //   }
      //   return item.pdoid;
      // });

      const showIDs = PDOList.map((item) => {
        if (vulnerabilityVisibility) {
          const vul = vulnerability.filter((v) => item.pdoid === v.PDOid);
          return vul.length > 0 ? vul[0].PDOid : null;
        }
        return item.pdoid;
      }).filter((id) => id !== null) as string[];

      if (showIDs.length === 1) {
        // open sidebar and show PDO details
        openDetail(showIDs[0]);
      }
      let flattenPDOS = PDOList?.flat();

      // if (vulnerabilityVisibility) {
      //   flattenPDOS.map((i: any) => {
      //     const vul = vulnerability.filter((v: any) => i.pdoid === v.PDOid);
      //     i.vulneral = vul[0];
      //   });
      // }

      setPdos(flattenPDOS);

      mapRef.current &&
        mapRef.current
          .getMap()
          .setFilter("pdo-area", null)
          .setFilter("pdo-pins", null);

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
    },
    [
      onClearFilter,
      openDetail,
      setPdos,
      mapRef,
      paddingResponsive,
      vulnerabilityVisibility,
    ],
  );

  // show one single PDO on the map
  const showPDOonMap = useCallback(
    (id: string) => {
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
    },
    [mapRef, paddingResponsive],
  );

  const onSelectPdoNameChange = useCallback(
    (value: string) => {
      history.replaceState({}, "", `/?pdoname=${encodeURI(value.toString())}`);
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

  const onSearchCatChange = useCallback(
    (value: string) => {
      history.replaceState({}, "", `/?cat=${encodeURI(value.toString())}`);
      setFromSearch(true);
      setActivePDO(null);
      setSelectValue(null);
      setSelectMunicValue(null);
      setSelectCatValue(value);
      setSelectVarValue(null);

      setSelectCountryValue(null);
      getPdoIDsByFilter(value, "category");
    },
    [getPdoIDsByFilter],
  );

  const onSearchVarietyChange = useCallback(
    (value: string) => {
      history.replaceState({}, "", `/?variety=${encodeURI(value.toString())}`);
      setFromSearch(true);
      setActivePDO(null);
      setSelectValue(null);
      setSelectMunicValue(null);
      setSelectCatValue(null);
      setSelectVarValue(value);

      setSelectCountryValue(null);
      getPdoIDsByFilter(value, "varietiesOiv");
    },
    [getPdoIDsByFilter],
  );

  const onSelectCountryNameChange = useCallback(
    (value: string) => {
      history.replaceState({}, "", `/?country=${encodeURI(value.toString())}`);
      setFromSearch(true);
      setActivePDO(null);
      setSelectValue(null);
      setSelectMunicValue(null);
      setSelectCatValue(null);
      setSelectVarValue(null);

      setSelectCountryValue(value);
      getPdoIDsByFilter(value, "country");
    },
    [getPdoIDsByFilter],
  );

  const onSelectMunicChange = useCallback(
    (value: string) => {
      history.replaceState({}, "", `/?munic=${encodeURI(value.toString())}`);
      setFromSearch(true);
      setActivePDO(null);
      setSelectValue(null);
      setSelectMunicValue(value);
      setSelectCatValue(null);
      setSelectVarValue(null);
      setSelectCountryValue(null);

      getPdoIDsByFilter(value, "munic");
    },
    [getPdoIDsByFilter],
  );

  const onVulneralFilter = useCallback(
    (e: RadioChangeEvent) => {
      history.replaceState(
        {},
        "",
        `/?vulneral=${encodeURI(e.target.value.toString())}`,
      );
      setFromSearch(true);
      setActivePDO(null);
      setSelectValue(null);
      setSelectMunicValue(null);
      setSelectCatValue(null);
      setSelectVarValue(null);
      setSelectCountryValue(null);

      getPDOsByVulnerability(e.target.value);
    },
    [getPDOsByVulnerability],
  );

  const onSearch = (value: string) => {
    //console.log("search:", value);
  };

  // navigate the page by passing the url params
  useEffect(() => {
    if (!mapLoaded) {
      return;
    }
    if (searchParams?.get("vulnerability") === "true") {
      setVulnerabilityVisibility(true);
    }
    if (searchParams?.get("vulnerability") === "false") {
      setVulnerabilityVisibility(false);
      onClearFilter();
    }
    if (searchParams?.get("country")) {
      onSelectCountryNameChange(
        decodeURI(searchParams?.get("country")?.toString() ?? ""),
      );
    } else if (searchParams?.get("pdoname")) {
      onSelectPdoNameChange(
        decodeURI(searchParams?.get("pdoname")!.toString() ?? ""),
      );
    } else if (searchParams?.get("cat")) {
      onSearchCatChange(decodeURI(searchParams?.get("cat")!.toString()) ?? "");
    } else if (searchParams?.get("variety")) {
      onSearchVarietyChange(
        decodeURI(searchParams?.get("variety")!.toString() ?? ""),
      );
    } else if (searchParams?.get("munic")) {
      onSelectMunicChange(
        decodeURI(searchParams?.get("munic")!.toString()) ?? "",
      );
    } else if (searchParams?.get("pdo")) {
      /* detail view */
      openDetail(decodeURI(searchParams?.get("pdo")!) ?? "");
      showPDOonMap(decodeURI(searchParams?.get("pdo")!) ?? "");
    }
  }, [
    mapLoaded,
    searchParams,
    onSelectCountryNameChange,
    openDetail,
    showPDOonMap,
    onSearchCatChange,
    onSearchVarietyChange,
    onSelectMunicChange,
    onSelectPdoNameChange,
    onClearFilter,
  ]);

  /* RETURN */

  return (
    <div className={styles.container}>
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
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/tiacop/clas8a92e003c15o2bpopdfqt"
          // mapStyle="mapbox://styles/tiacop/ckxsylx3u0qoj14muybrpmlpy" // ADO style
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[
            "pdo-area",
            "pdo-pins",
            "pdo-municipality",
            "vulnerabilityLayer",
          ]} /* defined in mapbox studio */
          onMouseMove={onHover}
          onMouseLeave={onOut}
          onClick={onClick}
          onZoom={onMapZoom}
          onLoad={() => setMapLoaded(true)}
        >
          {/* {vulnerabilityVisibility && (
          <Source
            id="vulnerability"
            type="geojson"
            data={allPDOPoints as FeatureCollection<Geo, GeoJsonProperties>}
            generateId={true}
          >
            <Layer {...vulnerabilityLayer} />
          </Source>
        )} */}

          <NavigationControl
            position="bottom-right"
            visualizePitch={true}
            showCompass={true}
          />
          <ScaleControl position="bottom-right" />
        </ReactMap>
      </Suspense>
      {/* tooltip like mouse over for the map */}
      {hoverInfo && (
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      )}
      {/* aka frontpage */}
      {!pdos && !activePDO && (
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.contentFrame}>
            <div className={styles.frontpageContent}>
              <header className="mb-8">
                <h1 className="text-[32px] font-bold mt-4 mb-0 block">
                  <Link
                    href="/"
                    onClick={() => onClearFilter()}
                    className="transition-all hover:[text-shadow:_0_0_10px_rgb(255_255_255)]"
                  >
                    WINEMAP{" "}
                    {vulnerabilityVisibility && (
                      <span className="font-extralight italic">CLIMATE</span>
                    )}
                  </Link>
                </h1>
                <a
                  href="https://www.eurac.edu"
                  title="Go to Eurac Research Website"
                  className="pb-[3px] flex gap-2 items-center"
                >
                  by
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="178.793"
                    height="22"
                    viewBox="0 0 178.793 19.536"
                    className="h-4 w-auto"
                  >
                    <path
                      d="M165.199 19.215c.679-.027 1.709-.081 2.768-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171V8.303a6.188 6.188 0 0 1 3.147-1.058c2.307 0 2.849 1.275 2.849 3.337v5.562c0 1.9-.271 2.062-.9 2.171l-.9.135v.765c.678-.027 1.709-.081 2.767-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171v-5.866c0-2.74-.923-4.639-4.124-4.639a6.3 6.3 0 0 0-3.88 1.763V0a20.047 20.047 0 0 1-3.771 1.465v.65c1.763.352 1.763.678 1.763 2.062v11.967c0 1.9-.271 2.062-.9 2.171l-.9.135Zm-6.539.326a4.838 4.838 0 0 0 4.016-1.737l-.136-.705a5.725 5.725 0 0 1-3.147.841c-2.822 0-4.8-1.927-4.8-5.4 0-3.608 1.927-5.725 4.232-5.725 1.927 0 2.551 1.031 2.632 2.577h1.031c0-.9.027-2.2.109-3.093a10.729 10.729 0 0 0-3.608-.651c-3.555 0-6.513 3.12-6.513 7.163 0 4.124 2.306 6.729 6.186 6.729m-16.037-.325c.678-.027 1.709-.109 2.767-.109 1.031 0 2.5.082 3.175.109v-.76l-1.247-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.73 4.73 0 0 1 2.879-1.031 4.092 4.092 0 0 1 1.493.244l.218-1.872a4.463 4.463 0 0 0-1.167-.163 5.094 5.094 0 0 0-3.419 1.9V5.508a26.914 26.914 0 0 1-3.771 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-9.415-1.248a2.045 2.045 0 0 1-2.225-2.152c0-1.655 1.248-2.659 4.042-2.659.3 0 .761 0 1.059.028-.027.569-.081 2.6-.081 3.581a3.744 3.744 0 0 1-2.795 1.194m-.732 1.574a4.534 4.534 0 0 0 3.608-1.845h.055a1.777 1.777 0 0 0 1.98 1.845 4.134 4.134 0 0 0 2.063-.489v-.76c-1.656 0-2.144-.379-2.144-1.709 0-2.442.109-4.5.109-6.62 0-2.632-1.52-4.314-4.586-4.314a5.427 5.427 0 0 0-3.717 1.546l.136.787a6.281 6.281 0 0 1 3.094-.732c2.116 0 3.039 1.112 3.039 3.2v1.578c-.407-.027-1.086-.027-1.466-.027-3.473 0-5.725 1.628-5.725 4.178a3.316 3.316 0 0 0 3.555 3.365m-14.19-8.846c.217-1.845 1.356-3.852 3.636-3.852a2.977 2.977 0 0 1 2.846 3.256c0 .379-.162.6-.624.6Zm3.88 8.846c1.953 0 3.663-.842 4.178-1.683l-.081-.678a7.9 7.9 0 0 1-3.581.76c-3.039 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.816 5.816 0 0 0 .055-.977 4.832 4.832 0 0 0-4.993-5.155c-3.527 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.133 6.729m-13.648 0c2.713 0 4.694-1.818 4.694-3.989 0-4.857-6.838-3.554-6.838-6.7 0-1.383 1.059-2.089 2.687-2.089 1.818 0 2.632.9 2.767 2.632h1a22.693 22.693 0 0 1-.054-3.039 10.491 10.491 0 0 0-3.609-.705c-2.632 0-4.585 1.411-4.585 3.581 0 4.911 6.81 3.256 6.81 6.648 0 1.519-1.194 2.469-2.9 2.469-2.307 0-2.876-1.058-3.12-2.985h-1a31.179 31.179 0 0 1 .074 3.555 12.844 12.844 0 0 0 4.07.624m-15.38-8.849c.217-1.845 1.357-3.852 3.636-3.852a2.978 2.978 0 0 1 2.845 3.256c0 .379-.163.6-.624.6Zm3.88 8.846c1.954 0 3.663-.842 4.179-1.683l-.082-.678a7.9 7.9 0 0 1-3.581.76c-3.038 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.931 5.931 0 0 0 .054-.977 4.832 4.832 0 0 0-4.992-5.155c-3.528 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.132 6.729m-15.986-.322c.678-.027 1.709-.109 2.767-.109 1.032 0 2.5.082 3.175.109v-.76l-1.248-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.728 4.728 0 0 1 2.881-1.031 4.091 4.091 0 0 1 1.492.244l.218-1.872a4.458 4.458 0 0 0-1.167-.163 5.091 5.091 0 0 0-3.419 1.9V5.508a26.95 26.95 0 0 1-3.772 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-13.296.321a10.166 10.166 0 0 0 3.687-.663v-4.032a5.963 5.963 0 0 1-3.283.778c-1.7 0-2.707-1.152-2.707-3.283 0-2.592 1.094-3.629 2.679-3.629a8.352 8.352 0 0 1 3.082.6V5.366a12.034 12.034 0 0 0-3.573-.518c-5.011 0-7.6 3.2-7.6 7.488 0 4.464 2.362 7.2 7.719 7.2M50.66 16.048c-.806 0-1.325-.259-1.325-1.066 0-.95.518-1.325 1.959-1.325a5.282 5.282 0 0 1 .633.029V15.5a1.742 1.742 0 0 1-1.267.547m-1.76 3.489a4.211 4.211 0 0 0 3.718-1.788 3.347 3.347 0 0 0 3.37 1.786 4.056 4.056 0 0 0 2.391-.576v-3.2a2.9 2.9 0 0 1-.462.058c-.576 0-.806-.346-.806-1.009v-4.43c0-3.772-1.872-5.529-6.48-5.529a14.844 14.844 0 0 0-4.751.72v3.83a14.846 14.846 0 0 1 3.859-.6c1.556 0 2.189.547 2.189 1.728v.461c-.2 0-.433-.029-.921-.029-3.888 0-6.711 1.095-6.711 4.349 0 2.966 2.045 4.233 4.609 4.233m-15.525-.234h5.184v-9.274a7.4 7.4 0 0 1 3.11-.72 6.513 6.513 0 0 1 1.584.173V4.992a3.481 3.481 0 0 0-1.152-.144 4.839 4.839 0 0 0-3.657 1.728V5.078H33.38Zm-12.3.231a6.047 6.047 0 0 0 3.888-1.354v1.123h5.04V5.078h-5.182v9.706a3.025 3.025 0 0 1-1.728.748c-1.037 0-1.555-.461-1.555-1.757V5.078H16.33v9.476c0 2.851 1.239 4.982 4.752 4.982M5.414 10.548c.058-1.009.49-2.045 1.728-2.045 1.095 0 1.555.95 1.555 1.872v.173Zm2.42 8.986a13.961 13.961 0 0 0 4.838-.806v-3.829a11.914 11.914 0 0 1-4.406.864c-2.3 0-2.852-.864-2.938-2.419h8.324a13.521 13.521 0 0 0 .086-1.527c0-3.657-1.584-6.969-6.624-6.969C2.275 4.848 0 8.39 0 12.163c0 4.32 2.16 7.373 7.834 7.373"
                      fill="#fff"
                    ></path>
                  </svg>
                </a>
              </header>

              {!vulnerabilityVisibility && (
                <>
                  <p>
                    The Winemap provides a comprehensive overview of all
                    European wine regions which fall under the{" "}
                    <strong>Protected Designation of Origin (PDO)</strong> label
                    (as of November 2021). It is an essential resource for
                    anyone interested in wine or who works in the wine industry
                    and can be used to increase knowledge as well as
                    appreciation of regional wines and as an instrument for wine
                    sector decision making. The map is based on a collection of
                    legal information, including grape varieties, geospatial
                    boundaries, and production details, and is the first
                    representation of European PDO regions in one comprehensive
                    resource.
                  </p>

                  <Link
                    href="?vulnerability=true"
                    className="flex items-center justify-center"
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="211"
                      height="205"
                      viewBox="0 0 211 205"
                      fill="none"
                    >
                      <g filter="url(#a)">
                        <path
                          fill="#DE1355"
                          className="vulnerbilityButton"
                          d="M129.473 177.56c21.469-7.814 57.802-22.174 66.027-25.168 4.542-1.653 6.662-7.291 4.733-12.591-3.494-9.597-16.113-44.6978-23.369-64.6319-15.114-41.507-60.831-62.9863-102.1145-47.9603C33.4656 42.2349 12.2512 88.0752 27.3617 129.591c15.1104 41.515 60.8271 62.995 102.1113 47.969Z"
                        />
                        <path
                          fill="#fff"
                          fillRule="evenodd"
                          d="M185.623 141.114c-.292.626-1.036.896-1.662.605l-24.47-11.411c-.626-.292-.896-1.036-.604-1.661.291-.626 1.035-.897 1.661-.605l24.47 11.411c.626.292.896 1.035.605 1.661Z"
                          clipRule="evenodd"
                        />
                        <path
                          fill="#fff"
                          fillRule="evenodd"
                          d="M179.709 127.451c.649-.236 1.366.098 1.602.747l4.353 11.96c.237.649-.098 1.366-.747 1.602l-11.96 4.354c-.649.236-1.366-.099-1.602-.748-.236-.648.098-1.366.747-1.602l10.786-3.925-3.926-10.786c-.236-.649.098-1.366.747-1.602Z"
                          clipRule="evenodd"
                        />
                        <path
                          fill="#fff"
                          d="M146.378 124.162c-.707.257-1.371.327-1.992.211-.618-.12-1.167-.406-1.644-.856-.476-.455-.85-1.054-1.121-1.798-.267-.735-.366-1.433-.296-2.094.073-.661.3-1.239.681-1.734.384-.496.909-.865 1.575-1.108.405-.147.822-.223 1.251-.227.429-.005.846.081 1.253.258.406.176.78.462 1.121.856.34.392.628.913.865 1.564l.18.495-5.704 2.076-.381-1.047 4.336-1.578c-.134-.367-.327-.665-.58-.894-.254-.232-.546-.382-.877-.448-.328-.068-.673-.036-1.034.096-.393.143-.7.364-.923.663-.22.296-.354.627-.4.993-.045.362-.002.722.128 1.08l.298.817c.175.48.407.857.698 1.133.293.274.625.444.995.51.369.064.757.021 1.165-.127.265-.097.493-.222.683-.376.19-.157.337-.341.44-.552.103-.21.156-.443.159-.697l1.408-.243c.036.427-.03.838-.197 1.23-.166.388-.425.738-.777 1.05-.35.307-.787.556-1.31.747Z"
                        />
                        <path
                          fill="#fff"
                          d="m138.309 126.935-2.612-7.176 1.35-.492.415 1.14.075-.027c-.01-.434.11-.821.36-1.163.251-.345.587-.594 1.008-.748.087-.031.191-.066.312-.102.123-.038.221-.065.293-.081l.486 1.336c-.061.005-.167.024-.317.058-.151.03-.299.071-.442.124-.33.12-.599.297-.806.531-.206.23-.339.495-.399.796-.061.297-.034.602.079.913l1.595 4.382-1.397.509Z"
                        />
                        <path
                          fill="#fff"
                          d="M132.834 129.107c-.455.166-.897.231-1.326.197-.429-.038-.811-.179-1.144-.425-.329-.247-.58-.605-.751-1.076-.147-.405-.191-.766-.13-1.084.06-.319.195-.602.404-.851.21-.249.464-.472.762-.669.299-.197.611-.377.935-.542.412-.206.746-.373 1.003-.502.255-.132.43-.257.524-.376.094-.119.111-.262.05-.431l-.012-.032c-.149-.408-.379-.683-.691-.823-.309-.141-.689-.13-1.141.034-.47.172-.803.411-.998.718-.193.303-.295.6-.306.889l-1.422.179c-.003-.493.097-.927.298-1.304.204-.381.48-.704.828-.968.347-.267.737-.48 1.17-.637.286-.105.602-.181.948-.229.348-.053.694-.041 1.039.034.348.075.673.244.973.509.3.261.545.653.736 1.176l1.734 4.766-1.364.496-.357-.981-.056.02c-.025.214-.096.441-.213.681-.117.24-.296.469-.538.688-.241.218-.56.399-.955.543Zm-.105-1.231c.386-.141.689-.338.907-.59.222-.253.36-.529.413-.827.056-.303.032-.596-.071-.879l-.337-.925c-.031.068-.111.15-.238.245-.126.092-.273.186-.442.283-.171.094-.337.184-.499.271-.164.085-.3.155-.41.213-.258.133-.485.281-.68.443-.191.162-.326.343-.405.544-.076.198-.069.421.022.67.126.346.349.561.669.645.318.082.676.05 1.071-.093Z"
                        />
                        <path
                          fill="#fff"
                          d="m123.293 126.258-1.185.685c-.112-.143-.252-.267-.42-.371-.166-.106-.362-.17-.589-.193-.227-.023-.486.018-.775.123-.396.144-.694.353-.894.627-.201.271-.251.545-.15.822.087.24.246.401.477.482.231.082.561.098.99.047l1.235-.153c.716-.088 1.294-.032 1.733.168.44.2.752.554.937 1.061.156.43.171.858.044 1.285-.124.423-.373.81-.746 1.161-.37.35-.845.63-1.424.841-.804.293-1.522.36-2.154.202-.634-.161-1.124-.538-1.47-1.131l1.275-.697c.212.321.482.524.81.61.326.082.699.047 1.12-.106.457-.167.789-.395.994-.685.204-.293.255-.578.154-.855-.082-.224-.234-.382-.458-.473-.221-.093-.516-.116-.887-.069l-1.312.176c-.725.091-1.309.028-1.751-.188-.439-.218-.751-.582-.937-1.093-.154-.423-.171-.837-.05-1.241.121-.404.358-.77.711-1.1.352-.332.797-.597 1.336-.793.775-.282 1.447-.336 2.015-.162.566.171 1.023.511 1.371 1.02Z"
                        />
                        <path
                          fill="#fff"
                          d="m111.741 131.779 1.551 4.261-1.397.508-2.611-7.176 1.34-.488.425 1.168.089-.032c.027-.44.174-.839.442-1.198.272-.36.677-.638 1.215-.834.489-.178.955-.231 1.397-.159.442.069.836.267 1.185.595.349.328.631.788.846 1.38l1.662 4.564-1.397.509-1.6-4.396c-.19-.521-.473-.878-.851-1.072-.378-.197-.804-.21-1.278-.037-.324.118-.586.293-.787.525-.199.23-.322.508-.369.832-.046.32 0 .67.138 1.05Z"
                        />
                        <path
                          fill="#fff"
                          d="M106.912 138.526c-.672.245-1.316.304-1.929.179-.614-.126-1.16-.416-1.639-.869-.479-.454-.854-1.051-1.123-1.793-.271-.744-.37-1.445-.295-2.104.074-.658.306-1.233.695-1.724.389-.49.92-.858 1.593-1.103.673-.245 1.316-.304 1.929-.179.614.126 1.161.417 1.641.874s.856 1.057 1.127 1.801c.269.742.367 1.44.291 2.095-.075.656-.307 1.229-.697 1.719-.389.491-.92.859-1.593 1.104Zm-.422-1.174c.436-.159.756-.406.958-.741.203-.334.303-.718.301-1.151 0-.434-.083-.882-.251-1.343-.167-.458-.39-.852-.669-1.185-.278-.336-.602-.569-.974-.698s-.775-.115-1.211.044c-.439.16-.761.409-.966.748-.202.338-.302.726-.302 1.163.003.433.087.878.254 1.336.168.461.39.858.666 1.191.28.333.605.562.975.688.374.125.78.107 1.219-.052Z"
                        />
                        <path
                          fill="#fff"
                          d="m100.429 140.722-2.6114-7.176 1.3968-.509 2.6116 7.176-1.397.509Zm-2.309-8.54c-.2429.088-.4811.083-.7144-.015-.2314-.103-.3885-.268-.4712-.495-.0839-.231-.0697-.458.0427-.683.1143-.228.2929-.387.5359-.475.2429-.088.4801-.081.7114.021.2334.099.392.263.4759.494.0828.227.067.455-.0474.684-.1123.224-.29.38-.5329.469Z"
                        />
                        <path
                          fill="#fff"
                          d="M96.2207 145.47c-.5699.208-1.0877.311-1.5532.311-.4624-.001-.8676-.077-1.2157-.229-.3481-.152-.6392-.351-.8735-.597l1.0204-.933c.134.107.2988.211.4945.312.2.104.4413.166.7239.187.2857.019.6217-.041 1.0079-.182.5294-.193.92-.481 1.1716-.865.2528-.382.2771-.853.0731-1.413l-.5136-1.411-.0887.032c-.0286.183-.0882.397-.1791.642-.0877.244-.2436.484-.4678.721-.2242.236-.5559.435-.9951.595-.5668.206-1.1258.259-1.6768.16-.5491-.103-1.0507-.367-1.5047-.791-.4521-.428-.817-1.023-1.0947-1.786-.2777-.763-.3865-1.464-.3264-2.104.0632-.64.2695-1.188.6188-1.643.3481-.458.8103-.792 1.3865-1.002.4454-.162.8323-.218 1.1608-.168.3274.046.603.14.8271.281.2271.139.4099.268.5484.387l.1028-.037-.4234-1.163 1.3689-.499 2.6696 7.335c.2244.617.2653 1.175.1228 1.675-.1426.5-.4238.934-.8436 1.302-.4167.366-.9303.661-1.5408.883Zm-1.5086-4.101c.4018-.147.7072-.364.9164-.651.2112-.292.3243-.64.3395-1.044.0172-.409-.0644-.861-.2446-1.356-.1757-.483-.4021-.882-.6791-1.197-.2771-.315-.5916-.525-.9436-.63-.3531-.108-.7337-.087-1.1417.061-.4205.153-.7312.39-.9321.71-.2021.317-.3073.686-.3157 1.109-.0053.422.0754.862.2421 1.319.1711.471.393.857.6655 1.16.2725.303.5851.503.938.601.356.096.7411.068 1.1553-.082Z"
                        />
                        <path
                          fill="#fff"
                          d="M87.4709 145.602c-.707.257-1.3709.328-1.9916.212-.6188-.121-1.1671-.406-1.6449-.857-.4759-.454-.8493-1.054-1.1202-1.798-.2675-.735-.3663-1.433-.2962-2.093.0731-.662.3-1.24.6808-1.735.3838-.496.9089-.865 1.5755-1.107a3.7165 3.7165 0 0 1 1.2504-.228c.4287-.004.8462.082 1.2526.258.4064.177.7801.462 1.1212.857.3399.391.6283.912.8653 1.563l.1802.495-5.7042 2.076-.3809-1.046 4.3354-1.578c-.1338-.368-.327-.666-.5796-.895-.2538-.232-.5462-.381-.8773-.448-.3279-.067-.6725-.035-1.0338.096-.3924.143-.6999.364-.9224.664-.2205.295-.354.626-.4006.992-.0447.362-.0018.722.1285 1.08l.2976.818c.1746.48.4072.857.6978 1.132.2937.274.6255.444.9953.511.3687.063.7571.02 1.1651-.128.2647-.096.4925-.222.6833-.376.1897-.157.3362-.341.4395-.551.1033-.211.1561-.443.1586-.698l1.4088-.243c.0358.428-.03.838-.1975 1.231-.1656.388-.4244.738-.7766 1.049-.3502.308-.7869.557-1.3101.747Z"
                        />
                        <path
                          fill="#fff"
                          d="m79.4019 148.375-2.6118-7.176 1.3501-.491.4149 1.14.0748-.028c-.0098-.433.1102-.821.3598-1.162.2516-.346.5877-.595 1.0082-.748.0872-.032.1911-.066.3117-.103.1237-.038.2216-.065.2935-.08l.4863 1.336c-.0617.005-.1676.024-.3177.057a3.139 3.139 0 0 0-.4417.124c-.3302.12-.599.297-.8065.532-.2055.23-.3382.495-.3981.795-.0611.298-.035.602.0784.913l1.5949 4.383-1.3968.508Z"
                        />
                        <path
                          fill="#fff"
                          d="M136.494 109.668c-.707.257-1.37.328-1.991.212-.619-.121-1.167-.406-1.645-.857-.476-.454-.849-1.054-1.12-1.798-.268-.735-.367-1.433-.296-2.093.073-.662.3-1.24.68-1.735.384-.496.909-.865 1.576-1.107.405-.148.822-.224 1.25-.228.429-.004.846.082 1.253.258.406.177.78.462 1.121.857.34.391.628.912.865 1.563l.181.495-5.705 2.076-.381-1.046 4.336-1.578c-.134-.368-.327-.666-.58-.895-.254-.232-.546-.381-.877-.448-.328-.067-.673-.035-1.034.096-.392.143-.7.364-.922.664-.221.295-.354.626-.401.992-.045.362-.002.722.129 1.08l.297.818c.175.479.407.857.698 1.132.294.274.626.444.995.511.369.063.757.02 1.165-.128.265-.096.493-.222.684-.376.189-.157.336-.341.439-.551.104-.211.156-.443.159-.698l1.409-.243c.036.428-.03.838-.198 1.23-.165.389-.424.739-.776 1.05-.351.308-.787.556-1.311.747Z"
                        />
                        <path
                          fill="#fff"
                          d="m127.856 101.813 3.482 9.568-1.397.508-3.482-9.568 1.397-.508Z"
                        />
                        <path
                          fill="#fff"
                          d="m121.687 114.893-3.483-9.567 1.397-.509 1.294 3.555.084-.03c.027-.179.081-.394.162-.646s.231-.5.448-.745c.217-.248.548-.454.993-.616.58-.211 1.15-.252 1.711-.125.561.127 1.072.419 1.531.877.462.456.834 1.071 1.117 1.847.282.775.395 1.487.338 2.136-.058.645-.258 1.2-.601 1.663-.344.46-.806.796-1.385 1.007-.436.158-.819.215-1.15.169-.327-.046-.604-.139-.831-.279-.228-.139-.411-.27-.551-.392l-.116.042.406 1.117-1.364.496Zm.063-4.086c.183.505.418.921.702 1.247.285.327.605.547.96.661.355.111.733.093 1.134-.053.418-.152.726-.389.926-.712.199-.327.3-.707.304-1.143.007-.436-.077-.894-.251-1.374-.173-.473-.399-.872-.68-1.197-.277-.326-.597-.546-.96-.661-.359-.116-.749-.097-1.17.056-.405.147-.709.376-.914.687-.201.309-.305.677-.312 1.103-.008.426.079.888.261 1.386Z"
                        />
                        <path
                          fill="#fff"
                          d="M116.099 117.107c-.455.166-.896.231-1.325.197-.43-.038-.811-.18-1.144-.425-.33-.247-.58-.606-.751-1.076-.148-.405-.191-.766-.131-1.085.061-.318.196-.602.405-.851.209-.249.463-.471.762-.668.299-.197.61-.378.935-.542.412-.206.746-.373 1.002-.502.256-.132.43-.257.525-.376.094-.119.11-.263.049-.431l-.012-.033c-.148-.408-.378-.682-.691-.822-.309-.142-.689-.13-1.14.034-.471.171-.803.411-.998.718-.193.303-.295.599-.306.889l-1.422.179c-.003-.493.096-.928.298-1.304.203-.381.479-.704.827-.968.348-.268.738-.48 1.17-.638.287-.104.603-.18.949-.228.348-.053.694-.041 1.039.034.348.075.672.244.973.508.3.262.545.654.735 1.177l1.735 4.765-1.365.497-.357-.981-.056.02c-.024.214-.095.44-.212.681-.117.24-.297.469-.538.687-.242.219-.56.4-.956.544Zm-.104-1.232c.386-.14.688-.337.907-.589.222-.254.359-.529.413-.828.056-.302.032-.595-.071-.878l-.337-.925c-.032.067-.111.149-.239.245-.125.092-.272.186-.442.283-.17.093-.336.184-.499.271-.163.084-.3.155-.409.213-.259.133-.485.28-.68.443-.192.161-.327.343-.405.544-.076.197-.069.42.021.67.126.345.349.56.669.645.319.081.676.05 1.072-.094Z"
                        />
                        <path
                          fill="#fff"
                          d="m108.837 119.571-2.612-7.176 1.35-.492.415 1.14.075-.027c-.01-.434.11-.821.36-1.163.251-.345.587-.595 1.008-.748.087-.031.191-.066.312-.102.123-.038.221-.065.293-.081l.486 1.336c-.061.005-.167.024-.317.058-.152.03-.299.071-.442.124-.33.12-.599.297-.807.531-.205.23-.338.495-.398.796-.061.297-.035.602.079.913l1.595 4.382-1.397.509Z"
                        />
                        <path
                          fill="#fff"
                          d="M104.129 121.448c-.707.257-1.37.328-1.991.212-.619-.121-1.167-.406-1.645-.857-.476-.454-.8493-1.054-1.1202-1.798-.2676-.735-.3663-1.433-.2963-2.093.0732-.662.3001-1.24.6808-1.735.3837-.496.9087-.865 1.5757-1.108.405-.147.822-.223 1.25-.227.429-.005.846.082 1.253.258.406.177.78.462 1.121.857.34.391.628.912.865 1.563l.181.495-5.705 2.076-.3806-1.046 4.3356-1.578c-.134-.368-.327-.666-.58-.895-.254-.232-.546-.381-.877-.448-.328-.067-.673-.036-1.034.096-.392.143-.7.364-.922.664-.221.295-.354.626-.401.992-.045.362-.002.722.129 1.08l.297.818c.175.479.407.857.698 1.132.294.274.626.444.995.511.369.063.757.02 1.165-.128.265-.097.493-.222.684-.376.189-.157.336-.341.439-.551.104-.211.156-.443.159-.698l1.409-.243c.036.428-.03.838-.198 1.23-.165.389-.424.739-.776 1.05-.351.308-.787.556-1.311.747Z"
                        />
                        <path
                          fill="#fff"
                          d="m92.8359 120.569 1.5508 4.261-1.3969.508-2.6118-7.176 1.3408-.488.4251 1.168.0888-.032c.0267-.44.1741-.839.4422-1.198.2712-.36.6762-.638 1.215-.834.4889-.178.9546-.231 1.3969-.159.4412.069.8362.267 1.1848.595.3487.328.6307.788.8461 1.38l1.6613 4.564-1.3969.509-1.6-4.396c-.1893-.52-.4727-.878-.8503-1.072-.3786-.197-.8046-.21-1.2781-.037-.3239.118-.5865.293-.7877.525-.1982.23-.3211.508-.3689.832-.0458.32.0005.67.1388 1.05Z"
                        />
                        <path
                          fill="#fff"
                          d="m87.4967 116.502 3.4824 9.568-1.3969.509-3.4823-9.568 1.3968-.509Z"
                        />
                        <path
                          fill="#fff"
                          d="m85.089 124.844-1.5286-4.2 1.4015-.51 2.6118 7.176-1.3735.499-.4523-1.242-.0747.027c-.0257.443-.1742.859-.4457 1.247-.2694.384-.6736.674-1.2124.87-.4609.167-.9058.215-1.3345.141-.4267-.077-.8145-.28-1.1631-.608-.3456-.329-.6261-.79-.8415-1.381l-1.6612-4.565 1.3968-.508 1.6001 4.396c.178.489.4551.829.8315 1.02.3764.191.7811.208 1.214.05.2616-.095.4979-.255.7088-.48.214-.226.3584-.503.4334-.83.078-.328.0413-.695-.1104-1.102Z"
                        />
                        <path
                          fill="#fff"
                          d="m77.5704 122.824.0097 8.123-1.495.544-5.2186-6.227 1.4996-.546 3.8272 4.861.0747-.027-.1972-6.182 1.4996-.546Z"
                        />
                        <path
                          fill="#fff"
                          d="m137.427 91.0736-4.724-6.4072 1.444-.5254 3.324 4.7579.07-.0255-.507-5.7833 1.443-.5254 3.311 4.7363.071-.0255-.513-5.7548 1.443-.5254.505 7.9427-1.425.5186-3.343-4.6505-.107.0391.428 5.7115-1.42.5169Z"
                        />
                        <path
                          fill="#fff"
                          d="M131.106 93.538c-.672.2449-1.316.3044-1.929.1786-.614-.1258-1.16-.4155-1.639-.869-.479-.4535-.854-1.0509-1.123-1.7921-.271-.7444-.37-1.4458-.295-2.1041.074-.6584.306-1.2331.695-1.7239.389-.4908.92-.8587 1.593-1.1035.672-.2449 1.316-.3044 1.929-.1786.614.1258 1.161.4171 1.641.8737s.856 1.0571 1.127 1.8014c.269.7413.367 1.4396.291 2.0948-.075.6553-.308 1.2284-.697 1.7192-.389.4908-.92.8587-1.593 1.1035Zm-.422-1.1743c.436-.1587.755-.4054.958-.7402.203-.3347.303-.7186.301-1.1516 0-.434-.083-.8816-.251-1.3425-.167-.4579-.39-.8528-.669-1.1849-.278-.3363-.603-.5691-.974-.6984-.372-.1293-.775-.1146-1.212.0441-.439.1598-.761.4093-.965.7483-.202.3378-.302.7254-.302 1.1626.003.433.087.8784.254 1.3362.167.4609.39.858.666 1.1912.28.3321.605.5612.975.6874.374.1251.78.1077 1.219-.0522Z"
                        />
                        <path
                          fill="#fff"
                          d="m119.831 92.6526 1.551 4.2606-1.397.5085-3.482-9.5678 1.378-.5016 1.296 3.5599.089-.0324c.027-.4474.172-.8477.435-1.2009.263-.3531.674-.6312 1.231-.8341.492-.1791.959-.2343 1.4-.1656.444.0675.841.2653 1.19.5934.35.3238.634.7848.852 1.3827l1.661 4.5644-1.397.5084-1.6-4.3962c-.191-.5263-.475-.885-.852-1.076-.377-.1942-.807-.2034-1.29-.0277-.33.1202-.601.298-.811.5333-.208.2343-.337.5141-.388.8394-.049.3212-.004.6717.134 1.0517Z"
                        />
                        <path
                          fill="#fff"
                          d="m111.192 100.622-2.612-7.1754 1.35-.4914.415 1.1399.075-.0272c-.01-.4339.11-.8214.359-1.1627.252-.3455.588-.5948 1.009-.7479.087-.0317.191-.066.311-.1028.124-.038.222-.0648.294-.0804l.486 1.3361c-.062.0049-.168.024-.318.0575a3.0124 3.0124 0 0 0-.441.1237c-.33.1202-.599.2974-.807.5316-.205.23-.338.4952-.398.7957-.061.2973-.035.6017.078.9132l1.595 4.3821-1.396.508Z"
                        />
                        <path
                          fill="#fff"
                          d="M106.484 102.5c-.707.257-1.371.328-1.991.211-.619-.12-1.167-.405-1.645-.856-.476-.454-.85-1.054-1.12-1.798-.268-.7353-.367-1.433-.297-2.0934.073-.6615.3-1.2397.681-1.7345.384-.4959.909-.8652 1.576-1.1078a3.7365 3.7365 0 0 1 1.25-.2276c.429-.0043.846.0818 1.253.2583.406.1766.78.4621 1.121.8564.34.3913.628.9124.865 1.5633l.18.4952-5.704 2.0761-.381-1.0464 4.336-1.578c-.134-.3675-.327-.6657-.58-.8948-.254-.2321-.546-.3814-.877-.4478-.328-.0676-.673-.0356-1.034.0959-.393.1428-.7.364-.922.6637-.221.2954-.355.6262-.401.9923-.045.3619-.002.722.128 1.0801l.298.8176c.175.4794.407.8574.698 1.1324.294.274.625.444.995.51.369.064.757.021 1.165-.127.265-.097.493-.222.684-.376.189-.157.336-.341.439-.551.103-.211.156-.4435.159-.6984l1.408-.2429c.036.4279-.03.8383-.197 1.2303-.166.389-.425.738-.777 1.05-.35.307-.787.556-1.31.747Z"
                        />
                        <path
                          fill="#fff"
                          d="m99.5267 96.7416.0097 8.1234-1.495.544-5.2186-6.2274 1.4996-.5458 3.8272 4.8602.0747-.027-.1972-6.1816 1.4996-.5458Z"
                        />
                        <path
                          fill="#fff"
                          d="M91.2609 108.041c-.6727.244-1.3159.304-1.9296.178-.6137-.126-1.16-.415-1.6389-.869-.479-.453-.8534-1.051-1.1232-1.792-.2709-.744-.3692-1.446-.295-2.104.0743-.658.3061-1.233.6953-1.724.3892-.491.9202-.859 1.5929-1.103.6727-.245 1.3159-.305 1.9296-.179.6136.126 1.1605.417 1.6406.874.4801.456.8557 1.057 1.1266 1.801.2698.741.367 1.44.2916 2.095-.0755.655-.3078 1.228-.697 1.719-.3892.491-.9202.859-1.5929 1.104Zm-.4221-1.175c.436-.158.7553-.405.958-.74.2026-.335.3028-.719.3004-1.151.0007-.435-.0828-.882-.2506-1.343-.1666-.458-.3897-.853-.6693-1.185-.2776-.336-.6022-.569-.9738-.698-.3715-.13-.7753-.115-1.2113.044-.4392.16-.7611.409-.9657.748-.2015.338-.3021.725-.3017 1.163.0024.433.0869.878.2536 1.336.1678.461.3899.858.6663 1.191.2796.332.6046.561.9751.687.3735.126.7798.108 1.219-.052Z"
                        />
                        <path
                          fill="#fff"
                          d="M83.665 110.805c-.6946.253-1.3498.313-1.9657.181-.614-.136-1.1563-.434-1.6271-.894-.4708-.46-.8371-1.05-1.0989-1.769-.2653-.729-.3623-1.422-.2912-2.079.0701-.661.297-1.239.6808-1.735s.9137-.867 1.5895-1.113c.5451-.198 1.0678-.274 1.5681-.227.4993.044.9455.199 1.3386.466.3962.264.7071.629.9326 1.094l-1.3595.495c-.1971-.309-.4739-.537-.8301-.682-.3532-.147-.7524-.139-1.1978.023-.3893.142-.693.369-.9109.681-.216.308-.3364.679-.3611 1.115-.026.433.054.905.2399 1.415.1905.524.4343.946.7314 1.269.2971.322.6285.534.9941.638.3687.102.7509.081 1.1464-.063.2647-.096.487-.232.6667-.407.1818-.179.3124-.387.3919-.624.0826-.238.1065-.497.0716-.777l1.3594-.495c.1191.482.1188.951-.0008 1.408-.1197.456-.3533.865-.7009 1.228-.3445.362-.8002.646-1.367.852Z"
                        />
                        <path
                          fill="#fff"
                          d="m76.8079 106.995-1.1844.685c-.1119-.143-.2521-.267-.4206-.371-.1654-.106-.3617-.17-.5888-.193-.2271-.023-.4854.018-.7751.123-.3955.144-.6934.353-.8935.627-.2012.271-.2514.545-.1505.822.0872.24.2463.401.4771.482.2308.082.561.098.9905.047l1.2352-.153c.7158-.088 1.2935-.032 1.733.168s.7517.553.9365 1.061c.1564.43.1713.858.0445 1.285-.1247.423-.3737.81-.7468 1.161-.37.35-.8446.63-1.4239.841-.8036.293-1.5215.36-2.1539.202-.6335-.161-1.1235-.538-1.4699-1.131l1.2753-.697c.2122.321.4819.524.8093.61.3262.082.6996.047 1.12-.106.4579-.167.7893-.395.9942-.685.2038-.293.2552-.578.1543-.855-.0816-.224-.2342-.382-.458-.474-.2206-.092-.5164-.115-.8873-.068l-1.3116.176c-.7251.091-1.3088.028-1.7509-.188-.4389-.218-.7514-.582-.9373-1.093-.1542-.424-.1707-.837-.0496-1.241.1211-.404.358-.771.7107-1.1.3516-.332.7968-.597 1.3356-.793.7755-.282 1.4472-.336 2.015-.162.5666.171 1.0236.511 1.3709 1.02Z"
                        />
                        <path
                          fill="#fff"
                          d="m69.9972 115.616-2.6118-7.176 1.3969-.508 2.6118 7.175-1.3969.509Zm-2.3093-8.54c-.243.088-.4811.083-.7145-.015-.2313-.103-.3884-.268-.4712-.495-.0838-.231-.0696-.458.0427-.682.1144-.229.293-.387.5359-.476.243-.088.4801-.081.7115.022.2334.098.392.263.4759.493.0827.227.0669.455-.0474.684-.1123.224-.29.381-.5329.469Z"
                        />
                        <path
                          fill="#fff"
                          d="m63.581 117.951-3.0974 1.128-3.4824-9.568 3.1955-1.163c.9375-.342 1.8123-.443 2.6245-.305.811.135 1.5254.494 2.1432 1.077.6197.579 1.1104 1.365 1.472 2.358.3627.997.4923 1.92.3886 2.769-.1006.848-.4232 1.589-.9678 2.225-.5457.632-1.3045 1.125-2.2762 1.479Zm-2.1129-.659 1.5744-.573c.7288-.266 1.2847-.623 1.6676-1.073.3819-.453.5975-.984.6469-1.595.0482-.614-.0654-1.299-.3408-2.056-.2732-.75-.625-1.344-1.0552-1.78-.4272-.437-.9252-.705-1.4941-.805-.5689-.1-1.2022-.023-1.8999.231l-1.6631.606 2.5642 7.045Z"
                        />
                        <path
                          fill="#fff"
                          d="m65.5071 80.2035 50.3939-18.3419.257.7048-50.3944 18.3419-.2565-.7048Zm5.1882 11.946 48.9097-17.8019.257.7048-48.9102 17.8018-.2565-.7047Z"
                        />
                        <path
                          fill="#fff"
                          d="m112.394 74.6445-2.736-7.5175 5.418-1.972.598 1.6445-3.377 1.2291.47 1.2921 3.098-1.1276.599 1.6444-3.098 1.1276.47 1.2921 3.363-1.2238.598 1.6445-5.403 1.9666Z"
                        />
                        <path
                          fill="#fff"
                          d="M106.941 70.9257c-.079-.1181-.17-.2136-.274-.2866a1.0025 1.0025 0 0 0-.349-.1597c-.127-.0345-.263-.0443-.41-.0296-.146.0114-.298.046-.457.1039-.343.1247-.605.3131-.788.5653-.18.2512-.278.5541-.293.9088-.012.3538.061.7484.219 1.184.161.4405.358.7955.592 1.0651.234.2696.499.4444.797.5244.298.08.623.0559.976-.0724.311-.1131.552-.2523.725-.4177.175-.1662.284-.3513.326-.5551.042-.2038.022-.4183-.06-.6434l.366-.0915-1.718.6252-.529-1.4536 3.333-1.2131.379 1.0425c.25.6852.318 1.3243.204 1.9172-.113.5897-.376 1.1068-.791 1.5515-.413.4413-.947.7813-1.603 1.02-.732.2663-1.431.3447-2.097.2352-.666-.1095-1.259-.3952-1.779-.8571-.518-.4629-.921-1.0908-1.21-1.8836-.226-.6216-.332-1.2065-.318-1.7547.016-.5491.133-1.0503.35-1.5036.217-.4557.516-.8486.897-1.1786.381-.3326.825-.591 1.331-.7754.446-.1621.882-.249 1.31-.2607.43-.015.834.0403 1.212.1659.38.1222.718.3082 1.014.558.296.2498.532.556.708.9186l-2.063.7508Z"
                        />
                        <path
                          fill="#fff"
                          d="m99.674 70.7608 2.736 7.5175-1.703.6199-4.1539-2.961-.044.016 1.4375 3.9497-2.0409.7428-2.7361-7.5175 1.7325-.6306 4.1045 2.9623.0587-.0214-1.4322-3.9349 2.0409-.7428Z"
                        />
                        <path
                          fill="#fff"
                          d="m89.1148 83.1174-2.2024.8016-.2548-8.4207 2.7898-1.0153 5.2175 6.6144-2.2024.8016-3.6271-4.8488-.0588.0214.3382 6.0458Zm-1.4906-2.8163 4.1405-1.507.5558 1.527-4.1405 1.507-.5558-1.527Z"
                        />
                        <path
                          fill="#fff"
                          d="m78.8928 86.838-2.7362-7.5176 2.0409-.7428 1.0688 2.9365 2.7016-.9833-1.0688-2.9365 2.0409-.7428 2.7362 7.5175-2.0409.7428-1.0688-2.9365-2.7016.9833 1.0688 2.9366-2.0409.7428Z"
                        />
                        <path
                          fill="#fff"
                          d="m75.7398 82.6646-2.0702.7535c-.0771-.166-.1728-.3071-.2872-.4234a1.118 1.118 0 0 0-.3878-.2662c-.1451-.0636-.3046-.0943-.4783-.092-.1747-.0002-.3599.0354-.5556.1066-.3426.1247-.6023.3134-.7791.5662-.1744.252-.2662.5556-.2754.9109-.0068.3544.069.7494.2276 1.185.1674.4601.3689.8232.6044 1.0895.237.2629.5015.4299.7934.501.291.0687.6017.0429.9321-.0774.1884-.0685.3488-.1532.4812-.2541.1314-.1032.2357-.2202.3129-.3508a1.1528 1.1528 0 0 0 .149-.4242c.0238-.1556.0185-.3185-.0158-.489l2.0756-.7388c.0913.327.12.6838.0861 1.0703-.0348.384-.1434.7672-.3257 1.1494-.1808.379-.4484.7286-.803 1.0489-.3546.3202-.8071.5806-1.3577.781-.6901.2511-1.3631.3284-2.0191.2318-.6534-.0974-1.2439-.3758-1.7713-.8351-.525-.4602-.9389-1.1063-1.2417-1.9383-.3047-.8369-.3997-1.6005-.2851-2.2907.1137-.6926.3912-1.2855.8325-1.7787.4404-.4956.9983-.8663 1.6737-1.1121.4747-.1728.9351-.267 1.3812-.2824.4461-.0155.8651.0468 1.2569.1868.391.1376.7441.3541 1.0595.6495.3153.2954.5777.6696.7869 1.1228Z"
                        />
                        <path
                          fill="#fff"
                          d="m109.206 61.9703-2.736-7.5175 5.418-1.972.599 1.6445-3.377 1.2291.47 1.2921 3.098-1.1276.599 1.6444-3.099 1.1276.471 1.2921 3.362-1.2238.599 1.6445-5.404 1.9666Z"
                        />
                        <path
                          fill="#fff"
                          d="m99.25 58.943-.5985-1.6444 6.5335-2.3781.599 1.6444-2.261.823 2.137 5.8731-2.011.7321-2.138-5.873-2.261.8229Z"
                        />
                        <path
                          fill="#fff"
                          d="m95.7512 66.8677-2.2024.8016-.2548-8.4207 2.7897-1.0154 5.2173 6.6144-2.2022.8016-3.6271-4.8487-.0587.0213.3382 6.0459Zm-1.4906-2.8163 4.1405-1.507.5558 1.527-4.1405 1.507-.5558-1.527Z"
                        />
                        <path
                          fill="#fff"
                          d="m80.9154 63.754 2.5401-.9245 3.297 3.622.0881-.032.1975-4.8939 2.5401-.9246 2.7362 7.5176-1.9969.7268-1.5818-4.3461-.0588.0214-.1133 4.8965-1.204.4382-3.245-3.7074-.0587.0213 1.5925 4.3755-1.9968.7268-2.7362-7.5176Z"
                        />
                        <path
                          fill="#fff"
                          d="m79.4313 64.2942 2.7361 7.5175-2.0409.7428-2.7361-7.5175 2.0409-.7428Z"
                        />
                        <path
                          fill="#fff"
                          d="m73.7045 74.8919-2.7361-7.5175 2.0409-.7428 2.1376 5.873 3.0393-1.1062.5986 1.6445-5.0803 1.849Z"
                        />
                        <path
                          fill="#fff"
                          d="m70.5517 70.7186-2.0702.7536c-.0771-.166-.1728-.3071-.2872-.4235a1.1201 1.1201 0 0 0-.3879-.2662c-.145-.0636-.3045-.0942-.4782-.0919-.1747-.0002-.3599.0353-.5557.1066-.3426.1247-.6023.3134-.7791.5662-.1743.2519-.2661.5555-.2754.9109-.0067.3544.0691.7494.2277 1.185.1674.46.3689.8232.6043 1.0894.2371.263.5016.43.7935.5011.291.0686.6017.0429.9321-.0774.1884-.0686.3488-.1533.4811-.2541.1315-.1033.2358-.2202.313-.3508a1.155 1.155 0 0 0 .149-.4243c.0238-.1555.0185-.3185-.0158-.4889l2.0756-.7388c.0913.327.12.6838.0861 1.0702-.0348.3841-.1434.7672-.3257 1.1495-.1808.379-.4485.7286-.803 1.0489-.3546.3202-.8071.5806-1.3577.781-.6901.2511-1.3631.3284-2.0191.2318-.6534-.0975-1.2439-.3758-1.7713-.8351-.525-.4602-.9389-1.1063-1.2418-1.9383-.3046-.8369-.3996-1.6005-.285-2.2907.1137-.6926.3912-1.2855.8325-1.7787.4404-.4956.9983-.8663 1.6737-1.1121.4747-.1728.9351-.267 1.3812-.2825.4461-.0154.8651.0468 1.2569.1869.391.1376.7441.3541 1.0595.6495.3153.2953.5776.6696.7869 1.1227Z"
                        />
                      </g>
                      <defs>
                        <filter
                          id="a"
                          width="191.789"
                          height="173.271"
                          x="18.4899"
                          y="18.4154"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          />
                          <feOffset dx="2.6667" dy="2.6667" />
                          <feGaussianBlur stdDeviation="3.3333" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                          <feBlend
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_406_22"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow_406_22"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="211"
                      height="205"
                      viewBox="0 0 211 205"
                      fill="none"
                      className="vulnerbilityButtonSVG"
                    >
                      <g filter="url(#afff)">
                        <path
                          fill="#DE1355"
                          className="vulnerbilityButton"
                          d="M129.473 177.56c21.469-7.814 57.802-22.174 66.027-25.168 4.542-1.653 6.662-7.291 4.733-12.591-3.494-9.597-16.113-44.6978-23.369-64.6319-15.114-41.507-60.831-62.9863-102.1145-47.9603C33.4656 42.2349 12.2512 88.0752 27.3617 129.591c15.1104 41.515 60.8271 62.995 102.1113 47.969Z"
                        />
                        <path
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          d="m184.49 140.586-24.471-11.411"
                        />
                        <path
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="m180.137 128.625 4.353 11.961-11.961 4.353"
                        />
                        <path
                          fill="#fff"
                          d="m63.5811 117.951-3.0974 1.128-3.4824-9.568 3.1955-1.163c.9375-.341 1.8123-.443 2.6244-.305.8111.135 1.5255.494 2.1432 1.077.6198.579 1.1105 1.365 1.4721 2.358.3627.997.4923 1.92.3886 2.769-.1006.848-.4232 1.589-.9678 2.225-.5458.632-1.3045 1.126-2.2762 1.479Zm-2.1129-.659 1.5744-.573c.7287-.266 1.2846-.623 1.6676-1.073.3819-.453.5975-.984.6469-1.595.0482-.614-.0654-1.299-.3408-2.056-.2732-.75-.625-1.344-1.0552-1.779-.4272-.438-.9252-.706-1.4941-.806-.5689-.1-1.2022-.023-1.8999.231l-1.6631.606 2.5642 7.045Zm8.5291-1.676-2.6118-7.176 1.3969-.508 2.6118 7.175-1.3969.509Zm-2.3093-8.54c-.2429.089-.4811.083-.7145-.015-.2313-.103-.3884-.268-.4711-.495-.0839-.231-.0697-.458.0427-.682.1143-.229.2929-.387.5358-.476.243-.088.4801-.081.7115.022.2334.098.392.263.4759.493.0827.227.0669.455-.0474.684-.1123.224-.29.381-.5329.469Zm9.12-.081-1.1844.685c-.1119-.143-.2521-.267-.4206-.371-.1654-.106-.3617-.17-.5888-.193-.2271-.023-.4855.018-.7751.123-.3956.144-.6934.353-.8935.627-.2013.271-.2514.545-.1506.822.0873.24.2464.401.4772.482.2308.082.561.098.9905.047l1.2351-.153c.7159-.088 1.2935-.032 1.7331.168.4395.2.7517.554.9364 1.061.1565.43.1713.858.0446 1.285-.1248.423-.3737.81-.7468 1.161-.37.35-.8446.63-1.4239.841-.8036.293-1.5215.36-2.1539.202-.6335-.161-1.1235-.538-1.47-1.131l1.2754-.697c.2121.321.4819.524.8093.61.3262.082.6996.047 1.12-.106.4579-.167.7892-.395.9942-.685.2038-.293.2552-.578.1543-.855-.0816-.224-.2343-.382-.458-.473-.2206-.093-.5164-.116-.8873-.069l-1.3116.176c-.7252.091-1.3088.028-1.7509-.188-.439-.218-.7514-.582-.9373-1.093-.1542-.423-.1707-.837-.0496-1.241.121-.404.3579-.77.7107-1.1.3516-.332.7968-.597 1.3356-.793.7755-.282 1.4471-.336 2.0149-.162.5667.171 1.0237.511 1.371 1.02Zm6.8571 3.81c-.6946.253-1.3498.313-1.9657.181-.614-.136-1.1563-.434-1.6271-.894-.4708-.46-.8371-1.05-1.0989-1.769-.2653-.729-.3623-1.422-.2912-2.079.0701-.661.297-1.239.6808-1.735.3839-.496.9137-.867 1.5895-1.113.5451-.198 1.0678-.274 1.5682-.227.4992.044.9454.199 1.3385.466.3962.264.7071.629.9326 1.094l-1.3594.495c-.1972-.31-.4739-.537-.8302-.682-.3532-.147-.7524-.139-1.1978.023-.3893.142-.6929.369-.9109.681-.216.308-.3363.679-.3611 1.115-.026.433.054.905.2399 1.415.1905.524.4343.946.7314 1.269.2972.322.6285.534.9941.638.3687.102.7509.081 1.1464-.063.2647-.096.487-.232.6668-.407.1817-.179.3123-.387.3918-.624.0826-.238.1065-.497.0716-.777l1.3595-.495c.119.482.1187.951-.0009 1.408-.1197.456-.3533.865-.7009 1.228-.3445.362-.8002.646-1.367.852Zm7.5958-2.764c-.6727.244-1.3159.304-1.9296.178-.6136-.126-1.1599-.415-1.6389-.869-.479-.453-.8534-1.051-1.1232-1.792-.2709-.744-.3692-1.446-.2949-2.104.0743-.659.306-1.233.6952-1.724.3892-.491.9202-.859 1.5929-1.104.6728-.244 1.316-.304 1.9296-.178.6137.126 1.1606.417 1.6407.874.4801.456.8556 1.057 1.1265 1.801.2698.741.367 1.44.2916 2.095-.0754.655-.3077 1.228-.6969 1.719-.3893.491-.9202.859-1.593 1.104Zm-.4221-1.175c.436-.158.7554-.405.958-.74.2027-.335.3028-.719.3004-1.152.0007-.434-.0828-.881-.2506-1.342-.1666-.458-.3897-.853-.6693-1.185-.2776-.336-.6022-.569-.9737-.698-.3716-.13-.7754-.115-1.2114.044-.4392.16-.761.409-.9657.748-.2015.338-.302.725-.3016 1.163.0024.433.0869.878.2535 1.336.1678.461.3899.858.6664 1.191.2796.332.6046.561.975.687.3735.125.7799.108 1.219-.052Zm8.688-10.1244.0096 8.1234-1.495.544-5.2186-6.2274 1.4996-.5458 3.8272 4.8602.0748-.027-.1973-6.1816 1.4997-.5458Zm6.9572 5.7584c-.707.257-1.371.328-1.991.211-.619-.12-1.167-.405-1.645-.856-.476-.454-.85-1.054-1.12-1.798-.268-.7353-.367-1.433-.297-2.0934.073-.6615.3-1.2396.681-1.7344.384-.496.909-.8652 1.576-1.1078a3.7315 3.7315 0 0 1 1.25-.2276c.429-.0044.846.0817 1.253.2583.406.1765.78.462 1.121.8564.34.3912.628.9123.865 1.5632l.18.4952-5.704 2.0761-.381-1.0464 4.336-1.5779c-.134-.3676-.327-.6658-.58-.8948-.254-.2321-.546-.3814-.877-.4479-.328-.0676-.673-.0356-1.034.0959-.392.1428-.7.3641-.922.6637-.221.2954-.354.6262-.401.9924-.045.3619-.002.7219.128 1.0801l.298.8175c.175.4794.407.8574.698 1.1324.294.274.625.444.995.51.369.064.757.021 1.165-.127.265-.097.493-.222.684-.376.189-.157.336-.341.439-.551.103-.211.156-.4435.159-.6983l1.408-.243c.036.4279-.03.8383-.197 1.2303-.166.389-.424.738-.777 1.05-.35.307-.787.556-1.31.747Zm4.708-1.878-2.612-7.1754 1.35-.4915.415 1.14.075-.0272c-.01-.4339.11-.8214.359-1.1627.252-.3455.588-.5948 1.009-.7479.087-.0317.191-.066.311-.1028.124-.038.222-.0648.294-.0804l.486 1.3361c-.062.0049-.168.024-.318.0575a3.0124 3.0124 0 0 0-.441.1237c-.33.1201-.599.2973-.807.5316-.205.23-.338.4952-.398.7957-.061.2973-.035.6017.079.9132l1.594 4.3821-1.396.508Zm8.639-7.9693 1.551 4.2606-1.397.5084-3.482-9.5678 1.378-.5016 1.296 3.5599.089-.0323c.027-.4474.173-.8477.435-1.2009.263-.3532.674-.6312 1.231-.8341.492-.1791.959-.2344 1.4-.1657.444.0676.841.2654 1.19.5935.35.3238.634.7847.852 1.3827l1.661 4.5643-1.397.5084-1.6-4.3961c-.191-.5263-.475-.885-.852-1.0761-.377-.1941-.807-.2033-1.29-.0276-.33.1201-.6.2979-.811.5333-.208.2342-.337.514-.388.8394-.049.3211-.004.6717.134 1.0517Zm11.275.8854c-.672.2448-1.316.3043-1.929.1785-.614-.1258-1.16-.4155-1.639-.869-.479-.4535-.854-1.0508-1.123-1.7921-.271-.7444-.37-1.4457-.295-2.1041.074-.6584.306-1.233.695-1.7239.389-.4908.92-.8587 1.593-1.1035.672-.2449 1.316-.3044 1.929-.1786.614.1259 1.161.4171 1.641.8737s.856 1.0571 1.127 1.8014c.269.7413.367 1.4396.291 2.0948-.075.6553-.308 1.2284-.697 1.7192-.389.4909-.92.8587-1.593 1.1036Zm-.422-1.1743c.436-.1588.756-.4055.958-.7402.203-.3348.303-.7187.301-1.1516 0-.4341-.083-.8817-.251-1.3426-.167-.4578-.39-.8528-.669-1.1849-.278-.3363-.603-.5691-.974-.6984-.372-.1293-.775-.1146-1.211.0441-.44.1598-.762.4093-.966.7483-.202.3379-.302.7254-.302 1.1626.003.433.087.8784.254 1.3362.168.461.39.858.666 1.1912.28.3321.605.5612.975.6874.374.1251.78.1077 1.219-.0521Zm6.743-1.2902-4.724-6.4072 1.444-.5254 3.324 4.7579.07-.0255-.507-5.7833 1.443-.5254 3.312 4.7363.07-.0255-.513-5.7548 1.444-.5254.504 7.9427-1.425.5186-3.343-4.6505-.107.0391.428 5.7115-1.42.5169ZM77.5705 122.824l.0096 8.123-1.4949.544-5.2187-6.227 1.4997-.546 3.8272 4.861.0747-.027-.1972-6.182 1.4996-.546Zm7.5186 2.02-1.5286-4.2 1.4015-.51 2.6118 7.176-1.3735.5-.4523-1.243-.0747.027c-.0257.443-.1742.859-.4457 1.247-.2694.384-.6736.674-1.2124.87-.4609.167-.9058.215-1.3345.141-.4268-.077-.8145-.28-1.1632-.608-.3455-.329-.626-.79-.8414-1.381l-1.6612-4.565 1.3968-.508 1.6001 4.396c.1779.489.4551.829.8315 1.02.3764.191.781.208 1.214.05.2616-.095.4978-.255.7087-.48.214-.226.3585-.503.4335-.83.078-.328.0412-.695-.1104-1.102Zm2.4076-8.342 3.4824 9.568-1.3969.509-3.4823-9.568 1.3968-.509Zm5.3393 4.067 1.5507 4.261-1.3968.508-2.6118-7.176 1.3408-.488.4251 1.168.0887-.032c.0268-.44.1742-.839.4423-1.198.2711-.36.6761-.637 1.2149-.834.489-.178.9547-.231 1.397-.159.4412.069.8361.267 1.1848.595.3487.328.6307.788.8461 1.38l1.6613 4.564-1.3969.509-1.6-4.396c-.1893-.52-.4728-.878-.8503-1.072-.3786-.197-.8047-.209-1.2781-.037-.3239.118-.5865.293-.7877.525-.1982.231-.3211.508-.3689.832-.0458.32.0005.67.1388 1.05Zm11.293.879c-.707.257-1.37.328-1.991.212-.619-.121-1.167-.406-1.645-.857-.476-.454-.8493-1.054-1.1202-1.798-.2676-.735-.3663-1.433-.2963-2.093.0732-.662.3001-1.24.6808-1.735.3837-.496.9087-.865 1.5757-1.108.405-.147.822-.223 1.25-.227.429-.005.846.082 1.253.258.406.177.78.462 1.121.857.34.391.628.912.865 1.563l.181.495-5.705 2.076-.3806-1.046 4.3356-1.578c-.134-.368-.327-.666-.58-.895-.254-.232-.546-.381-.877-.448-.328-.067-.673-.036-1.034.096-.392.143-.7.364-.922.664-.221.295-.354.626-.401.992-.045.362-.002.722.129 1.08l.297.818c.175.479.407.857.698 1.132.294.274.626.444.995.511.369.063.757.02 1.165-.128.265-.097.493-.222.684-.376.189-.157.336-.341.439-.551.104-.211.156-.443.159-.698l1.409-.243c.036.428-.03.838-.198 1.23-.165.389-.424.739-.776 1.05-.351.308-.787.556-1.311.747Zm4.708-1.878-2.612-7.175 1.35-.492.415 1.14.075-.027c-.01-.434.11-.821.36-1.163.251-.345.587-.595 1.008-.748.087-.031.191-.066.312-.102.123-.038.221-.065.293-.081l.486 1.336c-.061.005-.167.024-.317.058-.152.03-.299.071-.442.123-.33.121-.599.298-.807.532-.205.23-.338.495-.398.796-.061.297-.035.601.079.913l1.595 4.382-1.397.508Zm7.262-2.463c-.454.166-.896.231-1.325.197-.43-.038-.811-.179-1.144-.425-.33-.247-.58-.606-.751-1.076-.148-.405-.191-.766-.13-1.085.06-.318.195-.602.404-.851.209-.248.463-.471.762-.668.299-.197.61-.378.935-.542.412-.206.746-.373 1.002-.502.256-.132.43-.257.525-.376.094-.119.111-.263.049-.431l-.012-.033c-.148-.408-.378-.682-.69-.822-.309-.142-.69-.13-1.141.034-.471.171-.803.411-.998.718-.193.303-.295.599-.306.889l-1.422.179c-.003-.493.096-.928.298-1.304.203-.381.479-.704.827-.968.348-.267.738-.48 1.17-.638.287-.104.603-.18.949-.228.348-.053.694-.041 1.039.034.348.075.672.244.973.508.3.262.545.654.735 1.177l1.735 4.765-1.365.497-.357-.981-.056.02c-.024.214-.095.441-.212.681-.117.24-.297.469-.538.688-.242.218-.56.399-.956.543Zm-.104-1.232c.386-.14.688-.337.907-.589.222-.254.359-.529.413-.828.056-.302.032-.595-.071-.878l-.337-.925c-.032.068-.111.149-.239.245-.125.092-.272.186-.442.283-.17.094-.336.184-.499.271-.163.084-.299.155-.409.213-.259.133-.485.28-.68.443-.192.161-.327.343-.405.544-.076.197-.069.42.021.67.126.345.349.56.669.645.319.082.676.05 1.072-.094Zm5.692-.982-3.483-9.567 1.397-.509 1.294 3.555.084-.03c.027-.179.081-.394.162-.646s.231-.5.448-.745c.217-.248.548-.454.993-.616.58-.211 1.15-.252 1.711-.125.561.127 1.072.419 1.531.877.462.456.834 1.071 1.117 1.847.282.775.395 1.487.338 2.136-.058.645-.258 1.2-.601 1.663-.344.46-.806.796-1.385 1.007-.436.158-.819.215-1.15.169-.327-.046-.604-.139-.831-.279-.228-.139-.411-.27-.551-.392l-.116.042.406 1.117-1.364.496Zm.063-4.086c.183.505.418.92.702 1.247.285.327.605.547.96.661.355.111.733.093 1.134-.053.418-.152.726-.389.926-.712.199-.327.3-.707.304-1.143.007-.436-.077-.894-.251-1.374-.173-.473-.399-.872-.68-1.197-.277-.326-.597-.546-.96-.661-.359-.116-.749-.097-1.17.056-.405.147-.709.376-.914.687-.201.309-.305.677-.312 1.103-.008.426.079.888.261 1.386Zm6.106-8.994 3.482 9.568-1.397.508-3.482-9.568 1.397-.508Zm8.639 7.855c-.707.257-1.371.328-1.992.212-.619-.121-1.167-.406-1.645-.857-.476-.454-.849-1.054-1.12-1.798-.268-.735-.366-1.433-.296-2.093.073-.662.3-1.24.68-1.735.384-.496.909-.865 1.576-1.107.405-.148.822-.224 1.25-.228.429-.004.847.082 1.253.258.406.177.78.462 1.121.857.34.391.628.912.865 1.563l.181.495-5.705 2.076-.38-1.046 4.335-1.578c-.134-.368-.327-.666-.58-.895-.253-.232-.546-.381-.877-.448-.328-.067-.672-.035-1.034.096-.392.143-.7.364-.922.664-.221.295-.354.626-.401.992-.044.362-.002.722.129 1.08l.297.818c.175.479.408.857.698 1.132.294.274.626.444.995.511.369.063.758.02 1.166-.128.264-.096.492-.222.683-.376.19-.157.336-.341.439-.551.104-.211.156-.443.159-.698l1.409-.243c.036.428-.03.838-.198 1.23-.165.389-.424.739-.776 1.05-.351.308-.787.556-1.31.747Zm-57.0931 38.707-2.6118-7.176 1.3501-.491.4149 1.14.0748-.028c-.0098-.433.1102-.821.3598-1.162.2517-.346.5877-.595 1.0082-.748.0872-.032.1911-.066.3117-.103.1237-.038.2216-.065.2935-.08l.4863 1.336c-.0617.005-.1676.024-.3177.057a3.139 3.139 0 0 0-.4417.124c-.3302.12-.599.297-.8065.532-.2055.23-.3382.495-.3981.795-.0611.298-.035.602.0784.913l1.5949 4.383-1.3968.508Zm8.069-2.773c-.707.257-1.3708.328-1.9916.212-.6187-.121-1.167-.406-1.6449-.856-.4758-.455-.8492-1.055-1.1201-1.799-.2676-.735-.3663-1.433-.2963-2.093.0732-.662.3001-1.24.6808-1.735.3838-.495.909-.865 1.5755-1.107a3.7174 3.7174 0 0 1 1.2504-.228c.4287-.004.8463.082 1.2527.258.4064.177.7801.462 1.1211.857.34.391.6284.912.8653 1.563l.1802.495-5.7042 2.076-.3809-1.046 4.3354-1.578c-.1337-.368-.3269-.666-.5796-.895-.2538-.232-.5462-.381-.8772-.448-.328-.067-.6726-.035-1.0339.096-.3924.143-.6998.364-.9223.664-.2205.295-.3541.626-.4007.992-.0446.362-.0018.722.1286 1.08l.2976.818c.1745.48.4071.857.6977 1.132.2938.274.6255.444.9954.511.3687.063.757.021 1.165-.128.2648-.096.4925-.222.6834-.376.1896-.157.3361-.341.4394-.551.1033-.211.1562-.443.1587-.698l1.4088-.243c.0358.428-.0301.838-.1976 1.231-.1655.388-.4244.738-.7765 1.049-.3502.308-.7869.557-1.3102.747Zm8.7499-.132c-.57.208-1.0877.311-1.5533.311-.4624-.001-.8676-.077-1.2157-.229-.348-.152-.6392-.351-.8734-.597l1.0204-.933c.1339.107.2988.211.4945.313.1999.103.4412.165.7238.186.2857.019.6217-.041 1.0079-.182.5295-.193.92-.481 1.1716-.865.2528-.382.2771-.853.0731-1.413l-.5135-1.411-.0888.032c-.0285.183-.0882.397-.179.642-.0878.244-.2437.484-.4679.721-.2242.236-.5559.435-.995.595-.5669.206-1.1258.259-1.6769.16-.5491-.103-1.0507-.367-1.5047-.791-.4521-.428-.817-1.023-1.0947-1.786-.2777-.763-.3865-1.464-.3264-2.104.0632-.64.2695-1.188.6188-1.643.3482-.458.8103-.792 1.3865-1.002.4454-.162.8323-.218 1.1608-.168.3274.046.6031.14.8271.281.2271.139.41.268.5485.387l.1028-.037-.4234-1.163 1.3688-.499 2.6696 7.335c.2244.617.2654 1.175.1228 1.675s-.4238.934-.8436 1.302c-.4167.366-.9303.661-1.5407.883Zm-1.5087-4.101c.4018-.147.7073-.364.9164-.651.2112-.292.3244-.64.3395-1.044.0172-.409-.0644-.861-.2446-1.356-.1757-.482-.4021-.882-.6791-1.197-.277-.315-.5916-.525-.9436-.63-.3531-.108-.7337-.087-1.1417.061-.4204.153-.7311.39-.9321.71-.2021.317-.3073.687-.3157 1.109-.0052.422.0754.862.2421 1.319.1712.471.393.857.6655 1.16.2725.303.5852.503.938.601.356.096.7411.068 1.1553-.082Zm5.7169-.647-2.6114-7.176 1.3969-.509 2.6115 7.176-1.397.509Zm-2.3089-8.54c-.243.088-.4811.083-.7145-.015-.2314-.103-.3884-.268-.4712-.495-.0839-.231-.0696-.458.0427-.683.1144-.228.293-.387.5359-.475.243-.088.4801-.081.7115.021.2334.099.392.263.4759.494.0827.227.0669.455-.0474.684-.1124.224-.29.38-.5329.469Zm8.7919 6.344c-.672.245-1.316.304-1.929.178-.614-.125-1.16-.415-1.639-.868-.479-.454-.854-1.051-1.123-1.793-.271-.744-.37-1.445-.295-2.104.074-.658.306-1.233.695-1.724.389-.49.92-.858 1.593-1.103.673-.245 1.316-.305 1.929-.179.614.126 1.161.417 1.641.874s.856 1.057 1.127 1.801c.269.742.367 1.44.291 2.095-.075.656-.307 1.229-.697 1.719-.389.491-.92.859-1.593 1.104Zm-.422-1.174c.436-.159.756-.406.958-.741.203-.334.303-.718.301-1.151 0-.434-.083-.882-.251-1.343-.167-.458-.39-.852-.669-1.185-.278-.336-.602-.569-.974-.698s-.775-.115-1.211.044c-.439.16-.761.409-.966.748-.202.338-.302.726-.302 1.163.003.433.087.878.254 1.336.168.461.39.858.666 1.191.28.333.605.562.975.688.374.125.78.107 1.219-.052Zm5.252-5.573 1.55 4.261-1.397.508-2.611-7.176 1.34-.488.426 1.168.088-.032c.027-.44.174-.839.443-1.198.271-.36.676-.637 1.214-.834.489-.178.955-.231 1.397-.159.442.069.837.267 1.185.595.349.328.631.788.846 1.38l1.662 4.564-1.397.509-1.6-4.396c-.19-.52-.473-.878-.851-1.072-.378-.197-.804-.209-1.278-.037-.324.118-.586.293-.787.525-.199.23-.321.508-.369.832-.046.32 0 .67.139 1.05Zm11.551-5.521-1.185.685c-.112-.143-.252-.267-.42-.371-.166-.106-.362-.17-.589-.193-.227-.023-.486.018-.775.123-.396.144-.694.353-.894.627-.201.271-.251.545-.15.822.087.24.246.401.477.482.231.082.561.098.99.047l1.235-.153c.716-.088 1.294-.032 1.733.168.44.2.752.554.937 1.061.156.43.171.858.045 1.286-.125.422-.374.809-.747 1.16-.37.35-.845.63-1.424.841-.804.293-1.522.36-2.154.202-.634-.161-1.124-.538-1.47-1.131l1.275-.697c.212.321.482.524.81.61.326.082.699.047 1.12-.106.457-.167.789-.395.994-.685.204-.293.255-.578.154-.855-.081-.224-.234-.382-.458-.473-.221-.093-.516-.116-.887-.069l-1.312.176c-.725.091-1.309.028-1.751-.188-.439-.218-.751-.582-.937-1.093-.154-.423-.171-.837-.05-1.241.121-.404.358-.77.711-1.1.352-.332.797-.597 1.336-.793.775-.282 1.447-.336 2.015-.162.566.171 1.023.511 1.371 1.02Zm9.541 2.849c-.455.166-.897.231-1.326.197-.429-.038-.811-.179-1.144-.425-.329-.247-.58-.605-.751-1.076-.147-.404-.191-.766-.13-1.084.06-.319.195-.602.404-.851.21-.249.464-.472.762-.669.299-.197.611-.377.935-.541.412-.207.746-.374 1.003-.503.255-.132.43-.257.524-.376.094-.119.111-.262.05-.431l-.012-.032c-.149-.408-.379-.682-.691-.823-.309-.141-.689-.13-1.141.034-.47.172-.803.411-.998.718-.193.303-.295.6-.306.889l-1.422.179c-.003-.493.097-.927.298-1.304.204-.381.48-.704.828-.968.347-.267.737-.48 1.17-.637.286-.105.602-.181.948-.229.348-.053.694-.041 1.039.034.348.075.673.244.973.509.3.261.545.653.736 1.176l1.734 4.766-1.364.496-.357-.981-.056.02c-.025.214-.096.441-.213.681-.117.24-.296.469-.538.688-.241.218-.56.399-.955.543Zm-.105-1.231c.386-.141.689-.338.907-.59.222-.253.36-.529.413-.827.056-.303.032-.596-.071-.879l-.337-.925c-.031.068-.111.15-.238.245-.126.092-.273.186-.442.283-.171.094-.337.184-.499.272-.164.084-.3.155-.41.212-.258.133-.485.281-.68.443-.191.162-.326.343-.405.544-.076.198-.069.421.022.67.126.346.349.561.669.645.318.082.676.05 1.071-.093Zm5.58-.942-2.612-7.175 1.35-.492.415 1.14.075-.027c-.01-.434.11-.821.36-1.163.252-.345.588-.595 1.008-.748.087-.031.191-.066.312-.102.124-.038.221-.065.293-.081l.487 1.336c-.062.005-.168.024-.318.058-.151.03-.299.071-.442.123-.33.121-.599.298-.806.532-.206.23-.339.495-.398.796-.062.297-.035.602.078.913l1.595 4.382-1.397.508Zm8.069-2.772c-.707.257-1.371.327-1.991.211-.619-.12-1.168-.406-1.645-.856-.476-.455-.85-1.054-1.121-1.798-.267-.735-.366-1.433-.296-2.094.073-.661.3-1.239.681-1.734.384-.496.909-.865 1.576-1.108.404-.147.821-.223 1.25-.227.429-.005.846.081 1.253.258.406.176.78.462 1.121.856.34.392.628.913.865 1.564l.18.495-5.704 2.076-.381-1.047 4.336-1.577c-.134-.368-.327-.666-.58-.895-.254-.232-.546-.382-.877-.448-.328-.068-.673-.036-1.034.096-.393.143-.7.364-.923.663-.22.296-.354.627-.4.993-.045.362-.002.722.128 1.08l.298.817c.175.48.407.858.698 1.133.293.274.625.444.995.51.369.064.757.021 1.165-.127.265-.097.493-.222.683-.376.19-.157.337-.341.44-.552.103-.21.156-.443.159-.697l1.408-.243c.036.427-.03.838-.197 1.23-.166.388-.425.738-.777 1.05-.35.307-.787.556-1.31.747Z"
                        />
                        <path
                          fill="#fff"
                          d="m70.5517 70.7186-2.0703.7535c-.077-.166-.1727-.3071-.2871-.4234a1.1174 1.1174 0 0 0-.3879-.2662c-.1451-.0636-.3045-.0943-.4782-.092-.1747-.0002-.3599.0354-.5557.1066-.3426.1247-.6023.3135-.7791.5663-.1743.2519-.2661.5555-.2754.9108-.0068.3544.0691.7494.2276 1.185.1675.4601.369.8232.6044 1.0895.2371.2629.5015.4299.7935.501.291.0687.6017.0429.9321-.0774.1884-.0685.3488-.1532.4811-.2541.1315-.1032.2358-.2202.313-.3508a1.154 1.154 0 0 0 .149-.4242c.0238-.1556.0185-.3185-.0158-.4889l2.0756-.7389c.0913.3271.12.6838.0861 1.0703-.0348.384-.1434.7672-.3257 1.1495-.1808.3789-.4485.7285-.803 1.0488-.3546.3202-.8072.5806-1.3578.781-.6901.2512-1.3631.3284-2.019.2319-.6535-.0975-1.2439-.3759-1.7714-.8352-.5249-.4602-.9388-1.1063-1.2417-1.9383-.3046-.8369-.3996-1.6004-.285-2.2906.1137-.6927.3912-1.2856.8325-1.7788.4404-.4956.9983-.8663 1.6737-1.1121.4747-.1728.9351-.2669 1.3812-.2824.4461-.0155.865.0468 1.2569.1868.3909.1376.7441.3541 1.0595.6495.3153.2954.5776.6696.7869 1.1228Zm3.1529 4.1733-2.7362-7.5175 2.0409-.7428 2.1376 5.873 3.0393-1.1062.5986 1.6445-5.0802 1.849Zm5.7267-10.5978 2.7362 7.5176-2.0409.7428-2.7362-7.5175 2.0409-.7429Zm1.4841-.5401 2.5401-.9245 3.297 3.622.0881-.0321.1975-4.8939 2.5401-.9245 2.7361 7.5175-1.9968.7268-1.5819-4.3461-.0587.0214-.1134 4.8966-1.2039.4382-3.245-3.7075-.0588.0214 1.5926 4.3754-1.9969.7268-2.7361-7.5175Zm14.8358 3.1136-2.2024.8016-.2548-8.4207 2.7897-1.0153 5.2173 6.6143-2.2022.8017-3.6271-4.8488-.0587.0214.3382 6.0458Zm-1.4906-2.8163 4.1405-1.507.5558 1.527-4.1406 1.507-.5557-1.527Zm4.9895-5.1083-.5986-1.6445 6.5335-2.3781.599 1.6445-2.261.823 2.137 5.8731-2.011.7321-2.138-5.8731-2.2609.823Zm9.9559 3.0273-2.736-7.5175 5.418-1.972.599 1.6445-3.377 1.2291.47 1.2921 3.098-1.1276.599 1.6444-3.099 1.1276.471 1.2921 3.362-1.2238.599 1.6445-5.404 1.9666ZM75.7399 82.6645l-2.0703.7536c-.077-.166-.1727-.3071-.2871-.4235a1.1201 1.1201 0 0 0-.3879-.2662c-.1451-.0636-.3045-.0942-.4782-.0919-.1747-.0002-.3599.0353-.5557.1066-.3426.1247-.6023.3134-.7791.5662-.1743.2519-.2661.5555-.2754.9109-.0068.3544.0691.7494.2276 1.185.1675.46.369.8232.6044 1.0894.2371.263.5015.43.7935.5011.291.0686.6017.0429.932-.0774.1885-.0686.3489-.1533.4812-.2541.1315-.1033.2358-.2202.313-.3508a1.155 1.155 0 0 0 .149-.4243c.0238-.1555.0185-.3185-.0158-.4889l2.0756-.7388c.0913.327.12.6838.0861 1.0702-.0348.3841-.1434.7672-.3257 1.1495-.1808.379-.4485.7286-.803 1.0488-.3546.3203-.8072.5806-1.3578.781-.6901.2512-1.3631.3285-2.019.2319-.6535-.0975-1.2439-.3758-1.7714-.8351-.5249-.4602-.9389-1.1063-1.2417-1.9383-.3046-.8369-.3996-1.6005-.285-2.2907.1137-.6926.3912-1.2855.8325-1.7787.4404-.4956.9983-.8663 1.6737-1.1122.4747-.1727.9351-.2669 1.3812-.2824.4461-.0154.865.0468 1.2569.1869.3909.1376.7441.3541 1.0595.6495.3153.2953.5776.6696.7869 1.1227Zm3.1529 4.1734-2.7362-7.5176 2.0409-.7428 1.0688 2.9366 2.7016-.9834-1.0688-2.9365 2.0409-.7428 2.7362 7.5175-2.0409.7428-1.0688-2.9365-2.7017.9833 1.0688 2.9366-2.0408.7428Zm10.222-3.7206-2.2024.8017-.2547-8.4207 2.7897-1.0154 5.2175 6.6144-2.2024.8016-3.6271-4.8487-.0587.0213.3381 6.0458Zm-1.4906-2.8162 4.1406-1.5071.5557 1.527-4.1405 1.5071-.5558-1.527Zm12.0498-9.5404 2.736 7.5175-1.703.6199-4.1538-2.961-.0441.0161 1.4376 3.9496-2.0409.7428-2.7362-7.5175 1.7326-.6306 4.1044 2.9623.0588-.0213-1.4322-3.935 2.0408-.7428Zm7.267.165c-.079-.1181-.17-.2137-.274-.2866a1.0027 1.0027 0 0 0-.349-.1598c-.127-.0344-.263-.0443-.41-.0296-.146.0114-.298.0461-.457.104-.343.1247-.605.3131-.788.5652-.18.2513-.278.5542-.293.9089-.012.3537.061.7484.219 1.184.161.4405.358.7955.592 1.0651.234.2696.499.4444.797.5244.298.08.623.0559.976-.0724.311-.1131.552-.2524.725-.4177.175-.1663.284-.3513.326-.5551.042-.2038.022-.4183-.06-.6434l.366-.0916-1.718.6253-.529-1.4536 3.333-1.2131.379 1.0425c.25.6851.318 1.3242.204 1.9172-.113.5896-.376 1.1068-.791 1.5514-.413.4413-.947.7813-1.603 1.02-.732.2664-1.431.3448-2.097.2353-.666-.1095-1.259-.3952-1.779-.8572-.518-.4628-.921-1.0907-1.21-1.8836-.226-.6215-.332-1.2064-.318-1.7546.016-.5491.133-1.0503.35-1.5036a3.579 3.579 0 0 1 .897-1.1787c.381-.3325.825-.5909 1.331-.7753.446-.1621.882-.249 1.31-.2607.43-.015.834.0402 1.212.1658.38.1223.718.3083 1.014.5581.296.2497.532.5559.708.9185l-2.063.7509Zm5.453 3.7188-2.736-7.5176 5.418-1.9719.598 1.6444-3.377 1.2292.47 1.292 3.098-1.1276.599 1.6445-3.098 1.1276.47 1.2921 3.363-1.2238.598 1.6444-5.403 1.9667Z"
                        />
                        <path
                          fill="#fff"
                          d="m65.5071 80.2034 50.3939-18.3419.257.7048-50.3944 18.3419-.2565-.7048Zm5.1882 11.946 48.9097-17.8018.257.7048-48.9102 17.8018-.2565-.7048Z"
                        />
                      </g>
                      <defs>
                        <filter
                          id="afff"
                          width="191.789"
                          height="173.271"
                          x="18.4899"
                          y="18.4154"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          />
                          <feOffset dx="2.6667" dy="2.6667" />
                          <feGaussianBlur stdDeviation="3.3333" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                          <feBlend
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_406_22"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow_406_22"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </Link>
                </>
              )}
              {vulnerabilityVisibility && (
                <>
                  <h2>How vulnerable are our Vineyards?</h2>
                  <p>
                    The vulnerability of a Protected Designation of Origin (PDO)
                    region is an indication of its resilience towards climate
                    change. It encompasses various factors, including exposure
                    to climate change, sensitivity to their impacts, and the
                    capacity to adapt. It is influenced by social, economic, and
                    environmental conditions, as well as geographical location
                    and access to resources. A higher vulnerability indicates
                    regions that are more susceptible to experiencing adverse
                    effects from climate change compared to the other European
                    PDO regions, while regions with a lower vulnerability are
                    comparatively more resilient. Assessing vulnerability helps
                    to identify regions most at risk, guiding efforts to enhance
                    resilience and reduce negative impacts of climate change.
                  </p>
                  <p className="mt-2 text-sm">
                    <Link href="/vulnerability" className="underline">
                      read more
                    </Link>
                  </p>
                  <h2 className="mt-6">Vulnerability overview for all PDOs</h2>
                  <p className="flex items-center mb-2">
                    <VulnerabilityDot type="low" className="mb-[2px]" />
                    27% are at low risk
                  </p>
                  <p className="flex items-center mb-2">
                    <VulnerabilityDot type="moderate" className="mb-[2px]" />
                    43% are at moderate risk
                  </p>
                  <p className="flex items-center mb-2">
                    <VulnerabilityDot type="high" className="mb-[2px]" />
                    25% are at high risk
                  </p>
                  <p className="flex items-center mb-2">
                    <VulnerabilityDot type="very high" className="mb-[2px]" />
                    5% are at very high risk
                  </p>

                  <div className="bg-white text-black p-4 mt-6">
                    <h3 className="bold mb-2">Tip</h3>
                    <p>
                      Zoom and select a region on the map to get detailed
                      information about the PDOs vulnerability.
                    </p>
                  </div>
                  <hr className="my-6" />
                </>
              )}

              <p className={styles.homeNavigation}>
                <Link href="/about" className={styles.homeNavigationItem}>
                  About the project
                </Link>
              </p>
              <p>
                <Link href="/about-pdo" className={styles.homeNavigationItem}>
                  What’s a PDO?
                </Link>
              </p>
              <p>
                <Link
                  href="/?vulnerability=true"
                  className={styles.homeNavigationItem}
                >
                  Winemap Climate
                </Link>
              </p>
              <p>
                <Link href="/about-data" className={styles.homeNavigationItem}>
                  About the data
                </Link>
              </p>
              <p>
                <Link href="/team" className={styles.homeNavigationItem}>
                  The Team
                </Link>
              </p>

              {/* <button onClick={() => setShowChart(!showChart)}>
              Did you know?
            </button> */}
            </div>
          </div>
        </Suspense>
      )}
      {/* {showChart && (
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
      )} */}
      {/* list of PDOs */}
      {pdos && !activePDO && (
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.contentFrame}>
            <Smallheader
              onClickFunction={onClearFilter}
              vulneral={vulnerabilityVisibility}
            />
            {pdos.length > 1 && (
              <h3 className={styles.amountOfItems}>
                {pdos.length} {!fromSearch && "overlapping"} PDOs found
              </h3>
            )}
            {pdos.map((pdo) => (
              <div
                key={pdo?.pdoid}
                className={`${styles.PDOlistitem}`}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                  openDetail(pdo?.pdoid)
                }
              >
                <h2 className="flex items-start gap-[11px] leading-[120%] mb-3 font-medium">
                  {pdo?.vulneral?.Vulnerability && (
                    <VulnerabilityDot
                      type={pdo.vulneral.Vulnerability}
                      className="w-[20px] h-[20px]"
                    />
                  )}
                  {pdo?.pdoname}
                </h2>
                {pdo?.registration && (
                  <p className="flex items-start gap-4 h-fit">
                    <Image
                      src={registrationIcon}
                      alt="Registration Date"
                      width={35}
                      height={35}
                    />
                    <span>
                      <span className="bold">Registration:</span>{" "}
                      {pdo?.registration}
                    </span>
                  </p>
                )}
                {pdo?.category && (
                  <p className="flex items-start gap-4 ">
                    <Image
                      src={categoryIcon}
                      alt="Category"
                      width={35}
                      height={35}
                    />
                    <span>
                      <span className="bold">Category:</span>{" "}
                      {pdo?.category.replaceAll("/", ", ")}
                    </span>
                  </p>
                )}
                <span
                  className={`${styles.arrow} ${styles.right} ${styles.alignRight}`}
                ></span>
              </div>
            ))}
          </div>
        </Suspense>
      )}
      {/* PDO detail */}
      {activePDO && (
        <Suspense fallback={<div>Loading...</div>}>
          <div className={`${styles.contentFrame} w-[600px]`}>
            <Smallheader
              onClickFunction={onClearFilter}
              vulneral={vulnerabilityVisibility}
            />

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
              className={`${styles.PDOdetail}${
                pdos ? ` ${styles.margin}` : ``
              } `}
            >
              <h2 className="text-[32px] font-bold mb-4 leading-tight ">
                {activePDO.pdoname}
              </h2>
              <div className={styles.buttonDiv}>
                <button
                  className="px-4 py-1 flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black "
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => showPDOonMap(activePDO.pdoid)}
                >
                  show on map
                </button>
                <button
                  onClick={() => onClearFilter()}
                  className="px-4 py-1 flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black "
                >
                  reset
                </button>
              </div>
              {vulnerabilityVisibility && activePDO.vulneral && (
                <div className="">
                  <hr className="my-6" />
                  <h3 className="text-[24px] font-medium mb-4 flex items-center gap-2">
                    Vulnerability Index{" "}
                    <Link href="/vulnerability" className="info">
                      i
                    </Link>
                  </h3>
                  <div className="flex items-center gap-4 text-[20px] my-8">
                    <VulnerabilityDot
                      type={activePDO.vulneral.Vulnerability}
                      className="block m-0 w-8 h-8"
                    />
                    <span className="block capitalize font-bold">
                      {activePDO.vulneral.Vulnerability.startsWith("high")
                        ? "high"
                        : activePDO.vulneral.Vulnerability}{" "}
                    </span>
                  </div>
                  <span className="mt-6 text-[16px] leading-[150%] block text-white font-medium mb-4">
                    {activePDO.pdoname}{" "}
                    {activePDO.vulneral.Vulnerability === "low"
                      ? `is at low risk due to its ${activePDO.vulneral.ExposureTxt} exposure, ${activePDO.vulneral.SensitivityTxt} sensitivity and its ${activePDO.vulneral.AdaptiveTxt} adaptive capacity.`
                      : activePDO.vulneral.Vulnerability === "moderate"
                      ? `is at moderate risk due to its ${activePDO.vulneral.ExposureTxt} exposure, ${activePDO.vulneral.SensitivityTxt} sensitivity and ${activePDO.vulneral.AdaptiveTxt} adaptive capacity.`
                      : activePDO.vulneral.Vulnerability ===
                        "high (low-mod Exposure)"
                      ? `is at high risk due to its ${activePDO.vulneral.ExposureTxt} exposure, high sensitivity and low adaptive capacity.`
                      : activePDO.vulneral.Vulnerability ===
                        "high (low-mod Sensitivity)"
                      ? `is at high risk due to its high exposure ${activePDO.vulneral.SensitivityTxt} sensitivity and low adaptive capacity.`
                      : activePDO.vulneral.Vulnerability ===
                        "high (mod-high Adapt. capacity)"
                      ? `is at high risk due to its high exposure and sensitivity and its ${activePDO.vulneral.AdaptiveTxt} adaptive capacity.`
                      : activePDO.vulneral.Vulnerability === "very high"
                      ? "is at very high risk due to its high exposure and sensitivity and low adaptive capacity."
                      : ""}
                  </span>

                  <hr className="my-6" />
                  <h3 className="text-[18px] font-medium mb-4">
                    Exposure & Sensitivity
                  </h3>
                  <div className="flex gap-8 mb-4 justify-center">
                    <Pie
                      percentage={activePDO.vulneral.Exposure}
                      label="Exposure"
                    />
                    <Pie
                      percentage={activePDO.vulneral.Sensitivity}
                      label="Sensitivity"
                    />
                  </div>
                  <span className="text-[14px] leading-[140%] block text-white/80 mb-2">
                    {activePDO.vulneral.Exposure < 0.62 ? ( // low
                      <>
                        Wine regions with a <b>low level of exposure</b> are
                        expected to experience limited changes in climatic
                        conditions in comparison to the other European PDO
                        regions. This means they are less likely to face changes
                        in grape quality and yields. Depending on their
                        sensitivity, these regions may maintain their
                        traditional wine production with fewer adaptations.
                      </>
                    ) : activePDO.vulneral.Exposure < 0.75 ? ( // moderate
                      <>
                        Regions with <b>moderate exposure</b> will experience
                        moderate climate change compared to other European PDO
                        regions. Depending on their sensitivity, they may need
                        to implement more extensive adaptation strategies than
                        less exposed regions to cope with the evolving
                        conditions.
                      </>
                    ) : (
                      <>
                        <b>Highly exposed</b> regions are projected to undergo
                        the most singificant climatic shifts of all European PDO
                        regions. These areas are likely to require extensive
                        adaptation measures to mantain viticulture, which also
                        need to take into account their sensitivity, such as
                        relocation of vineyards or revision of traditional
                        winegrowing practices.
                      </>
                    )}
                    {/* <b>Exposure</b> measures the degree of climate change in a
                    region based on a set of bioclimatic variables tailored to
                    viticulture. The stronger the changes in climatic conditions
                    between the future (2071-2100) and the past (1981-2010), the
                    higher the exposure. */}
                  </span>
                  <span className="text-[14px] leading-[140%] block text-white/80 mb-2">
                    {activePDO.vulneral.Sensitivity < 0.55 ? (
                      <>
                        Regions with <b>low levels of sensitivity</b> have grape
                        varieties that are far from the upper limit of their
                        traditional climatic range compared to other European
                        PDO regions. They are therefore less affected by
                        climate-related stimuli and may even benefit from
                        certain aspects of climate change, such as increased
                        sugar content in grapes.
                      </>
                    ) : activePDO.vulneral.Sensitivity < 0.72 ? (
                      <>
                        Regions of <b>medium sensitivity</b> have grape
                        varieties that are somewhat closer to the upper limit of
                        their climatic range compared to the other European PDO
                        regions. These areas will be moderately affected by a
                        change in climatic conditions and, in the event of
                        increased exposure levels, may need to consider gradual
                        changes in grape composition and wine style to maintain
                        the identity of their PDO products.
                      </>
                    ) : (
                      <>
                        <b>Highly sensitive</b> regions are closest to the upper
                        limit of their varietal climate range of all European
                        PDO regions. They are highly susceptible to
                        climate-related stimuli and are likely to experience
                        changes in grape composition and wine characteristics
                        even at lower levels of exposure, requiring timely and
                        innovative adaptation strategies.
                      </>
                    )}
                    {/* <b>Sensitivity</b> describes how a region is affected by
                    climate change. It is based on the abundance and diversity
                    of cultivated varieties within a region combined with their
                    climatic requirements. Impacts of changing climatic
                    conditions are stronger in regions with a high sensitivity. */}
                  </span>

                  <hr className="my-6" />
                  <h3 className="text-[18px] font-medium mb-4">
                    Adaptive Capacity
                  </h3>
                  <Pie
                    percentage={activePDO.vulneral.adaptiveCap}
                    label="Adaptive Capacity"
                  />
                  <span className="mt-4 text-[14px] leading-[140%] block text-white/80 mb-4">
                    {activePDO.vulneral.adaptiveCap < 0.38 ? (
                      <>
                        Wine regions with a <b>low adaptive capacity</b> have
                        limited resources to implement adaptation strategies
                        compared to the other European PDO regions. When faced
                        with negative impacts, they may find it difficult to
                        adapt due to the limited resources avaialable.
                      </>
                    ) : activePDO.vulneral.adaptiveCap < 0.55 ? (
                      <>
                        Regions with a <b>medium adaptive capacity</b> have
                        moderate resources available for adaptation compared to
                        the other European PDO regions. However, they may still
                        face challenges in fully addressing the impacts of
                        climate change. They will need to carefully plan and
                        implement adaptation strategies to avoid potential
                        negative impacts.
                      </>
                    ) : (
                      <>
                        <b>High adaptive capacity</b> regions are well-equipped
                        with resources to adapt to climate change compared to
                        the other European PDO regions. They have the potential
                        to implement comprehensive adaptation strategies, such
                        as expanding irrigation systems or moving vineyards to
                        higher elevations, in order to maintain high-quality
                        wine production.
                      </>
                    )}
                    {/* <b>Adaptive Capacity</b> refers to how a region can adapt to
                    climate change. As such it includes a range of different
                    factors, from biophysical to socioeconomic aspects. A higher
                    adaptive capacity indicates an increased availability of
                    resources for adaptation within a region. */}
                  </span>

                  <span className="block mb-4 mt-2">
                    Adaptive Capacity in detail
                  </span>
                  <AdaptiveChart data={activePDO.vulneral} />

                  {/* <span className="mt-4 text-[14px] leading-[140%] block text-white/80 mb-2">
                    <b>Financial dimension</b> describing the financial
                    situation of farms specialized on viticulture in a region
                  </span>
                  <span className="text-[14px] leading-[140%] block text-white/80 mb-2">
                    <b>Natural dimension</b> reflecting the topoclimatic
                    diversity within a region
                  </span>
                  <span className="text-[14px] leading-[140%] block text-white/80 mb-2">
                    <b>Physical dimension</b> describing the presence of
                    infrastructure and physical assets for viticulture
                  </span>
                  <span className="text-[14px] leading-[140%] block text-white/80 mb-2">
                    <b>Social and human dimensions</b> which are related to
                    population characteristics, such as age structure or
                    employment, and education as well as available labour force
                    within the wine regions.
                  </span> */}
                </div>
              )}
              <hr className="mt-12 mb-12" />

              {activePDO?.country && (
                <p>
                  <Image
                    src={countryIcon}
                    alt="Country"
                    width={35}
                    height={35}
                    className="inline"
                  />
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
                    className="inline"
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
                <Image
                  src={pdoIcon}
                  alt="PDO Id"
                  width={35}
                  height={35}
                  className="inline"
                />
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
                    className="inline"
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
                    className="inline"
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
                    className="inline"
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
                    className="inline"
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
                    className="inline"
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
                  <Image
                    src={infoIcon}
                    alt="Info"
                    width={35}
                    height={35}
                    className="inline"
                  />

                  <a
                    href={activePDO?.["pdoinfo"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    More info on{" "}
                    <span style={{ textDecoration: "underline" }}>
                      eAmbrosia
                    </span>
                  </a>
                </p>
              )}
            </div>
          </div>
        </Suspense>
      )}
      <div className={styles.filterBar}>
        {/* <header className={styles.header}>
          <Link
            href="/"
            className={`${styles.frontpageLink} pb-[3px]`}
            onClick={() => onClearFilter()}
          >
            WINEMAP by
          </Link>
          <a href="https://www.eurac.edu" className="pb-[3px]">
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
        </header> */}

        <Suspense fallback={<div>Loading...</div>}>
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
                (option?.value ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
              dropdownMatchSelectWidth={290}
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
              dropdownMatchSelectWidth={290}
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
            />
            <button
              className="px-4 py-1 flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black "
              onClick={() => onClearFilter()}
            >
              reset
            </button>
          </div>
          <div className="flex items-center mt-5 gap-3">
            {vulnerabilityVisibility ? (
              <Link
                onClick={() => onClearFilter()}
                href="?vulnerability=false"
                className="px-4 py-1 inline-flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black"
              >
                exit climate mode
              </Link>
            ) : (
              <Link
                href="?vulnerability=true"
                className="px-4 py-1 inline-flex h-[30px] border leading-1 text-[13px] border-white rounded-[20px] cursor-pointer items-center justify-center transition duration-300 hover:bg-white hover:text-black"
              >
                enter climate mode
              </Link>
            )}

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
          </div>
          {vulnerabilityVisibility && (
            <div className="vulnerabilityLegend flex flex-col lg:flex-row gap-6">
              <div className="uppercase flex font-bold items-center gap-2 ">
                Vulnerability Index{" "}
                <Link href="/vulnerability" className="info">
                  i
                </Link>
              </div>

              <div className=" ">
                <Radio.Group
                  onChange={onVulneralFilter}
                  style={{
                    borderRadius: "0",
                    display: "flex",

                    margin: "0 auto",
                  }}
                >
                  <Radio.Button
                    value="low"
                    style={{
                      background: "#97BE6C",
                    }}
                  >
                    Low
                    <svg
                      width="26"
                      height="23"
                      viewBox="0 0 26 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="vul-indicator-arrow"
                    >
                      <path
                        d="M2.6077 21L13 3L23.3923 21H2.6077Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </svg>
                  </Radio.Button>
                  <Radio.Button
                    value="moderate"
                    style={{
                      background: "#E8C360",
                    }}
                  >
                    Moderate
                    <svg
                      width="26"
                      height="23"
                      viewBox="0 0 26 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="vul-indicator-arrow"
                    >
                      <path
                        d="M2.6077 21L13 3L23.3923 21H2.6077Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </svg>
                  </Radio.Button>
                  <Radio.Button
                    value="high"
                    style={{
                      background: "#DD7C75",
                    }}
                  >
                    High
                    <svg
                      width="26"
                      height="23"
                      viewBox="0 0 26 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="vul-indicator-arrow"
                    >
                      <path
                        d="M2.6077 21L13 3L23.3923 21H2.6077Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </svg>
                  </Radio.Button>
                  <Radio.Button
                    value="very high"
                    style={{
                      background: "#DE1355",
                    }}
                  >
                    Very high
                    <svg
                      width="26"
                      height="23"
                      viewBox="0 0 26 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="vul-indicator-arrow"
                    >
                      <path
                        d="M2.6077 21L13 3L23.3923 21H2.6077Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </svg>
                  </Radio.Button>
                  <Radio.Button
                    value="all"
                    className="viewAllvul"
                    style={{
                      background: "transparent",
                    }}
                  >
                    {" "}
                    show all
                  </Radio.Button>
                </Radio.Group>
              </div>
              {/* <div className="legend-bar">
                <div
                  className="legend-row cursor-pointer bg-[#97BE6C] hover:bg-[#97BE6C]/80"
                  onClick={() => onVulneralFilter("low")}
                >
                  <div className="legend-text">Low</div>
                </div>
                <div
                  className="legend-row cursor-pointer bg-[#E8C360] hover:bg-[#E8C360]"
                  onClick={() => onVulneralFilter("moderate")}
                >
                  <div className="legend-text">Moderate</div>
                </div>
                <div
                  className="legend-row cursor-pointer bg-[#DD7C75] hover:bg-[#DD7C75]"
                  onClick={() => onVulneralFilter("high")}
                >
                  <div className="legend-text">High</div>
                </div>
                <div
                  className="legend-row cursor-pointer bg-[#DE1355] hover:bg-[#DE1355]"
                  onClick={() => onVulneralFilter("very high")}
                >
                  <div className="legend-text">Very High</div>
                </div>
              </div> */}
            </div>
          )}
        </Suspense>
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
