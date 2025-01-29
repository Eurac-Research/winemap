import React from "react";
import ReactECharts from "echarts-for-react";

import type { VulnerabilityType } from "../page";

/**
 * AdaptiveChart component renders a bar chart using the provided vulnerability data.
 *
 * @param props - The properties object.
 * @param props.data - The vulnerability data of type VulnerabilityType.
 *
 * The chart displays different dimensions of vulnerability (Human, Social, Physical, Natural, Financial)
 * with their respective scores. The tooltip provides detailed descriptions for each dimension.
 *
 * The chart configuration includes:
 * - A dataset with scores and types.
 * - X-axis as a value axis with a maximum of 100.
 * - Y-axis as a category axis with aligned ticks and labels.
 * - A grid layout with specified margins.
 * - A tooltip that triggers on axis hover and provides detailed descriptions for each dimension.
 * - A legend with customized item styles.
 * - A visual map that maps the score column to color, with a gradient from "Bad" to "Good".
 * - A bar series that encodes the score to the X-axis and the type to the Y-axis.
 *
 * The chart is rendered using the ReactECharts component with SVG renderer and a fixed height of 200px.
 *
 * @returns A JSX element containing the configured bar chart.
 */
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
        const text =
          params[0]?.value[1] === "Financial"
            ? "The Financial dimension is related to economic readiness and viability. Indicators consider the debt ratio of wine farms, return on assets for profitability, and subsidy dependence for financial sustainability in climate adaptation."
            : params[0]?.value[1] === "Natural"
            ? "The Natural dimension addresses climate adaptation through natural resources. Indicators assess potential areas for shifts of viticultural areas, water availability for irrigation needs, and temperature variability to support diverse grape varieties."
            : params[0]?.value[1] === "Physical"
            ? "The Physical dimension focuses on infrastructure and mechanization. Indicators include road length for access to vineyards, mechanization index for the value of farm equipment, and naturalness, which indicates the role of natural areas in pest control."
            : params[0]?.value[1] === "Social"
            ? "The Social dimension reflects demographic trends and challenges. Indicators measure age and dependency ratios within the population and population density, highlighting the movement of young people, socioeconomic burdens, and urban-rural dynamics."
            : params[0]?.value[1] === "Human"
            ? "The Human dimension evaluates workforce and knowledge resources. Indicators look at the availability of farm labour force, the level of education of farm managers, and the proximity to wine research centres for innovation and adaptation."
            : "";

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
        color: ["#DE1355", "#DD7C75", "#E8C360", "#97BE6C"],
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
