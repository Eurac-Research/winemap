"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Map, { MapRef, NavigationControl, ScaleControl } from "react-map-gl/mapbox";
import type { Map as MapboxMap } from "mapbox-gl";
import { Radio, RadioChangeEvent } from "antd";
import MapLegend from "@/app/components/MapLegend";
import styles from "@/styles/Home.module.css";
import { isMobile } from "react-device-detect";
import {
  Indicators,
  getIndicatorsWithMapByCategory,
} from "@/app/components/indicators/indicator-index";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable";

const ReactMap = Map;
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface LayerGroup {
  id: string;
  title: string;
  description: string;
  layers: Layer[];
}

interface Layer {
  id: string;
  name: string;
  description: string;
  references?: string[];
  mapboxLayerId: string;
}

const formatCategoryLabel = (category: string) =>
  category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const layerGroups: LayerGroup[] = Array.from(
  new Set(Indicators.map(indicator => indicator.category))
)
  .map(category => {
    const layers: Layer[] = getIndicatorsWithMapByCategory(category).map(
      indicator => ({
        id: indicator.id,
        name: indicator.name,
        description: indicator.description.join(" "),
        references: indicator.references,
        mapboxLayerId: indicator.mapboxLayerId!,
      })
    );

    return {
      id: category,
      title: formatCategoryLabel(category),
      description: "",
      layers,
    };
  })
  .filter(group => group.layers.length > 0);

