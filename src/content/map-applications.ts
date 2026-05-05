type MapApplication = {
  title: string;
  description: string;
  href: string;
  backgroundImage: string;
  backgroundAlt: string;
  backgroundPosition?: string;
  eyebrow: string;
  ctaLabel: string;
};

export const mapApplications: MapApplication[] = [
  {
    title: "Environment Browser",
    description:
      "Access all map layers in one unified interface. Toggle layers, organize by scale or category, and explore detailed geospatial information.",
    href: "/map-applications/environment-browser",
    backgroundImage: "/images/map_applications/environment_browser.png",
    backgroundAlt: "A vineyard landscape used as a background for the Environment Browser map application.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
  {
    title: "European PDO Atlas",
    description:
      "Discover detailed geospatial and regulatory information about European Wine PDO regions in the form of an interactive map.",
    href: "/map-applications/pdo-atlas",
    backgroundImage: "/images/map_applications/pdo_atlas.jpg",
    backgroundAlt: "A wine region map background for the European PDO Atlas.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
  {
    title: "Vulnerability Explorer",
    description:
      "How vulnerable are European PDO regions to the effects of climate change? Get detailed, region-specific information in this interactive map.",
    href: "/map-applications/vulnerability-explorer",
    backgroundImage: "/images/map_applications/vulnerability_explorer.png",
    backgroundAlt: "A vulnerability map background for European wine regions.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
  {
    title: "Spatial Analogues Tool",
    description:
      "Explore how climatic conditions move in space under different climate scenarios.",
    href: "/",
    backgroundImage: "/images/map_applications/vulnerability_explorer.png",
    backgroundAlt: "Sunlit vineyard rows used as a background for the Spatial Analogues Tool.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
];
