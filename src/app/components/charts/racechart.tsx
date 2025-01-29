import React from "react";
import ReactECharts from "echarts-for-react";

const Chart: React.FC = () => {
  /**
   * Configuration object for a stacked area chart.
   *
   * @property {Object} title - The title configuration for the chart.
   * @property {string} title.text - The text of the chart title.
   *
   * @property {Object} tooltip - The tooltip configuration for the chart.
   * @property {string} tooltip.trigger - The trigger type for the tooltip.
   *
   * @property {Object} legend - The legend configuration for the chart.
   * @property {string[]} legend.data - The data series names to be displayed in the legend.
   *
   * @property {Object} toolbox - The toolbox configuration for the chart.
   * @property {Object} toolbox.feature - The features available in the toolbox.
   * @property {Object} toolbox.feature.saveAsImage - The save as image feature configuration.
   *
   * @property {Object} grid - The grid configuration for the chart.
   * @property {string} grid.left - The left margin of the grid.
   * @property {string} grid.right - The right margin of the grid.
   * @property {string} grid.bottom - The bottom margin of the grid.
   * @property {boolean} grid.containLabel - Whether the grid should contain labels.
   *
   * @property {Object[]} xAxis - The x-axis configuration for the chart.
   * @property {string} xAxis[].type - The type of the x-axis.
   * @property {boolean} xAxis[].boundaryGap - Whether the x-axis has a boundary gap.
   * @property {string[]} xAxis[].data - The data points for the x-axis.
   *
   * @property {Object[]} yAxis - The y-axis configuration for the chart.
   * @property {string} yAxis[].type - The type of the y-axis.
   *
   * @property {Object[]} series - The series configuration for the chart.
   * @property {string} series[].name - The name of the data series.
   * @property {string} series[].type - The type of the data series.
   * @property {string} series[].stack - The stack name for the data series.
   * @property {Object} series[].areaStyle - The area style configuration for the data series.
   * @property {Object} series[].areaStyle.normal - The normal area style configuration.
   * @property {number[]} series[].data - The data points for the data series.
   */
  const option = {
    title: {
      text: "堆叠区域图",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["邮件营销", "联盟广告", "视频广告"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "邮件营销",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "联盟广告",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "视频广告",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default Chart;
