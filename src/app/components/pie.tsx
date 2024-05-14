import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function Pie(props: { percentage: number; label?: string }) {
  const percentage = props.percentage;
  return (
    <div>
      <div className="w-[100px] h-[100px] mx-auto font-medium my-6">
        <CircularProgressbar
          value={percentage}
          maxValue={1}
          text={`${Math.round(percentage * 100)}%`}
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
            pathColor: `rgb(190, 4, 72)`,
            textColor: "#fff",
          })}
        />
      </div>
      {props.label && <div className="text-center mt-2">{props.label}</div>}
    </div>
  );
}
