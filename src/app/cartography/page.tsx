"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Layers, HelpCircle, X, ExternalLink } from "lucide-react"
import Link from "next/link"
import Map, { MapRef } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { isMobile } from "react-device-detect"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable"

type LayerGroup = "all" | "ecosystem" | "services"

interface Layer {
  id: string
  name: string
  description: string
  category: string
  mapboxLayerId: string
  enabled: boolean
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const availableLayers: Layer[] = [
  {
    id: "naturalness-index",
    name: "Naturalness Index",
    description: "The degree of land use/land cover naturalness. Natural and seminatural areas support pest and disease control.",
    category: "Ecosystem Conditions",
    mapboxLayerId: "env_naturalness_index-4gh1u3nd",
    enabled: false,
  },
  {
    id: "distance-to-nature",
    name: "Land Use Integrity",
    description: "Degree of land use integrity based on distance to natural and near-natural areas.",
    category: "Ecosystem Conditions",
    mapboxLayerId: "env_distance_to_nature-4pdad6jf",
    enabled: false,
  },
  {
    id: "landuse-diversity",
    name: "Land Use Diversity",
    description: "Diversity of land use/land cover classes. Higher landscape heterogeneity promotes biodiversity.",
    category: "Ecosystem Conditions",
    mapboxLayerId: "env_landuse_diversity_index-35je19qp",
    enabled: false,
  },
  {
    id: "climatic-waterbalance",
    name: "Climate Water Balance",
    description: "Water available from precipitation after accounting for evapotranspiration.",
    category: "Ecosystem Conditions",
    mapboxLayerId: "env_climatic_waterbalance_1me376vw",
    enabled: false,
  },
  {
    id: "pest-control",
    name: "Pest Control Potential",
    description: "Relative potential to sustain natural pest control in agricultural areas.",
    category: "Ecosystem Services",
    mapboxLayerId: "env_pestcontrol_100m-bplrmwe4",
    enabled: false,
  },
  {
    id: "pollination",
    name: "Pollination Potential",
    description: "Relative potential for pollination service provision in agricultural areas.",
    category: "Ecosystem Services",
    mapboxLayerId: "env_pollination_potential_100m-cgzjjo3l",
    enabled: false,
  },
]

const mapApplications = [
  {
    id: "climate-environment",
    name: "Climate & Environment Map",
    description: "Interactive map with climate indicators, vulnerability assessments, and environmental data",
    href: "/climate-environment",
  },
  {
    id: "adaptation",
    name: "Adaptation Strategies Map",
    description: "Explore ecosystem-based adaptation strategies and pilot experiences",
    href: "/adaptation",
  },
  {
    id: "legal",
    name: "Legal & Governance Map",
    description: "Navigate PDO wine regions with legal frameworks and geographic indications",
    href: "/legal",
  },
]

export default function CartographyPage() {
  const mapRef = useRef<MapRef>(null)
  const [layers, setLayers] = useState<Layer[]>(availableLayers)
  const [groupBy, setGroupBy] = useState<LayerGroup>("all")
  const [selectedInfo, setSelectedInfo] = useState<Layer | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const handlePanelLayout = useCallback(() => {
    mapRef.current?.getMap().resize()
  }, [])

  // Toggle layer visibility when layers change
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    const map = mapRef.current.getMap()

    layers.forEach((layer) => {
      if (map.getLayer(layer.mapboxLayerId)) {
        map.setLayoutProperty(
          layer.mapboxLayerId,
          "visibility",
          layer.enabled ? "visible" : "none"
        )
      }
    })
  }, [layers, mapLoaded])

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, enabled: !layer.enabled } : layer))
    )
  }

  const groupedLayers = () => {
    if (groupBy === "ecosystem") {
      return [{ title: "Ecosystem Conditions", items: layers.filter((l) => l.category === "Ecosystem Conditions") }]
    } else if (groupBy === "services") {
      return [{ title: "Ecosystem Services", items: layers.filter((l) => l.category === "Ecosystem Services") }]
    } else {
      const categories = Array.from(new Set(layers.map((l) => l.category)))
      return categories.map((category) => ({
        title: category,
        items: layers.filter((l) => l.category === category),
      }))
    }
  }

  return (
    <div className="h-screen w-full bg-black pt-24">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        onLayout={handlePanelLayout}
        className="h-[calc(100vh-6rem)] w-full"
      >
        <ResizablePanel
          defaultSize={isMobile ? "45%" : "28%"}
          minSize={isMobile ? "25%" : "20%"}
          maxSize={isMobile ? "75%" : "40%"}
          className="bg-black/95 backdrop-blur-md overflow-hidden"
        >
          <div
            className={`h-full overflow-y-auto ${isMobile ? "border-b" : "border-r"} border-white/20`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-[#E91E63]" />
                  <h1 className="text-2xl font-bold text-white">Cartography</h1>
                </div>
              </div>

              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Toggle environmental map layers on/off and explore detailed information for each layer.
              </p>

              {/* Grouping Options */}
              <div className="mb-6">
                <label className="text-white/80 text-sm font-semibold mb-2 block">Filter By:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGroupBy("all")}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${groupBy === "all"
                      ? "bg-[#E91E63] text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setGroupBy("ecosystem")}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${groupBy === "ecosystem"
                      ? "bg-[#E91E63] text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                  >
                    Ecosystem
                  </button>
                  <button
                    onClick={() => setGroupBy("services")}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${groupBy === "services"
                      ? "bg-[#E91E63] text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                  >
                    Services
                  </button>
                </div>
              </div>

              {/* Layers List */}
              <div className="space-y-6 mb-8">
                {groupedLayers().map((group) => (
                  <div key={group.title}>
                    <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">{group.title}</h3>
                    <div className="space-y-2">
                      {group.items.map((layer) => (
                        <div
                          key={layer.id}
                          className="p-4 rounded-lg border border-white/10 bg-white/5"
                        >
                          <div className="flex items-center gap-3">
                            {/* Toggle Switch */}
                            <button
                              onClick={() => toggleLayer(layer.id)}
                              className={`mt-1 w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${layer.enabled ? "bg-[#E91E63]" : "bg-white/20"
                                }`}
                              aria-label={`Toggle ${layer.name}`}
                              aria-pressed={layer.enabled}
                            >
                              <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${layer.enabled ? "translate-x-[1.125rem]" : "translate-x-0"
                                  }`}
                              />
                            </button>

                            {/* Layer Info */}
                            <div className="flex-grow">
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleLayer(layer.id)}
                                  className="text-left text-white font-semibold text-sm hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 rounded-sm"
                                  aria-pressed={layer.enabled}
                                  aria-label={`Toggle ${layer.name}`}
                                >
                                  {layer.name}
                                </button>
                                <button
                                  onClick={() => setSelectedInfo(layer)}
                                  className="text-white/40 hover:text-white transition-colors"
                                  aria-label={`More info about ${layer.name}`}
                                >
                                  <HelpCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Applications Section */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#E91E63]" />
                  Interactive Map Applications
                </h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">
                  Complex map applications with advanced features and interactions
                </p>
                <div className="space-y-2">
                  {mapApplications.map((app) => (
                    <Link
                      key={app.id}
                      href={app.href}
                      className="block p-4 rounded-lg border border-[#E91E63]/30 bg-[#E91E63]/5 hover:bg-[#E91E63]/10 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-semibold text-sm group-hover:text-[#E91E63] transition-colors">
                          {app.name}
                        </h4>
                        <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#E91E63] transition-colors" />
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed">{app.description}</p>
                    </Link>
                  ))}
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
            } flex items-center justify-center bg-[#E91E63] opacity-60 hover:opacity-100 text-[#E91E63] hover:brightness-110 transition-all`}
        />

        <ResizablePanel className="relative">
          <Map
            ref={mapRef}
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              longitude: 5,
              latitude: 46,
              zoom: 5.2,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/tiacop/cmdg1whvv001s01r2diojaxic"
            onLoad={(e) => {
              const map = e.target
              // Hide all layers initially
              layers.forEach((layer) => {
                if (map.getLayer(layer.mapboxLayerId)) {
                  map.setLayoutProperty(layer.mapboxLayerId, "visibility", "none")
                }
              })
              setMapLoaded(true)
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Info Modal */}
      {selectedInfo && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setSelectedInfo(null)}
            aria-hidden="true"
          />
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black border border-white/20 rounded-lg p-8 max-w-lg w-full mx-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="layer-info-title"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 id="layer-info-title" className="text-2xl font-bold text-white">
                {selectedInfo.name}
              </h3>
              <button
                onClick={() => setSelectedInfo(null)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close info modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-white/60 text-sm font-semibold">Description:</span>
                <p className="text-white/80 leading-relaxed mt-1">{selectedInfo.description}</p>
              </div>

              <div>
                <span className="text-white/60 text-sm font-semibold">Category:</span>
                <p className="text-white/80">{selectedInfo.category}</p>
              </div>

              <div className="pt-4 border-t border-white/20">
                <Link
                  href="/climate-environment"
                  className="text-[#E91E63] hover:text-[#ff4081] text-sm flex items-center gap-2 transition-colors"
                >
                  View full description with references and input data
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <button
              onClick={() => setSelectedInfo(null)}
              className="mt-6 w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  )
}
