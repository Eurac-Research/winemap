import { Tooltip } from "antd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function Pie(props: { percentage: number; label?: string }) {
  const percentage = Math.round(props.percentage * 100);

  let score = percentage < 55 ? "Low" : percentage < 72 ? "Moderate" : "High";
  let color =
    percentage < 55 ? "#97BE6C" : percentage < 72 ? "#E8C360" : "#DD7C75";

  if (props.label === "Adaptive Capacity") {
    color =
      percentage < 38 ? "#DD7C75" : percentage < 55 ? "#E8C360" : "#97BE6C";
    score = percentage < 38 ? "Low" : percentage < 55 ? "Moderate" : "High";
  }
  if (props.label === "Sensitivity") {
    color =
      percentage < 55 ? "#97BE6C" : percentage < 72 ? "#E8C360" : "#DD7C75";
    score = percentage < 55 ? "Low" : percentage < 72 ? "Moderate" : "High";
  }
  if (props.label === "Exposure") {
    color =
      percentage < 62 ? "#97BE6C" : percentage < 75 ? "#E8C360" : "#DD7C75";
    score = percentage < 62 ? "Low" : percentage < 75 ? "Moderate" : "High";
  }

  return (
    <div>
      <Tooltip
        title={
          props.label === "Exposure"
            ? "Exposure measures the degree of climate change in a region based on a set of bioclimatic variables tailored to viticulture. The stronger the changes in climatic conditions     between the future (2071-2100) and the past (1981-2010), the higher the exposure."
            : props.label === "Sensitivity"
            ? "Sensitivity describes how a region is affected by climate change. It is based on the abundance and diversity of cultivated varieties within a region combined with their climatic requirements. Impacts of changing climatic conditions are stronger in regions with a high sensitivity."
            : props.label === "Adaptive Capacity"
            ? "Adaptive Capacity refers to how a region can adapt to climate change. As such it includes a range of different factors, from biophysical to socioeconomic aspects. A higher adaptive capacity indicates an increased availability of resources for adaptation within a region."
            : ""
        }
        color="#eee"
        classNames={{ root: "text-black" }}
        styles={{
          body: {
            color: "#000",
            padding: "14px",
            fontSize: "12px",
            lineHeight: "1.2",
          },
        }}
      >
        <div className="w-[100px] h-[90px] mx-auto font-medium my-6">
          <CircularProgressbar
            value={percentage}
            maxValue={100}
            text={`${percentage}`}
            strokeWidth={6}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "18px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: color,
              textColor: color,
              trailColor: "rgba(255,255,255,0.1)",

              backgroundColor: "#fff",
            })}
          />
        </div>
        {props.label && (
          <div
            className="text-center text-[14px] mt-2"
            style={{ color: color }}
          >
            {score}
            <br />
            {props.label}{" "}
          </div>
        )}
      </Tooltip>
    </div>
  );
}
