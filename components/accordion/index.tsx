import { useState } from "react";

export default function Accordion(props) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <>
      {props.content.length > 50 ? (
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={toggle}
        >
          {/* <span className="plus" onClick={toggle}>
            {isShowing ? "-" : "+"}
          </span> */}

          <span className="plus">
            {isShowing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800"
                height="800"
                fill="none"
                viewBox="0 0 24 24"
                className="minusIcon"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="none"
                viewBox="0 0 24 24"
                className="plusIcon"
              >
                <path
                  fill="#fff"
                  d="M12.75 11.25V5a.75.75 0 1 0-1.5 0v6.25H5a.75.75 0 1 0 0 1.5h6.25V19a.76.76 0 0 0 .75.75.75.75 0 0 0 .75-.75v-6.25H19a.75.75 0 0 0 .75-.75.76.76 0 0 0-.75-.75h-6.25Z"
                />
              </svg>
            )}
          </span>

          <p>
            <span>{props.title}</span> {/* isShowing && <>{props.content}</>*/}
            <div className={isShowing ? "showAll" : "showOneLine"}>
              {props.content}
            </div>
          </p>
        </div>
      ) : (
        <p>
          <span>{props.title}</span> {/* isShowing && <>{props.content}</>*/}
          <div className={isShowing ? "showAll" : "showOneLine"}>
            {props.content}
          </div>
        </p>
      )}
    </>
  );
}
