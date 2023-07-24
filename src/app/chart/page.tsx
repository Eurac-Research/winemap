"use client";

// import { ReactECharts, ReactEChartsProps } from "../echart/page";
import React, {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

import jsondata from "@/app/data/PDO_EU_id.json";
import allCountries from "@/app/data/countryCodesFromDataHub.io.json";
import data from "@/app/data/life.json";

type EChartsOption = echarts.EChartsOption;

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
  const chartRef = useRef<ReactECharts>(null);

  // unique PDONames for select
  // const uniquePdonames = [...new Set(jsondata.map((item) => item.pdoname))];
  // let selectPdonames = uniquePdonames.sort().map((pdoName) => {
  //   let object = {
  //     label: pdoName,
  //     value: pdoName,
  //   };
  //   return object;
  // });

  // const pdosByCountry = {};

  // const uniquePdoCountries = [...new Set(jsondata.map((item) => item.country))];
  // console.log("uniquePdoCountries", uniquePdoCountries.length);

  // const uniqueYear = [
  //   ...new Set(jsondata.map((item) => item?.registration?.slice(0, 4))),
  // ];
  // console.log("uniqueYear", uniqueYear.sort());

  // uniqueYear.forEach((year) => {
  //   const filteredByYear = data.filter(
  //     (i) => year === i?.registration?.slice(0, 4),
  //   );
  //   filteredByYear.sort().map((item) => {
  //     const filterByCountry = filteredByYear.filter(
  //       (i) => item.country === i?.country,
  //     );

  //     filterByCountry.sort().map((i) => {
  //       let object = {
  //         year: i?.registration?.slice(0, 4),
  //         country: i.country,
  //         countPerYear: filterByCountry.length,
  //       };
  //       console.log("object", object);

  //       return object;
  //     });
  //   });
  // });

  // unique countries for select
  // const country = jsondata.map((item) => item.country);
  // let uniqueCountry = [...new Set(country.flat())];

  // // ordered by countryName ... does not return a defined object but the filtered countries, aka: {name: "bla", code: "bla"}
  // let selectCountry = allCountries.filter((country) => {
  //   for (const cc of uniqueCountry) {
  //     if (cc === country.code) {
  //       return cc;
  //     }
  //   }
  // });

  // echarts

  const updateFrequency = 2000;
  const dimension = 0;

  const countryColors: Record<string, string> = {
    Australia: "#00008b",
    Canada: "#f00",
    China: "#ffde00",
    Cuba: "#002a8f",
    Finland: "#003580",
    France: "#ed2939",
    Germany: "#000",
    Iceland: "#003897",
    India: "#f93",
    Japan: "#bc002d",
    "North Korea": "#024fa2",
    "South Korea": "#000",
    "New Zealand": "#00247d",
    Norway: "#ef2b2d",
    Poland: "#dc143c",
    Russia: "#d52b1e",
    Turkey: "#e30a17",
    "United Kingdom": "#00247d",
    "United States": "#b22234",
  };
  const years: string[] = [];
  for (let i = 0; i < data.length; ++i) {
    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
      years.push(data[i][4]);
    }
  }

  // function getFlag(countryName: string) {
  //   if (!countryName) {
  //     return '';
  //   }
  //   return (
  //     flags.find(function (item) {
  //       return item.name === countryName;
  //     }) || {}
  //   ).emoji;
  // }
  let startIndex = 10;
  let startYear = years[startIndex];

  const DEFAULT_OPTION = {
    grid: {
      top: 10,
      bottom: 30,
      left: 150,
      right: 80,
    },
    xAxis: {
      max: "dataMax",
      axisLabel: {
        formatter: function (n: number) {
          return Math.round(n) + "";
        },
      },
    },
    dataset: {
      source: data.slice(1).filter(function (d: string[]) {
        return d[4] === startYear;
      }),
    },
    yAxis: {
      type: "category",
      inverse: true,
      max: 10,
      axisLabel: {
        show: true,
        fontSize: 14,
        rich: {
          flag: {
            fontSize: 25,
            padding: 5,
          },
        },
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: "column",
        type: "bar",
        itemStyle: {
          color: function (param) {
            return countryColors[(param.value as number[])[3]] || "#5470c6";
          },
        },
        encode: {
          x: dimension,
          y: 3,
        },
        label: {
          show: true,
          precision: 1,
          position: "right",
          valueAnimation: true,
          fontFamily: "monospace",
        },
      },
    ],
    // Disable init animation.
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
    graphic: {
      elements: [
        {
          type: "text",
          right: 160,
          bottom: 60,
          style: {
            text: startYear,
            font: "bolder 80px monospace",
            fill: "rgba(100, 100, 100, 0.25)",
          },
          z: 100,
        },
      ],
    },
  };

  const [option, setOption] = useState(DEFAULT_OPTION);

  useEffect(() => {
    for (let i = startIndex; i < years.length - 1; ++i) {
      (function (i) {
        setTimeout(function () {
          updateYear(years[i + 1]);
        }, (i - startIndex) * updateFrequency);
      })(i);
    }
  }, [option]);

  function updateYear(year: string) {
    let source = data.slice(1).filter(function (d: string[]) {
      return d[4] === year;
    });

    (option as any).series[0].data = source;
    (option as any).graphic.elements[0].style.text = year;
    console.log("option", option);
    chartRef.current && chartRef.current.getEchartsInstance().setOption(option);
  }

  /* RETURN */
  return (
    <>
      hallo
      <div style={{ height: "50vh" }}>
        <ReactECharts option={option} notMerge={true} ref={chartRef} />
      </div>
    </>
  );
}