export default function EnvironmentalPage() {
  const mapRef = useRef<MapRef>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<MapboxMap | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState(layerGroups[0]?.id ?? "");
  const [selectedLayerId, setSelectedLayerId] = useState(
    layerGroups[0]?.layers[0]?.id ?? ""
  );
  const handlePanelLayout = useCallback(() => {
    mapRef.current?.getMap().resize();
  }, []);

  const selectedGroup =
    layerGroups.find(group => group.id === selectedGroupId) || layerGroups[0];
  const selectedLayer =
    selectedGroup?.layers.find(layer => layer.id === selectedLayerId) ||
    selectedGroup?.layers[0];

  // Handle layer visibility when map loads or selection changes
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !selectedLayer) return;

    const map = mapRef.current.getMap();

    // Hide all environmental layers first
    layerGroups.forEach(group => {
      group.layers.forEach(layer => {
        try {
          if (map.getLayer(layer.mapboxLayerId)) {
            map.setLayoutProperty(layer.mapboxLayerId, 'visibility', 'none');
          }
        } catch {
          // Layer not present in map style.
        }
      });
    });

    // Show the selected layer
    try {
      if (map.getLayer(selectedLayer.mapboxLayerId)) {
        map.setLayoutProperty(selectedLayer.mapboxLayerId, 'visibility', 'visible');
      }
    } catch {
      // Layer not present in map style.
    }
  }, [mapLoaded, selectedLayer?.mapboxLayerId]);

  const handleGroupChange = (activeKey: string) => {
    setSelectedGroupId(activeKey);
    const newGroup = layerGroups.find(group => group.id === activeKey);
    if (newGroup && newGroup.layers.length > 0) {
      setSelectedLayerId(newGroup.layers[0].id);
    }
  };

  const handleLayerChange = (e: RadioChangeEvent) => {
    setSelectedLayerId(e.target.value);
  };

  // Function to convert URLs in text to clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="h-screen w-full bg-black pt-24">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        onLayout={handlePanelLayout}
        className="h-[calc(100vh-6rem)] w-full"
      >
        <ResizablePanel
          defaultSize={isMobile ? "48%" : "32%"}
          minSize={isMobile ? "28%" : "24%"}
          maxSize={isMobile ? "78%" : "45%"}
          className="bg-black/95 backdrop-blur-md overflow-hidden"
        >
          <div
            className={`h-full overflow-hidden ${isMobile ? "border-b" : "border-r"} border-white/20`}
          >
            <div className={styles.panelFrame}>
              <div className={styles.frontpageContent}>
                {/* Winemap Header */}
                {/* <header className="mb-8">
              <div className="flex items-start justify-between w-full mb-4 flex-col">
                <div className="flex items-start justify-start gap-2 flex-col ">
                  <h1 className="text-[28px] font-bold mt-4 mb-0 ">
                    <Link
                      href="/"
                      className="transition-all hover:[text-shadow:_0_0_10px_rgb(255_255_255)] flex gap-2"
                    >
                      WINEMAP{" "}
                      <span className="font-extralight italic">ENVIRONMENT</span>
                    </Link>
                  </h1>
                  <a
                    href="https://www.eurac.edu"
                    title="Go to Eurac Research Website"
                    className="pb-[3px] flex gap-2 items-center"
                  >
                    by
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="178.793"
                      height="22"
                      viewBox="0 0 178.793 19.536"
                      className="h-4 w-auto"
                    >
                      <path
                        d="M165.199 19.215c.679-.027 1.709-.081 2.768-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171V8.303a6.188 6.188 0 0 1 3.147-1.058c2.307 0 2.849 1.275 2.849 3.337v5.562c0 1.9-.271 2.062-.9 2.171l-.9.135v.765c.678-.027 1.709-.081 2.767-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171v-5.866c0-2.74-.923-4.639-4.124-4.639a6.3 6.3 0 0 0-3.88 1.763V0a20.047 20.047 0 0 1-3.771 1.465v.65c1.763.352 1.763.678 1.763 2.062v11.967c0 1.9-.271 2.062-.9 2.171l-.9.135Zm-6.539.326a4.838 4.838 0 0 0 4.016-1.737l-.136-.705a5.725 5.725 0 0 1-3.147.841c-2.822 0-4.8-1.927-4.8-5.4 0-3.608 1.927-5.725 4.232-5.725 1.927 0 2.551 1.031 2.632 2.577h1.031c0-.9.027-2.2.109-3.093a10.729 10.729 0 0 0-3.608-.651c-3.555 0-6.513 3.12-6.513 7.163 0 4.124 2.306 6.729 6.186 6.729m-16.037-.325c.678-.027 1.709-.109 2.767-.109 1.031 0 2.5.082 3.175.109v-.76l-1.247-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.73 4.73 0 0 1 2.879-1.031 4.092 4.092 0 0 1 1.493.244l.218-1.872a4.463 4.463 0 0 0-1.167-.163 5.094 5.094 0 0 0-3.419 1.9V5.508a26.914 26.914 0 0 1-3.771 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-9.415-1.248a2.045 2.045 0 0 1-2.225-2.152c0-1.655 1.248-2.659 4.042-2.659.3 0 .761 0 1.059.028-.027.569-.081 2.6-.081 3.581a3.744 3.744 0 0 1-2.795 1.194m-.732 1.574a4.534 4.534 0 0 0 3.608-1.845h.055a1.777 1.777 0 0 0 1.98 1.845 4.134 4.134 0 0 0 2.063-.489v-.76c-1.656 0-2.144-.379-2.144-1.709 0-2.442.109-4.5.109-6.62 0-2.632-1.52-4.314-4.586-4.314a5.427 5.427 0 0 0-3.717 1.546l.136.787a6.281 6.281 0 0 1 3.094-.732c2.116 0 3.039 1.112 3.039 3.2v1.578c-.407-.027-1.086-.027-1.466-.027-3.473 0-5.725 1.628-5.725 4.178a3.316 3.316 0 0 0 3.555 3.365m-14.19-8.846c.217-1.845 1.356-3.852 3.636-3.852a2.977 2.977 0 0 1 2.846 3.256c0 .379-.162.6-.624.6Zm3.88 8.846c1.953 0 3.663-.842 4.178-1.683l-.081-.678a7.9 7.9 0 0 1-3.581.76c-3.039 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.816 5.816 0 0 0 .055-.977 4.832 4.832 0 0 0-4.993-5.155c-3.527 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.133 6.729m-13.648 0c2.713 0 4.694-1.818 4.694-3.989 0-4.857-6.838-3.554-6.838-6.7 0-1.383 1.059-2.089 2.687-2.089 1.818 0 2.632.9 2.767 2.632h1a22.693 22.693 0 0 1-.054-3.039 10.491 10.491 0 0 0-3.609-.705c-2.632 0-4.585 1.411-4.585 3.581 0 4.911 6.81 3.256 6.81 6.648 0 1.519-1.194 2.469-2.9 2.469-2.307 0-2.876-1.058-3.12-2.985h-1a31.179 31.179 0 0 1 .074 3.555 12.844 12.844 0 0 0 4.07.624m-15.38-8.849c.217-1.845 1.357-3.852 3.636-3.852a2.978 2.978 0 0 1 2.845 3.256c0 .379-.163.6-.624.6Zm3.88 8.846c1.954 0 3.663-.842 4.179-1.683l-.082-.678a7.9 7.9 0 0 1-3.581.76c-3.038 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.931 5.931 0 0 0 .054-.977 4.832 4.832 0 0 0-4.992-5.155c-3.528 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.132 6.729m-15.986-.322c.678-.027 1.709-.109 2.767-.109 1.032 0 2.5.082 3.175.109v-.76l-1.248-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.728 4.728 0 0 1 2.881-1.031 4.091 4.091 0 0 1 1.492.244l.218-1.872a4.458 4.458 0 0 0-1.167-.163 5.091 5.091 0 0 0-3.419 1.9V5.508a26.95 26.95 0 0 1-3.772 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-13.296.321a10.166 10.166 0 0 0 3.687-.663v-4.032a5.963 5.963 0 0 1-3.283.778c-1.7 0-2.707-1.152-2.707-3.283 0-2.592 1.094-3.629 2.679-3.629a8.352 8.352 0 0 1 3.082.6V5.366a12.034 12.034 0 0 0-3.573-.518c-5.011 0-7.6 3.2-7.6 7.488 0 4.464 2.362 7.2 7.719 7.2M50.66 16.048c-.806 0-1.325-.259-1.325-1.066 0-.95.518-1.325 1.959-1.325a5.282 5.282 0 0 1 .633.029V15.5a1.742 1.742 0 0 1-1.267.547m-1.76 3.489a4.211 4.211 0 0 0 3.718-1.788 3.347 3.347 0 0 0 3.37 1.786 4.056 4.056 0 0 0 2.391-.576v-3.2a2.9 2.9 0 0 1-.462.058c-.576 0-.806-.346-.806-1.009v-4.43c0-3.772-1.872-5.529-6.48-5.529a14.844 14.844 0 0 0-4.751.72v3.83a14.846 14.846 0 0 1 3.859-.6c1.556 0 2.189.547 2.189 1.728v.461c-.2 0-.433-.029-.921-.029-3.888 0-6.711 1.095-6.711 4.349 0 2.966 2.045 4.233 4.609 4.233m-15.525-.234h5.184v-9.274a7.4 7.4 0 0 1 3.11-.72 6.513 6.513 0 0 1 1.584.173V4.992a3.481 3.481 0 0 0-1.152-.144 4.839 4.839 0 0 0-3.657 1.728V5.078H33.38Zm-12.3.231a6.047 6.047 0 0 0 3.888-1.354v1.123h5.04V5.078h-5.182v9.706a3.025 3.025 0 0 1-1.728.748c-1.037 0-1.555-.461-1.555-1.757V5.078H16.33v9.476c0 2.851 1.239 4.982 4.752 4.982M5.414 10.548c.058-1.009.49-2.045 1.728-2.045 1.095 0 1.555.95 1.555 1.872v.173Zm2.42 8.986a13.961 13.961 0 0 0 4.838-.806v-3.829a11.914 11.914 0 0 1-4.406.864c-2.3 0-2.852-.864-2.938-2.419h8.324a13.521 13.521 0 0 0 .086-1.527c0-3.657-1.584-6.969-6.624-6.969C2.275 4.848 0 8.39 0 12.163c0 4.32 2.16 7.373 7.834 7.373"
                        fill="#fff"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </header> */}
                {/* Main Title */}
                <h2 className="text-xl font-semibold mb-6">ECOLOGICAL CONDITIONS AND ECOSYSTEM SERVICES IN THE ALPS</h2>

                {/* Group Selection Tabs */}
                <div className="mb-6">
                  <div className="flex bg-white/10 rounded-lg p-1 w-fit gap-1">
                    {layerGroups.map(group => (
                      <button
                        key={group.id}
                        onClick={() => handleGroupChange(group.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all !mt-0 duration-200 ${selectedGroupId === group.id
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white hover:bg-white/20'
                          }`}
                      >
                        {group.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layer Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Layers</h3>
                  <Radio.Group
                    value={selectedLayerId}
                    onChange={handleLayerChange}
                    className="flex flex-col space-y-2 "
                  >
                    {selectedGroup?.layers.map(layer => (
                      <Radio
                        key={layer.id}
                        value={layer.id}
                        className="text-white block w-full"
                      >
                        <span className="text-sm">{layer.name}</span>
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>

                {/* Layer Description */}
                <div className="border-t border-gray-600 pt-6 pb-10">
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">{selectedLayer?.name}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {selectedLayer ? renderTextWithLinks(selectedLayer.description) : null}
                    </p>
                  </div>

                  {selectedLayer?.references && (
                    <div className="mb-4">
                      <h5 className="text-md font-medium mb-2">References:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {selectedLayer.references.map((ref, index) => (
                          <li key={index}>• {renderTextWithLinks(ref)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Acknowledgement - shown for all layers */}
                  <div>
                    <h5 className="text-md font-medium mb-2">Acknowledgement:</h5>
                    <p className="text-xs text-gray-400">
                      The data presented were produced within the project AGATA (Accessible ecoloGicAl daTA for resilient Viticulture), jointly financed by Eurac Research and the University of Verona as part of the &ldquo;JOINT RESEARCH 2022&rdquo; Call.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className={`${isMobile
            ? "h-3 w-full cursor-row-resize hover:h-4"
            : "w-2 h-full cursor-col-resize hover:w-3"
            } flex items-center justify-center bg-[#E91E63] opacity-60 hover:opacity-100 text-[#E91E63] hover:brightness-110 transition-all relative z-20`}
        />

        <ResizablePanel className="relative">
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMap
              ref={mapRef}
              minZoom={isMobile ? 1 : 3}
              initialViewState={{
                latitude: 46,
                longitude: 5,
                zoom: 5.2,
                bearing: 0,
                pitch: 0,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/tiacop/cmdg1whvv001s01r2diojaxic"
              mapboxAccessToken={MAPBOX_TOKEN}
              onLoad={(event) => {
                setMapLoaded(true);
                setMapInstance(event.target);
              }}
            >
              <NavigationControl
                position="bottom-right"
                visualizePitch={true}
                showCompass={true}
              />
              <ScaleControl position="bottom-right" />
            </ReactMap>

            <MapLegend
              map={mapInstance}
              layerId={selectedLayer?.mapboxLayerId ?? ""}
              layerName={selectedLayer?.name ?? ""}
              isVisible={mapLoaded && !!selectedLayer}
            />
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

