import { Map as MapIcon } from "lucide-react";
import { ReactNode } from "react";

type MapApplication = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export const mapApplications: MapApplication[] = [
  {
    title: "Environment Browser",
    description:
      "Access all map layers in one unified interface. Toggle layers, organize by scale or category, and explore detailed geospatial information.",
    href: "/cartography",
    icon: <MapIcon className="w-5 h-5 text-[color:var(--text-strong)]" aria-hidden="true" />,
  },
  {
    title: "Climate Explorer",
    description:
      "Analyse how climatic conditions will change throughout Europe in this high-resolution map across different scenarios and indicators.",
    href: "/map-applications/climate-explorer",
    icon: <MapIcon className="w-5 h-5 text-[color:var(--text-strong)]" aria-hidden="true" />,
  },
  {
    title: "European PDO Atlas",
    description:
      "Discover detailed geospatial and regulatory information about European Wine PDO regions in the form of an interactive map.",
    href: "/map-applications/pdo-atlas",
    icon: <MapIcon className="w-5 h-5 text-[color:var(--text-strong)]" aria-hidden="true" />,
  },
  {
    title: "Vulnerability Explorer",
    description:
      "How vulnerable are European PDO regions to the effects of climate change? Get detailed, region-specific information in this interactive map.",
    href: "/map-applications/vulnerability-explorer",
    icon: <MapIcon className="w-5 h-5 text-[color:var(--text-strong)]" aria-hidden="true" />,
  },
  {
    title: "Spatial Analogues Tool",
    description:
      "Explore how climatic conditions move in space under different climate scenarios.",
    href: "/",
    icon: <MapIcon className="w-5 h-5 text-[color:var(--text-strong)]" aria-hidden="true" />,
  },
];
