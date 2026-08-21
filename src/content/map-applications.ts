import type { GlossaryTerm } from "@/content/glossary";

export type MapApplicationHelpText =
  | string
  | {
      text: string;
      glossaryId: GlossaryTerm["id"];
    }
  | {
      text: string;
      href: string;
    };

export type MapApplicationHelpBlock =
  | {
      type: "paragraph";
      content: MapApplicationHelpText[];
    }
  | {
      type: "links";
      title: string;
      items: {
        label: string;
        href: string;
      }[];
    };

export type MapApplication = {
  title: string;
  navigationIcon?: "layers" | "map-pinned" | "shield-alert";
  description: string;
  help?: MapApplicationHelpBlock[];
  href: string;
  backgroundImage: string;
  backgroundAlt: string;
  backgroundPosition?: string;
  eyebrow: string;
  ctaLabel: string;
};

export const mapApplications: MapApplication[] = [
  {
    title: "WINEMAP Explorer",
    navigationIcon: "layers",
    description:
      "Access all map layers in one unified interface. Toggle layers, organize by scale or category, and explore detailed geospatial information.",
    help: [
      {
        type: "paragraph",
        content: [
          "Use WINEMAP Explorer to display and analyze several geospatial datasets on an interactive map. The layers include terrain information, ",
          { text: "ecosystem services", glossaryId: "ecosystem-services" },
          ", ",
          {
            text: "ecological conditions",
            glossaryId: "ecological-conditions",
          },
          ", and ",
          {
            text: "bioclimatic indicators",
            glossaryId: "bioclimatic-indicator",
          },
          ". Click the categories on the left to show or hide the individual layers within each category.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "After selecting a layer, the corresponding data is visualized on the map. Zoom and hover over specific locations to inspect indicator values. Use the help button next to each layer for more information about the displayed data.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "For climate layers, the map can show values for different periods and climate scenarios. First select an indicator on the left, then choose the desired scenario and period in the panel above.",
        ],
      },
      {
        type: "links",
        title: "More details",
        items: [
          {
            label: "Indicator definitions and data sources",
            href: "/about/definitions",
          },
          {
            label: "Copernicus Land Monitoring Service",
            href: "https://land.copernicus.eu/",
          },
        ],
      },
    ],
    href: "/map-applications/environment-browser",
    backgroundImage: "/images/map_applications/environment_browser.png",
    backgroundAlt:
      "A vineyard landscape used as a background for the WINEMAP Explorer map application.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
  {
    title: "European PDO Atlas",
    navigationIcon: "map-pinned",
    description:
      "Discover detailed geospatial and regulatory information about European Wine PDO regions in the form of an interactive map.",
    help: [
      {
        type: "paragraph",
        content: [
          "The PDO Atlas shows the location of wine ",
          {
            text: "Protected Designations of Origin",
            glossaryId: "protected-designation-of-origin",
          },
          " across Europe together with their regulatory characteristics.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "By zooming in on the map, the detailed borders for each region become visible. Hovering over the map shows a list of PDO regions at that location.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Click a PDO on the map or in the left sidebar to inspect more details about its regulatory characteristics. Individual PDO regions can also be searched for and filtered with the controls in the left sidebar.",
        ],
      },
      {
        type: "links",
        title: "More details",
        items: [
          {
            label: "European Commission: geographical indications",
            href: "https://agriculture.ec.europa.eu/farming/geographical-indications-and-quality-schemes/geographical-indications-and-quality-schemes-explained_en#pdo",
          },
          {
            label: "eAmbrosia register",
            href: "https://ec.europa.eu/info/food-farming-fisheries/food-safety-and-quality/certification/quality-labels/geographical-indications-register/",
          },
        ],
      },
    ],
    href: "/map-applications/pdo-atlas",
    backgroundImage: "/images/map_applications/pdo_atlas.jpg",
    backgroundAlt: "A wine region map background for the European PDO Atlas.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
  {
    title: "Vulnerability Explorer",
    navigationIcon: "shield-alert",
    description:
      "How vulnerable are European PDO regions to the effects of climate change? Get detailed, region-specific information in this interactive map.",
    help: [
      {
        type: "paragraph",
        content: [
          "The Vulnerability Explorer displays the climate change ",
          { text: "vulnerability", glossaryId: "vulnerability" },
          " of wine ",
          {
            text: "Protected Designations of Origin",
            glossaryId: "protected-designation-of-origin",
          },
          " across Europe.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Zoom and click on the map, or use the filter controls in the left sidebar, to select individual regions and explore their vulnerability in more detail.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The detailed view also shows ",
          { text: "exposure", glossaryId: "exposure" },
          ", ",
          { text: "sensitivity", glossaryId: "sensitivity" },
          ", and ",
          { text: "adaptive capacity", glossaryId: "adaptive-capacity" },
          " for each region, which together determine the overall vulnerability.",
        ],
      },
      {
        type: "links",
        title: "More details",
        items: [
          {
            label: "Indicator definitions and data sources",
            href: "/about/definitions#vulnerability",
          },
          {
            label: "Scientific Article",
            href: "https://doi.org/10.1038/s41467-024-50549-w",
          },
        ],
      },
    ],
    href: "/map-applications/vulnerability-explorer",
    backgroundImage: "/images/map_applications/vulnerability_explorer.png",
    backgroundAlt: "A vulnerability map for European wine regions.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
  {
    title: "Spatial Analogues Tool",
    description:
      "Explore how climatic conditions move in space under different climate scenarios.",
    href: "",
    backgroundImage: "/images/map_applications/vulnerability_explorer.png",
    backgroundAlt:
      "Sunlit vineyard rows used as a background for the Spatial Analogues Tool.",
    backgroundPosition: "center",
    eyebrow: "Map applications",
    ctaLabel: "Go to Map",
  },
];

export const getMapApplicationByHref = (href: string) =>
  mapApplications.find((application) => application.href === href);
