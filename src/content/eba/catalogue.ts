export type EbaCategory =
  | "Soil and ground cover management"
  | "Water management"
  | "Vineyard design and management"
  | "Landscape elements";

export type SpatialScale =
  | "Vineyard"
  | "Landscape"
  | "Farm"

export type EbaStrategy = {
  id: string;
  slug: string;
  title: string;
  category: EbaCategory;
  spatial_scale: SpatialScale;
  summary?: string;
  filename?: string;
  mapPosition?: {
    x: number;
    y: number;
    tooltipSide?: "top" | "right" | "bottom" | "left";
  };
};

export const ebaStrategies: EbaStrategy[] = [
  {
    id: "1",
    slug: "intercropping-herbs-plants",
    title: "Intercropping with perennial herbs and flowering plants",
    category: "Soil and ground cover management",
    spatial_scale: "Vineyard",
    summary:
      "Cover crops are intentionally grown between vine rows to improve soil properties, reduce reliance on herbicides, protect the soil surface, and provide green manure or mulch depending on seasonal management.",
    filename: "Use of aromatic plants and flowers.pdf",
    mapPosition: { x: 45, y: 92, tooltipSide: "right" },
  },
  {
    id: "2",
    slug: "mulching-organic-soil-cover",
    title: "Mulching: soil cover with organic material",
    category: "Soil and ground cover management",
    spatial_scale: "Vineyard",
    summary:
      "Mulching covers the soil beneath or between vines with organic materials such as straw, compost, bark, leaves, pruning residues, or wood chips to suppress weeds, conserve moisture, moderate soil temperature, and protect against erosion.",
    filename: "Mulching.pdf",
    mapPosition: { x: 40, y: 58, tooltipSide: "right" },
  },
  {
    id: "3",
    slug: "reduced-no-tillage",
    title: "Reduced tillage and no-tillage",
    category: "Soil and ground cover management",
    spatial_scale: "Vineyard",
    summary:
      "Reduced tillage and no-tillage minimise mechanical soil disturbance, usually in vineyard inter-rows, while maintaining continuous soil cover through practices such as cover crops and mulching.",
    filename: "No and reduced tillage.pdf",
    mapPosition: { x: 30, y: 35, tooltipSide: "left" },
  },
  {
    id: "4",
    slug: "soil-amendments-compost-biochar",
    title: "Soil amendments: compost and biochar",
    category: "Soil and ground cover management",
    spatial_scale: "Vineyard",
    summary:
      "Organic soil amendments such as compost and biochar improve soil health by adding organic matter, supporting nutrient cycling and biological activity, improving soil structure, and increasing water-holding capacity.",
    filename: "Soil amendments biochar and compost.pdf",
    mapPosition: { x: 78, y: 70, tooltipSide: "left" },
  },
  {
    id: "5",
    slug: "agroforestry",
    title: "Agroforestry",
    category: "Vineyard design and management",
    spatial_scale: "Farm",
    summary:
      "Agroforestry combines grape production with trees and shrubs to create diverse, multifunctional farming systems that strengthen ecosystem functions while providing environmental and economic benefits.",
    filename: "Agroforestry.pdf",
  },
  {
    id: "6",
    slug: "canopy-pruning-management",
    title: "Canopy and pruning management",
    category: "Vineyard design and management",
    spatial_scale: "Vineyard",
    summary:
      "Canopy and pruning management maintain a balanced vine structure that supports healthy grape production and improves resilience to changing climatic conditions by regulating canopy density, shoot growth, and fruit exposure.",
    filename: "Canopy management.pdf",
  },
  {
    id: "7",
    slug: "grapevine-diversity",
    title: "Climate-resilient grapevine diversity",
    category: "Vineyard design and management",
    spatial_scale: "Vineyard",
    summary:
      "Managing grapevine diversity strengthens vineyard resilience by matching grape varieties and rootstocks with local environmental conditions and production objectives.",
    filename: "Grapevine diversity.pdf",
  },
  {
    id: "8",
    slug: "livestock-grazing",
    title: "Integrated livestock grazing",
    category: "Vineyard design and management",
    spatial_scale: "Farm",
    summary:
      "Integrating livestock into vineyard management controls vegetation through a nature-based approach while supporting ecological processes and reducing the need for mechanical or chemical interventions.",
    filename: "Livestock grazing.pdf",
  },
  {
    id: "9",
    slug: "vegetated-buffer-flower-strips",
    title: "Vegetated buffer and flower strips",
    category: "Landscape elements",
    spatial_scale: "Landscape",
    summary:
      "Vegetated buffer strips and flower strips establish permanent or semi-permanent vegetation within or adjacent to vineyards to reduce environmental pressures, intercept runoff, and strengthen biodiversity and habitat connectivity.",
    filename: "Vegetated buffer and Flower strips.pdf",
    mapPosition: { x: 74, y: 49, tooltipSide: "left" },
  },
  {
    id: "10",
    slug: "woody-landscape-elements",
    title: "Enhancing woody landscape elements",
    category: "Landscape elements",
    spatial_scale: "Landscape",
    summary:
      "Woody landscape elements such as hedges, tree lines, isolated trees, shrubs, and small woodland patches add structure and diversity to vineyard landscapes while strengthening resilience to environmental pressures.",
    filename: "Woody landscape elements.pdf",
  },
  {
    id: "11",
    slug: "habitats-for-beneficial-species",
    title: "Creating habitats for beneficial species",
    category: "Landscape elements",
    spatial_scale: "Landscape",
    summary:
      "Creating ecological niches within and around vineyards restores food, nesting, shelter, and overwintering resources for beneficial organisms and supports a wider range of species throughout the year.",
    filename: "Habitats for beneficial species.pdf",
  },
  {
    id: "12",
    slug: "terrace-restoration-management",
    title: "Terrace restoration and management in steep-slope viticulture",
    category: "Landscape elements",
    spatial_scale: "Landscape",
    summary:
      "Terrace restoration and management repair or create level platforms, retaining walls, drainage structures, and soil conservation measures that make steep-slope viticulture more stable, accessible, and resilient.",
    filename: "Terrace Restoration and Management.pdf",
    mapPosition: { x: 10, y: 40, tooltipSide: "right" },
  },
  {
    id: "13",
    slug: "dry-stone-walls",
    title: "Dry-stone walls",
    category: "Landscape elements",
    spatial_scale: "Landscape",
    summary:
      "Dry-stone walls are traditional masonry structures built without mortar or cement, using locally sourced stones to stabilise slopes, support drainage, and create ecological niches in terraced vineyard landscapes.",
    filename: "Dry-stone walls.pdf",
    mapPosition: { x: 88, y: 65, tooltipSide: "right" },
  },
  {
    id: "14",
    slug: "rainwater-infiltration-soil-water-retention",
    title: "Rainwater infiltration and soil water retention",
    category: "Water management",
    spatial_scale: "Vineyard",
    summary:
      "Rainwater infiltration and soil water retention slow runoff and allow water to infiltrate into the soil, storing moisture within the vineyard for vines to access during dry periods.",
    filename: "Rainwater infiltration.pdf",
  },
  {
    id: "15",
    slug: "restoration-of-waterways-and-drainage-networks",
    title: "Restoration of waterways and natural drainage networks",
    category: "Water management",
    spatial_scale: "Landscape",
    summary:
      "Ecological waterways and vegetated runoff management restore natural drainage features so that water is slowed, filtered, and gradually absorbed instead of rapidly leaving the catchment.",
    filename: "Restoration of Waterways and drainage networks.pdf",
  },
];

export const getEbaStrategyBySlug = (slug: string) =>
  ebaStrategies.find((strategy) => strategy.slug === slug);

export const getEbaStrategiesByCategory = (category: EbaCategory) =>
  ebaStrategies.filter((strategy) => strategy.category === category);

export const getSimilarEbaStrategies = (activeStrategy: EbaStrategy) =>
  ebaStrategies.filter(
    (strategies) =>
      strategies.category === activeStrategy.category ||
      strategies.spatial_scale === activeStrategy.spatial_scale,
  );
