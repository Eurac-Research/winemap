import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function Pie(props: { percentage: number; label?: string }) {
  const percentage = Math.round(props.percentage * 100);

  let score = percentage < 55 ? "Low" : percentage < 72 ? "Moderate" : "High";
  let color =
    percentage < 55 ? "#4FF47C" : percentage < 72 ? "#F5DA5C" : "#FF6D31";

  if (props.label === "Adaptive Capacity") {
    color =
      percentage < 38 ? "#FF6D31" : percentage < 55 ? "#F5DA5C" : "#4FF47C";
    score = percentage < 38 ? "Low" : percentage < 55 ? "Moderate" : "High";
  }
  if (props.label === "Sensitivity") {
    color =
      percentage < 55 ? "#4FF47C" : percentage < 72 ? "#F5DA5C" : "#FF6D31";
    score = percentage < 55 ? "Low" : percentage < 72 ? "Moderate" : "High";
  }
  if (props.label === "Exposure") {
    color =
      percentage < 62 ? "#4FF47C" : percentage < 75 ? "#F5DA5C" : "#FF6D31";
    score = percentage < 62 ? "Low" : percentage < 75 ? "Moderate" : "High";
  }

  return (
    <div>
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
        <div className="text-center text-[14px] mt-2" style={{ color: color }}>
          {score}
          <br /> {props.label}
        </div>
      )}
    </div>
  );
}
