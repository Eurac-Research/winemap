import Head from "next/head";
import {
  useState,
  useCallback,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useMemo,
  useRef,
  useEffect,
} from "react";

import styles from "../styles/Home.module.scss";
import { Map as ReactMap } from "react-map-gl";
import type { MapboxStyle, MapRef, MapLayerMouseEvent } from "react-map-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "../components/geocoder";

import { Select } from "antd";

import data from "./data/PDO_EU_id.json";
import allPDOPoints from "./data/pdo-points.json";
// {
//   "country": "Country",
//   "pdoid": "PDOid",
//   "pdoname": "PDOnam",
//   "registration": "Registration",
//   "category": "Category_of_wine_product",
//   "varieties-oiv": "Varieties_OIV",
//   "varieties": "Varieties_Other",
//   "max-yield-hl": "Maximum_yield_hl",
//   "max-yield-kg": "Maximum_yield_kg",
//   "min-planting-density": "Minimum_planting_density",
//   "irrigation": "Irrigation",
//   "amendment": "Amendment",
//   "pdoinfo": "PDOinfo",
//   "munic": "Municip_nam",
//   "begin-lifes": "begin_lifes"
// },

import { useRouter } from "next/router";
import bbox from "@turf/bbox";

export interface JSONObject {
  country: string;
  pdoid: string;
  pdoname: string;
  registration: string;
  category: string;
  "varieties-oiv": string;
  varieties: string;
  "max-yield-hl": string;
  "max-yield-kg": string;
  "min-planting-density": string;
  irrigation: string;
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

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("router changed");
  }, [router.query.cat]);

  const [hoverInfo, setHoverInfo] = useState<{
    count: number;
    feature: string[];
    x: number;
    y: number;
  }>();
  const [clickInfo, setClickInfo] = useState<{
    feature: string[];
  }>();

  const [pdos, setPdos] = useState<JSONObject[] | null>(null);
  const [activePDO, setActivePDO] = useState<JSONObject | null>(null);

  const [selectValue, setSelectValue] = useState(null);

  const mapRef = useRef<MapRef>();

  async function openDetail(id: string) {
    const PDO = data.filter((i: { pdoid: any }) => id === i.pdoid);
    console.log("PDO", PDO);
    setActivePDO(PDO[0]);
  }

  async function getPDONameById(
    id:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined
  ) {
    const PDO = data.filter((i: { pdoid: any }) => id === i.pdoid);
    console.log("PDO", PDO);

    //return PDO[0].pdoname;
  }

  const onSearchChange = (value: string) => {
    console.log(`selected ${value}`);
    router.push(`/?cat=${value}`, undefined, { shallow: true });
  };

  const onSelectPdoNameChange = (value: string) => {
    //console.log(`selected ${value}`);
    //console.log(`router query ${JSON.stringify(router.query)}`);
    router.push(`/?pdoname=${value}`, undefined, { shallow: true });
    setActivePDO(null);
    setSelectValue(value);
    getPdoIDsByPdoName(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Data Structures
  // categoryMap: key: category, value: item[]
  // pdoMap: key: pdoname, value: item
  //

  // uniq varities -> set
  // uniq category -> set

  const allData = [];

  // ...
  // {
  //   "country": "AT",
  //   "pdoid": "PDO-AT-A0205",
  //   "pdoname": "Wachau",
  //   "registration": "1996-11-15",
  //   "category": [quality sparkling wine, wine]
  //   "varieties-oiv": [Blauburger N, Blauer Burgunder N/Blauer Portugieser N/Blauer Wildbacher N/Blaufränkisch N/Bouvier B/Cabernet Franc N/Cabernet Sauvignon N/Chardonnay B/Frühroter Veltliner B/Furmint B/Gelber Muskateller B/Goldburger B/Grauer Burgunder B/Grüner Veltliner B/Jubiläumsrebe Rg/Merlot N/Muskat Ottonel B/Müller Thurgau B/Neuburger B/Roesler N/Roter Vetliner B/Rotgipfler B/Ráthay N/Sankt Laurent N/Sauvignon Blanc B/Scheurebe B/Sylvaner B/Syrah N/Weißer Riesling B/Welschriesling B/Zierfandler Rs/Zweigelt N",
  //   "varieties": "Traminer B/Weißer Burgunder B",
  //   "max-yield-hl": 67.5,
  //   "max-yield-kg": 9000,
  //   "min-planting-density": "na",
  //   "irrigation": "na",
  //   "amendment": "No",
  //   "pdoinfo": "https://ec.europa.eu/info/food-farming-fisheries/food-safety-and-quality/certification/quality-labels/geographical-indications-register/details/3801",
  //   "munic": "Aggsbach/Bergern Im Dunkelsteinerwald/Dürnstein/Mautern An Der Donau/Mühldorf/Rossatz-Arnsdorf/Spitz/Weißenkirchen In Der Wachau",
  //   "begin-lifes": "04/11/2021"
  // },
  // ...
  // uniq set variteis
  // uniq set categories

  // alldata.filter(item => category.filter(c === "ss"))

  // unique varieties via Set
  const varMap = new Map();
  const uniqVar = new Set();
  data.forEach((item) => {
    const varieties = item.varieties.split("/");
    varieties.forEach((v) => uniqVar.add({ value: v, label: v }));
    varMap.set(item.pdoid, varieties);
  });

  //console.log("varMap", varMap);
  //console.log("uniqVar", uniqVar);

  // unique PDONames
  // function uniq(arr: any[], element: string) {
  //   let result = {};
  //   arr.map((el: { [x: string]: string | number }) => {
  //     result[el[element]] = el;
  //   });
  //   return Object.values(result);
  // }
  // const uniqueNames = uniq(data, "pdoname");

  // unique PDONames
  const uniquePdonames = [...new Set(data.map((item) => item.pdoname))];
  let selectPdonames = uniquePdonames.sort().map((pdoName) => {
    let object = {
      label: pdoName,
      value: pdoName,
    };
    return object;
  });
  //console.log("selectPdonames", selectPdonames);

  //const varietiesMap = new Map();
  const varieties = data.map((item) => item.varieties.split("/"));
  let uniqueVarieties = [...new Set(varieties.flat())];
  //console.log("uniqueVarieties", uniqueVarieties);
  let selectVarieties = uniqueVarieties.sort().map((varietyName) => {
    // use this to select pdoids by variety after user selectd a variety

    // let pdoIDs = data.filter((pdoItem) =>
    //   pdoItem["varieties-oiv"].includes(varietyName)
    // );
    // console.log("pdoIDs", pdoIDs);

    // let pdoIDsByVariety = pdoIDs.map((id) => id.pdoid);
    // console.log("pdoIDsByVariety", pdoIDsByVariety);

    let object = {
      label: varietyName,
      value: varietyName,
    };

    return object;
  });
  // console.log("selectVarieties", selectVarieties);

  //const categoriesMap = new Map();
  const categories = data.map((item) => item.category.split("/"));
  let uniqueCategories = [...new Set(categories.flat())];
  //console.log("uniqueCategories", uniqueCategories);
  let selectCategories = uniqueCategories.sort().map((categoryName) => {
    let object = {
      label: categoryName,
      value: categoryName,
    };

    return object;
  });
  //console.log("selectCategories", selectCategories);

  //unique varieties via Map
  // const varietiesMap = data.map((item) => item.varieties.split("/"));
  // map.set("1", "pdoid");

  // result should be {"Chardonnay", [pdoid1, pdoid7, pdoid99]}

  const onHover = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    // console.log("features", features)
    const hoveredFeature =
      features &&
      features.map((feature) => {
        // console.log("feature", feature)
        return feature?.properties?.PDOid ? feature?.properties?.PDOid : null;
      });
    // console.log("hoverfeature", hoveredFeature)

    if (hoveredFeature && hoveredFeature.length) {
      setHoverInfo({
        count: hoveredFeature.length,
        feature: hoveredFeature,
        x,
        y,
      });
    }
  }, []);

  const onOut = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
    setHoverInfo(undefined);
  }, []);
  // console.log("hoverInfo", hoverInfo)

  const onClick = useCallback(async (event: mapboxgl.MapLayerMouseEvent) => {
    const { features } = event;
    // console.log("features", features);
    const overlappingPDOs =
      features &&
      features.map((f) => {
        return f?.properties?.PDOid;
      });
    //console.log("overlappingPDOs", overlappingPDOs);
    // setClickInfo(clickedFeatures);
    // const selected = clickedFeature ? clickedFeature?.properties?.PDOid : null;
    //console.log("clickInfo", clickInfo);
    //console.log("data in onclick", data);

    if (overlappingPDOs && overlappingPDOs?.length > 1) {
      /* destroy active PDO */
      setActivePDO(null);
      /* get list of overlapping PDOs */
      return getListData(overlappingPDOs);
    }
    /* click on non-overlapping single PDO */
    overlappingPDOs && openDetail(overlappingPDOs[0]);
  }, []);

  const onClose = useCallback(async (event: any) => {
    setClickInfo(undefined);
  }, []);

  const onClearFilter = useCallback(async (event: any) => {
    mapRef.current &&
      mapRef.current
        .getMap()
        .setFilter("pdo-area", null)
        .setCenter([9, 46])
        .zoomTo(6, {
          duration: 1000,
          offset: [100, 50],
        });
    setActivePDO(null);
    setSelectValue(null);
  }, []);

  async function getListData(overlappingPDOs: any[] | undefined) {
    const PDOList = overlappingPDOs?.map((item: any) => {
      return data.filter((i: { pdoid: any }) => item === i.pdoid);
    });
    const flattenPDOS = PDOList?.flat();
    setPdos(flattenPDOS);
  }

  // console.log(
  //   "map.getSource pdo-new1-c4cnbv",
  //   mapRef.current && mapRef.current.getSource("composite")
  // );
  // console.log(
  //   "map.getSource('composite').vectorLayerIds",
  //   mapRef.current && mapRef.current.getSource("composite").vectorLayerIds
  // );

  async function getPdoIDsByPdoName(pdoname: string) {
    const PDOList = data.filter((i) => pdoname === i.pdoname);
    console.log("PDOList", PDOList);
    const showIDs = PDOList.map((item) => {
      return item.pdoid;
    });
    console.log("showIDs", showIDs);

    // open sidebar and show details
    openDetail(showIDs[0]);

    const clearFilter =
      mapRef.current && mapRef.current.getMap().setFilter("pdo-area", null);
    // try to simply zoom out in order to have all features visible for queryRenderedFeatures ... querySourceFeatures would be better
    const ZoomOut =
      mapRef.current &&
      mapRef.current.zoomTo(5, {
        duration: 1000,
        offset: [100, 50],
      });

    // const featuresAll =
    //   mapRef.current &&
    //   mapRef.current.queryRenderedFeatures({ layers: ["pdo-pins"] });

    // Find all features in one source layer in a vector source
    // const featuresAll =
    //   mapRef.current &&
    //   mapRef.current.querySourceFeatures("composite", {
    //     sourceLayer: "pdo-new2-8vt1fa",
    //   });

    // console.log("featuresAll", featuresAll);

    // map.querySourceFeatures("composite", {
    //   sourceLayer: "akkerman",
    // });

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
        ]);

    const filteredFeatures = allPDOPoints.features?.filter(
      (item: { properties: { PDOid: string } }) =>
        item?.properties?.PDOid === showIDs[0]
    );

    console.log("filteredFeatures", filteredFeatures);

    // map.flyTo({center: [0, 0], zoom: 9});

    if (filteredFeatures) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(filteredFeatures[0]);

      mapRef.current &&
        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 40, duration: 1000, maxZoom: 10 }
        );
    }
  }

  /* RETURN */

  return (
    <div className={styles.container}>
      <Head>
        <title>Winemap</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReactMap
        ref={mapRef}
        minZoom={3}
        initialViewState={{
          latitude: 46,
          longitude: 9,
          zoom: 6,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/tiacop/clas8a92e003c15o2bpopdfqt"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[
          "pdo-area",
          "pdo-pins",
        ]} /* defined in mapbox studio */
        onMouseMove={onHover}
        onMouseLeave={onOut}
        onClick={onClick}
      >
        <GeocoderControl
          mapboxAccessToken={MAPBOX_TOKEN!}
          position="top-right"
        />
      </ReactMap>

      {hoverInfo && (
        <div
          className="tooltip"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          {hoverInfo.count > 1 && <div>{hoverInfo.count} overlapping PDOs</div>}
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
              index: any
            ) => {
              return (
                <div key={f + index}>
                  {hoverInfo.count > 1 ? <>{f}</> : <>{getPDONameById(f)}</>}
                </div>
              );
            }
          )}
        </div>
      )}

      {pdos && !activePDO && (
        <div className={styles.contentFrame}>
          <header>
            <span>WINEMAP by</span>
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
          </header>
          {pdos.length > 1 && <div>{pdos.length} overlapping PDOs</div>}

          {pdos.map((pdo) => (
            <div
              key={pdo?.pdoid}
              className={styles.PDOlistitem}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                openDetail(pdo?.pdoid)
              }
            >
              <h2>{pdo?.pdoname}</h2>
              Registration: {pdo?.registration}
              <br />
              Category: {pdo?.category} <br />
              Varieties OIV: {pdo?.["varieties-oiv"]} <br />
            </div>
          ))}
        </div>
      )}

      {activePDO && (
        <div className={styles.contentFrame}>
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
          <div className={styles.PDOdetail}>
            <h2>{activePDO.pdoname}</h2>
            Registration: {activePDO?.registration}
            <br />
            Category: {activePDO?.category} <br />
            Varieties OIV: {activePDO?.["varieties-oiv"]} <br />
          </div>
        </div>
      )}

      <div className={styles.filterBar}>
        <Select
          showSearch
          placeholder="Select a PDO Name"
          style={{ width: 200 }}
          // disabled={true}
          // allowClear={true}
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
          placeholder="Select category"
          style={{ width: 200 }}
          optionFilterProp="children"
          onChange={onSearchChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{ label: "label", value: "value" }}
          options={selectCategories}
        />

        <Select
          showSearch
          placeholder="Select variety"
          style={{ width: 200 }}
          optionFilterProp="children"
          onChange={onSearchChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{ label: "label", value: "value" }}
          options={selectVarieties}
        />
        <button onClick={onClearFilter}>clear</button>
      </div>
    </div>
  );
}
