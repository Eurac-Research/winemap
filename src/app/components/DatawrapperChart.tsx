"use client";

import { useEffect } from "react";

interface DatawrapperChartProps {
  /**
   * The Datawrapper chart ID (e.g., "DEUDJ")
   */
  chartId: string;
  /**
   * The title of the chart for accessibility
   */
  title: string;
  /**
   * ARIA label describing the chart type and content
   */
  ariaLabel: string;
  /**
   * Initial height of the iframe in pixels
   * @default 400
   */
  height?: number;
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
}

/**
 * A reusable component for embedding Datawrapper charts with responsive height adjustment.
 * 
 * @example
 * ```tsx
 * <DatawrapperChart
 *   chartId="DEUDJ"
 *   title="Nr. of registered PDOs"
 *   ariaLabel="Line chart showing the number of registered PDOs over time"
 *   height={378}
 * />
 * ```
 */
export default function DatawrapperChart({
  chartId,
  title,
  ariaLabel,
  height = 400,
  className = "",
}: DatawrapperChartProps) {
  useEffect(() => {
    // Datawrapper responsive script - adjusts iframe height based on content
    const handleMessage = (event: MessageEvent) => {
      if (event.data["datawrapper-height"] !== undefined) {
        const iframes = document.querySelectorAll("iframe");
        for (const key in event.data["datawrapper-height"]) {
          for (let i = 0; i < iframes.length; i++) {
            const iframe = iframes[i];
            if (iframe.contentWindow === event.source) {
              const newHeight = event.data["datawrapper-height"][key] + "px";
              iframe.style.height = newHeight;
            }
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <iframe
        title={title}
        aria-label={ariaLabel}
        id={`datawrapper-chart-${chartId}`}
        src={`https://datawrapper.dwcdn.net/${chartId}/`}
        scrolling="no"
        frameBorder="0"
        className="w-full border-0"
        style={{
          width: 0,
          minWidth: "100%",
          border: "none"
        }}
        height={height}
        data-external="1"
      />
    </div>
  );
}
