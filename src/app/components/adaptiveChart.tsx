import React from "react";
import ReactECharts from "echarts-for-react";

import type { VulnerabilityType } from "../page";

export default function AdaptiveChart(props: { data: VulnerabilityType }) {
  const option = {
    dataset: {
      source: [
        ["score", "type"],
        [props.data.financial, "financial"],
        [props.data.natural, "natural"],
        [props.data.physical, "physical"],
        [props.data.social, "social"],
        [props.data.human, "human"],
      ],
    },
    xAxis: {
      type: "value",
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      itemStyle: {
        color: "#fff",
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
        itemStyle: {
          color: "hsl(338, 96%, 38%)",
        },
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
