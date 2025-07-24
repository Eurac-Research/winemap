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

export default function MapLegend({ map, layerId, layerName, isVisible }: MapLegendProps) {
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatValue = useCallback((value: number): string => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return value.toString();
  }, []);

  const createGenericLegend = useCallback((name: string): LegendItem[] => {
    // TIF-based color configurations with rescaled 0-100 values
    const layerLegends: Record<string, LegendItem[]> = {
      "naturalness": [
        { value: "0", color: "#00ffff", label: "0 (Very Low)" },
        { value: "25", color: "#40bfff", label: "25 (Low)" },
        { value: "50", color: "#807fff", label: "50 (Medium)" },
        { value: "75", color: "#c03fff", label: "75 (High)" },
        { value: "100", color: "#ff00ff", label: "100 (Very High)" },
      ],
      "diversity": [
        { value: "0", color: "#a50026", label: "0 (Low Diversity)" },
        { value: "25", color: "#f88e52", label: "25 (Low)" },
        { value: "50", color: "#fefebd", label: "50 (Medium)" },
        { value: "75", color: "#84ca66", label: "75 (High)" },
        { value: "100", color: "#006837", label: "100 (High Diversity)" },
      ],
      "water balance": [
        { value: "0", color: "#f7fbff", label: "0 (Very Dry)" },
        { value: "25", color: "#c5daee", label: "25 (Dry)" },
        { value: "50", color: "#6aadd5", label: "50 (Moderate)" },
        { value: "75", color: "#2070b4", label: "75 (Wet)" },
        { value: "100", color: "#08306b", label: "100 (Very Wet)" },
      ],
      "pest control": [
        { value: "0", color: "#440154", label: "0 (Very Low)" },
        { value: "25", color: "#3a528b", label: "25 (Low)" },
        { value: "50", color: "#20908c", label: "50 (Medium)" },
        { value: "75", color: "#5ec961", label: "75 (High)" },
        { value: "100", color: "#fde724", label: "100 (Very High)" },
      ],
      "pollination": [
        { value: "0", color: "#440154", label: "0 (Very Low)" },
        { value: "25", color: "#3a528b", label: "25 (Low)" },
        { value: "50", color: "#20908c", label: "50 (Medium)" },
        { value: "75", color: "#5ec961", label: "75 (High)" },
        { value: "100", color: "#fde724", label: "100 (Very High)" },
      ],
      "erosion": [
        { value: "0", color: "#440154", label: "0 (Low Control)" },
        { value: "25", color: "#3a528b", label: "25 (Low)" },
        { value: "50", color: "#20908c", label: "50 (Medium)" },
        { value: "75", color: "#5ec961", label: "75 (High)" },
        { value: "100", color: "#fde724", label: "100 (High Control)" },
      ],
      "production": [
        { value: "0", color: "#ffffcc", label: "0 (Very Low)" },
        { value: "25", color: "#fed875", label: "25 (Low)" },
        { value: "50", color: "#fc8c3b", label: "50 (Medium)" },
        { value: "75", color: "#e2191c", label: "75 (High)" },
        { value: "100", color: "#800026", label: "100 (Very High)" },
      ],
      "recreation": [
        { value: "0", color: "#440154", label: "0 (Very Low)" },
        { value: "25", color: "#3a528b", label: "25 (Low)" },
        { value: "50", color: "#20908c", label: "50 (Medium)" },
        { value: "75", color: "#5ec961", label: "75 (High)" },
        { value: "100", color: "#fde724", label: "100 (Very High)" },
      ],
      "aesthetic": [
        { value: "0", color: "#440154", label: "0 (Very Low)" },
        { value: "25", color: "#3a528b", label: "25 (Low)" },
        { value: "50", color: "#20908c", label: "50 (Medium)" },
        { value: "75", color: "#5ec961", label: "75 (High)" },
        { value: "100", color: "#fde724", label: "100 (Very High)" },
      ],
      "distance to nature": [
        { value: "0", color: "#440154", label: "0 (Very Close)" },
        { value: "25", color: "#3a528b", label: "25 (Close)" },
        { value: "50", color: "#20908c", label: "50 (Medium)" },
        { value: "75", color: "#5ec961", label: "75 (Far)" },
        { value: "100", color: "#fde724", label: "100 (Very Far)" },
      ],
    };

    // Match layer name to legend configuration
    const lowerName = name.toLowerCase();
    for (const [key, legend] of Object.entries(layerLegends)) {
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
      { value: "80-100", color: "#ffffff", label: "80-100 (High)" }
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
              label: formatValue(stops[i])
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

      console.log(`Analyzing layer: ${layerId}`, layer);

      // Extract paint properties for different layer types
      let paint = null;
      if (layer.type === 'raster') {
        paint = map.getPaintProperty(layerId, 'raster-color');
      } else if (layer.type === 'fill') {
        paint = map.getPaintProperty(layerId, 'fill-color');
      } else if (layer.type === 'circle') {
        paint = map.getPaintProperty(layerId, 'circle-color');
      } else if (layer.type === 'heatmap') {
        paint = map.getPaintProperty(layerId, 'heatmap-color');
      }

      console.log(`Paint property for ${layerId}:`, paint);

      if (paint && Array.isArray(paint)) {
        // Handle data-driven paint properties
        const items = extractLegendFromPaint(paint);
        if (items.length > 0) {
          setLegendItems(items);
          console.log(`Extracted ${items.length} legend items from paint property`);
          return;
        }
      }

      // Fallback: Create a generic legend based on layer type
      console.log(`Using generic legend for ${layerName}`);
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
                <span className="text-xs leading-tight">{item.label || item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-600">
            <p className="text-xs text-gray-400">
              Values based on actual TIF data analysis
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
