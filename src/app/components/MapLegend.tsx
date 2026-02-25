"use client";

import { useCallback, useEffect, useState } from "react";
import { Map } from "mapbox-gl";

interface LegendItem {
  color: string;
  value: string;
  label?: string;
}

interface MapLegendProps {
  map: Map | null;
  layerId: string;
  layerName: string;
  isVisible: boolean;
}

export default function MapLegend({
  map,
  layerId,
  layerName,
  isVisible,
}: MapLegendProps) {
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatValue = useCallback((value: number): string => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return value.toString();
  }, []);

  const createGenericLegend = useCallback((name: string): LegendItem[] => {
    // Official ArcGIS legend configurations with exact ranges from legend images
    const layerLegends: Record<string, LegendItem[]> = {
      "naturalness (index)": [
        { value: "0-33", color: "#ff341e", label: "0-33 (Very Low)" },
        { value: "33-55", color: "#f8ae26", label: "33-55 (Low)" },
        { value: "55-67", color: "#f0fe28", label: "55-67 (Medium)" },
        { value: "67-78", color: "#77b919", label: "67-78 (High)" },
        { value: "78-100", color: "#137614", label: "78-100 (Very High)" },
      ],
      "diversity (index)": [
        { value: "0-19", color: "#f8f8f8", label: "0-19 (Low Diversity)" },
        { value: "19-32", color: "#db8800", label: "19-32 (Low)" },
        { value: "32-43", color: "#fdff01", label: "32-43 (Medium)" },
        { value: "43-53", color: "#22d600", label: "43-53 (High)" },
        { value: "53-100", color: "#02734c", label: "53-100 (High Diversity)" },
      ],
      "climate water balance (index)": [
        { value: "0-24", color: "#ff3c17", label: "0-24 (Very Dry)" },
        { value: "24-29", color: "#ffaa1f", label: "24-29 (Dry)" },
        { value: "29-36", color: "#f2fe28", label: "29-36 (Moderate)" },
        { value: "36-46", color: "#7dba0f", label: "36-46 (Wet)" },
        { value: "46-100", color: "#167413", label: "46-100 (Very Wet)" },
      ],
      "pest control (index)": [
        { value: "0-4", color: "#ffffff", label: "0-4 (Very Low)" },
        { value: "4-17", color: "#b48017", label: "4-17 (Low)" },
        { value: "17-33", color: "#f1ca3b", label: "17-33 (Medium)" },
        { value: "33-49", color: "#b7ec07", label: "33-49 (High)" },
        { value: "49-100", color: "#247500", label: "49-100 (Very High)" },
      ],
      "pollination (index)": [
        { value: "0-21", color: "#f9f9fd", label: "0-21 (Very Low)" },
        { value: "21-26", color: "#cbab62", label: "21-26 (Low)" },
        { value: "26-31", color: "#faffca", label: "26-31 (Medium)" },
        { value: "31-39", color: "#68c9a9", label: "31-39 (High)" },
        { value: "39-100", color: "#4b8974", label: "39-100 (Very High)" },
      ],
      "soil erosion control (index)": [
        { value: "0-7", color: "#be5a46", label: "0-7 (Low Control)" },
        { value: "7-21", color: "#f0b70b", label: "7-21 (Low)" },
        { value: "21-40", color: "#77ed00", label: "21-40 (Medium)" },
        { value: "40-67", color: "#21a684", label: "40-67 (High)" },
        { value: "67-100", color: "#122a74", label: "67-100 (High Control)" },
      ],
      "net primary production (index)": [
        { value: "0-35", color: "#f2f306", label: "0-35 (Very Low)" },
        { value: "35-43", color: "#f3b800", label: "35-43 (Low)" },
        { value: "43-50", color: "#f47f03", label: "43-50 (Medium)" },
        { value: "50-58", color: "#f33e00", label: "50-58 (High)" },
        { value: "58-100", color: "#f53d01", label: "58-100 (Very High)" },
      ],
      "outdoor recreation (index)": [
        { value: "0-18", color: "#f8f8f8", label: "0-18 (Very Low)" },
        { value: "18-23", color: "#ffc3c1", label: "18-23 (Low)" },
        { value: "23-28", color: "#f668a1", label: "23-28 (Medium)" },
        { value: "28-41", color: "#b1007c", label: "28-41 (High)" },
        { value: "41-100", color: "#46006b", label: "41-100 (Very High)" },
      ],
      "landscape aesthetics (index)": [
        { value: "0-28", color: "#37a3cd", label: "0-28 (Very Low)" },
        { value: "28-40", color: "#abcdac", label: "28-40 (Low)" },
        { value: "40-50", color: "#f2fb7c", label: "40-50 (Medium)" },
        { value: "50-62", color: "#f8a445", label: "50-62 (High)" },
        { value: "62-100", color: "#df3d3e", label: "62-100 (Very High)" },
      ],
      // aka distance-to-nature
      "land use integrity (index)": [
        { value: "0-13", color: "#ff341e", label: "0-13 (Very Close)" },
        { value: "13-36", color: "#f8ae26", label: "13-36 (Close)" },
        { value: "36-59", color: "#f0fe28", label: "36-59 (Medium)" },
        { value: "59-82", color: "#77b919", label: "59-82 (Far)" },
        { value: "82-100", color: "#137614", label: "82-100 (Very Far)" },
      ],
    };

    // Match layer name to legend configuration
    const lowerName = name.toLowerCase();
    for (const [key, legend] of Object.entries(layerLegends)) {
      //console.log(`Checking layer name: ${lowerName} against key: ${key}`);

      if (lowerName.includes(key)) {
        return legend;
      }
    }

    // Default fallback legend
    return [
      { value: "0-20", color: "#440154", label: "0-20 (Low)" },
      { value: "20-40", color: "#31688e", label: "20-40" },
      { value: "40-60", color: "#35b779", label: "40-60" },
      { value: "60-80", color: "#fde725", label: "60-80" },
      { value: "80-100", color: "#ffffff", label: "80-100 (High)" },
    ];
  }, []);

  useEffect(() => {
    if (!map || !isVisible) {
      setLegendItems([]);
      return;
    }

    const extractLegendFromPaint = (paint: any[]): LegendItem[] => {
      const items: LegendItem[] = [];

      // Handle Mapbox expression format
      if (paint[0] === "interpolate" && paint[1][0] === "linear") {
        const stops = paint.slice(3);
        for (let i = 0; i < stops.length; i += 2) {
          if (i + 1 < stops.length) {
            items.push({
              value: stops[i].toString(),
              color: stops[i + 1],
              label: formatValue(stops[i]),
            });
          }
        }
      }

      return items;
    };

    try {
      // Try to get the layer from the map
      const layer = map.getLayer(layerId);
      if (!layer) {
        console.log(`Layer ${layerId} not found`);
        setLegendItems(createGenericLegend(layerName));
        return;
      }

      //console.log(`Legend for: ${layerId}`, layer);

      // Extract paint properties for different layer types
      let paint = null;
      if (layer.type === "raster") {
        paint = map.getPaintProperty(layerId, "raster-color");
      } else if (layer.type === "fill") {
        paint = map.getPaintProperty(layerId, "fill-color");
      } else if (layer.type === "circle") {
        paint = map.getPaintProperty(layerId, "circle-color");
      } else if (layer.type === "heatmap") {
        paint = map.getPaintProperty(layerId, "heatmap-color");
      }

      //console.log(`Paint property for ${layerId}:`, paint);

      if (paint && Array.isArray(paint)) {
        // Handle data-driven paint properties
        const items = extractLegendFromPaint(paint);
        if (items.length > 0) {
          setLegendItems(items);
          //console.log(`Extracted ${items.length} legend items from paint property`);
          return;
        }
      }

      // Fallback: Create a generic legend based on layer type
      //console.log(`Using generic legend for ${layerName}`);
      setLegendItems(createGenericLegend(layerName));
    } catch (error) {
      console.log(`Error extracting legend for ${layerId}:`, error);
      setLegendItems(createGenericLegend(layerName));
    }
  }, [map, layerId, layerName, isVisible, formatValue, createGenericLegend]);

  if (!isVisible || legendItems.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-4 md:left-[440px] bg-black bg-opacity-90 text-white rounded-lg shadow-lg max-w-xs z-50 border border-gray-600 pointer-events-auto">
      <div className="flex items-center justify-between p-3 border-b border-gray-600">
        <h4 className="text-sm font-medium truncate mr-2">{layerName}</h4>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-gray-300 hover:text-white flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-white hover:bg-opacity-10 transition-colors"
          title={isCollapsed ? "Expand legend" : "Collapse legend"}
        >
          {isCollapsed ? "+" : "−"}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-3">
          <div className="space-y-2">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-5 h-4 rounded border border-gray-500 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs leading-tight">
                  {item.label || item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
