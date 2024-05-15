import { text } from "stream/consumers";
import React from "react";
import ReactECharts from "echarts-for-react";

import type { VulnerabilityType } from "../page";

export default function AdaptiveChart(props: { data: VulnerabilityType }) {
  const option = {
    dataset: {
      source: [
        ["score", "type"],
        [Math.round(props.data.human * 100), "Human"],
        [Math.round(props.data.social * 100), "Social"],
        [Math.round(props.data.physical * 100), "Physical"],
        [Math.round(props.data.natural * 100), "Natural"],
        [Math.round(props.data.financial * 100), "Financial"],
      ],
    },
    xAxis: {
      type: "value",
      max: 100,
      axisLabel: {
        color: "#eee",
      },
    },
    yAxis: {
      type: "category",
      alignTicks: true,
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "#eee",
      },
    },
    grid: { top: 10, right: 10, bottom: 40, left: 0, containLabel: true },
    // tooltip: {
    //   trigger: "axis",
    //   axisPointer: {
    //     type: "shadow",
    //   },
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        console.log(params[0]);
        const text =
          params[0]?.value[1] === "Financial"
            ? "describing the financial situation of farms specialized on viticulture in a region"
            : params[0]?.value[1] === "Natural"
            ? "reflecting the topoclimatic diversity within a region"
            : params[0]?.value[1] === "Physical"
            ? "describing the presence of infrastructure and physical assets for viticulture"
            : params[0]?.value[1] === "Social"
            ? "which are related to population characteristics, such as age structure or employment, and education as well as available labour force within the wine regions."
            : "which are related to population characteristics, such as age structure or employment, and education as well as available labour force within the wine regions.";

        return `<strong>${params[0]?.value[1]} dimension</strong><br/>
        <span style="width: 150px; display: block; font-size: 12px; text-wrap: wrap; line-height: 120%">${text}</span>
          <span style="font-weight: bold">${params[0].marker} ${params[0]?.value[0]}</span>
        `;
      },
    },

    legend: {
      itemStyle: {
        color: "#fff",
      },
    },
    visualMap: {
      orient: "horizontal",
      left: "center",
      min: 0,
      max: 100,
      text: ["Good", "Bad"],
      textStyle: {
        color: "#fff",
        fontSize: 10,
      },
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#F51C1C", "#FF6D31", "#F5DA5C", "#4FF47C"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "score",
          // Map the "product" column to Y axis
          y: "type",
        },
        // itemStyle: {
        //   color: "hsl(338, 96%, 38%)",
        // },
      },
    ],
  };

  return (
    <div className="adaptiveChart">
      <ReactECharts
        option={option}
        style={{ height: "200px" }}
        opts={{ renderer: "svg" }} // use svg to render the chart
      />
    </div>
  );
}
