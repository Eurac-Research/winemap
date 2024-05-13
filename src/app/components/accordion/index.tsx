import { useState } from "react";
import Image from "next/image";

type PropTypes = {
  content: string;
  title: string;
  icon: string;
};
export default function Accordion(props: PropTypes) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <>
      {props.content.length > 40 ? (
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={toggle}
        >
          <p>
            <Image
              src={props.icon}
              alt={props.title}
              width={35}
              height={35}
              className="inline"
            />
            <span className="bold">{props.title}</span>{" "}
            {/* isShowing && <>{props.content}</>*/}
            <span className={isShowing ? "showAll" : "showOneLine"}>
              {props.content}
            </span>
            <span className="expand">
              {isShowing ? (
                <svg
                  width="18"
                  height="11"
                  viewBox="0 0 18 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 10L9 2L17 10"
                    stroke="#9E9E9E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="11"
                  viewBox="0 0 18 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 9L17 1"
                    stroke="#9E9E9E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
          </p>
        </div>
      ) : (
        <p>
          <Image
            src={props.icon}
            alt={props.title}
            width={35}
            height={35}
            className="inline"
          />
          <span className="bold">{props.title}</span>{" "}
          {/* isShowing && <>{props.content}</>*/}
          <span className={isShowing ? "showAll" : "showOneLine"}>
            {props.content}
          </span>
        </p>
      )}
    </>
  );
}
