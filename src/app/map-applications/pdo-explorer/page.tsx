"use client";

import { Suspense, useRef } from "react";
import {
  NavigationControl,
  Map as ReactMap,
  ScaleControl,
  type MapRef,
} from "react-map-gl/mapbox";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/app/components/ui/resizable";
import { isMobile } from "react-device-detect";
import styles from "@/styles/Home.module.css";

export default function MapContainer() {
  const mapRef = useRef<MapRef>(null);
  const MAPBOX_TOKEN = "";

  return (
    <div className="fixed inset-0 z-10 pt-[60px]">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={isMobile ? 30 : 25}
          // minSize={isMobile ? 15 : 25}
          // maxSize={isMobile ? 70 : 45}
          className="relative min-w-0 overflow-hidden"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <div className={styles.panelFrame}>
              <div className={styles.frontpageContent}>
                <h2>Governance</h2>
                <p>
                  The Winemap provides a comprehensive overview of all European
                  wine regions which fall under the{" "}
                  <strong>Protected Designation of Origin (PDO)</strong> label
                  (as of November 2021). It is an essential resource for anyone
                  interested in wine or who works in the wine industry and can
                  be used to increase knowledge as well as appreciation of
                  regional wines and as an instrument for wine sector decision
                  making. The map is based on a collection of legal
                  information, including grape varieties, geospatial
                  boundaries, and production details, and is the first
                  representation of European PDO regions in one comprehensive
                  resource.
                </p>
              </div>
            </div>
          </Suspense>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className={`${isMobile
            ? "h-3 w-full cursor-row-resize hover:h-4"
            : "h-full w-2 cursor-col-resize hover:w-3"
            } flex items-center justify-center bg-[#E91E63] opacity-60 hover:opacity-100 text-[#E91E63] hover:brightness-110 transition-all relative group z-20`}
        />

        <ResizablePanel
          defaultSize={isMobile ? 60 : 70}
          minSize={isMobile ? 30 : 30}
          className="relative min-w-0 overflow-hidden"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMap
              ref={mapRef}
              minZoom={isMobile ? 1 : 3}
              initialViewState={{
                latitude: 46,
                longitude: 5,
                zoom: 3.6,
                bearing: 0,
                pitch: 0,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/tiacop/clas8a92e003c15o2bpopdfqt"
              mapboxAccessToken={MAPBOX_TOKEN}
              interactiveLayerIds={[
                "pdo-area",
                "pdo-pins",
                "pdo-municipality",
                "vulnerabilityLayer",
              ]}
            >
              <NavigationControl
                position="bottom-right"
                visualizePitch={true}
                showCompass={true}
              />
              <ScaleControl position="bottom-right" />
            </ReactMap>
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
