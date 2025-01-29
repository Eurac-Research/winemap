import { useState } from "react";
import Image from "next/image";

type PropTypes = {
  content: string;
  title: string;
  icon?: string;
};
/**
 * Accordion component that displays content with a toggleable view.
 *
 * @param {PropTypes} props - The properties object.
 * @param {string} props.title - The title of the accordion.
 * @param {string} props.content - The content to be displayed inside the accordion.
 * @param {string} [props.icon] - Optional icon to be displayed alongside the title.
 *
 * @returns {JSX.Element} The rendered Accordion component.
 *
 * @example
 * <Accordion
 *   title="Accordion Title"
 *   content="This is the content of the accordion."
 *   icon="/path/to/icon.png"
 * />
 */
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
            {props.icon && (
              <Image
                src={props.icon}
                alt={props.title}
                width={35}
                height={35}
                className="inline"
              />
            )}
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
          {props.icon && (
            <Image
              src={props.icon}
              alt={props.title}
              width={35}
              height={35}
              className="inline"
            />
          )}
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
