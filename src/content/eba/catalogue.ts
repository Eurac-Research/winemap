export type EbaCategory =
  | "Ground cover and intercropping"
  | "Ecosystem-based soil & vegetation management"
  | "Water regulation and retention measures"
  | "Canopy management"
  | "Harvest"
  | "Grape varieties"
  | "Landscape features"
  | "Wildlife support and refuge structures"
  | "Adapted farm management"
  | "Land reorganisation";

export type FieldOfAction =
  | "Soil"
  | "Water"
  | "Plant/Vines"
  | "Ecological connectivity & Biodiversity"
  | "Farm system"
  | "Vineyard stability"
  | "Land use";

export type SpatialScale = "Vineyard" | "Landscape" | "Farm";

export type EbaStrategy = {
  id: string;
  slug: string;
  title: string;
  category: EbaCategory;
  field_of_action: FieldOfAction;
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
    category: "Ground cover and intercropping",
    field_of_action: "Soil",
    spatial_scale: "Vineyard",
    summary:
      "Cover crops are intentionally grown between vine rows to improve soil properties, reduce reliance on herbicides, protect the soil surface, and provide green manure or mulch depending on seasonal management.",
    filename: "Use of aromatic plants and flowers.pdf",
    mapPosition: { x: 39, y: 46, tooltipSide: "right" },
  },
  {
    id: "2",
    slug: "mulching-organic-soil-cover",
    title: "Mulching: soil cover with organic material",
    category: "Ecosystem-based soil & vegetation management",
    field_of_action: "Soil",
    spatial_scale: "Vineyard",
    summary:
      "Mulching covers the soil beneath or between vines with organic materials such as straw, compost, bark, leaves, pruning residues, or wood chips to suppress weeds, conserve moisture, moderate soil temperature, and protect against erosion.",
    filename: "Mulching _Soil cover with organic material.pdf",
    mapPosition: { x: 33, y: 58, tooltipSide: "right" },
  },
  {
    id: "3",
    slug: "reduced-no-tillage",
    title: "Reduced tillage and no-tillage",
    category: "Ecosystem-based soil & vegetation management",
    field_of_action: "Soil",
    spatial_scale: "Vineyard",
    summary:
      "Reduced tillage and no-tillage minimise mechanical soil disturbance, usually in vineyard inter-rows, while maintaining continuous soil cover through practices such as cover crops and mulching.",
    filename: "No and reduced tillage.pdf",
    mapPosition: { x: 50, y: 55, tooltipSide: "left" },
  },
  {
    id: "4",
    slug: "soil-amendments-compost-biochar",
    title: "Soil amendments: compost and biochar",
    category: "Ecosystem-based soil & vegetation management",
    field_of_action: "Soil",
    spatial_scale: "Vineyard",
    summary:
      "Organic soil amendments such as compost and biochar improve soil health by adding organic matter, supporting nutrient cycling and biological activity, improving soil structure, and increasing water-holding capacity.",
    filename: "Soil amendments biochar and compost.pdf",
    mapPosition: { x: 59, y: 63, tooltipSide: "left" },
  },
  {
    id: "5",
    slug: "vegetated-buffer-flower-strips",
    title: "Vegetated buffer and flower strips",
    category: "Ground cover and intercropping",
    field_of_action: "Ecological connectivity & Biodiversity",
    spatial_scale: "Landscape",
    summary:
      "Vegetated buffer strips and flower strips establish permanent or semi-permanent vegetation within or adjacent to vineyards to reduce environmental pressures, intercept runoff, and strengthen biodiversity and habitat connectivity.",
    filename: "Vegetated buffer and Flower strips.pdf",
    mapPosition: { x: 74, y: 49, tooltipSide: "left" },
  },
  {
    id: "6",
    slug: "dry-stone-walls",
    title: "Dry-stone walls",
    category: "Landscape features",
    field_of_action: "Vineyard stability",
    spatial_scale: "Landscape",
    summary:
      "Dry-stone walls are traditional masonry structures built without mortar or cement, using locally sourced stones to stabilise slopes, support drainage, and create ecological niches in terraced vineyard landscapes.",
    filename: "Dry-stone walls.pdf",
    mapPosition: { x: 12, y: 65, tooltipSide: "right" },
  },
  {
    id: "7",
    slug: "terrace-restoration-management",
    title: "Terrace restoration and management in steep-slope viticulture",
    category: "Landscape features",
    field_of_action: "Vineyard stability",
    spatial_scale: "Landscape",
    summary:
      "Terrace restoration and management repair or create level platforms, retaining walls, drainage structures, and soil conservation measures that make steep-slope viticulture more stable, accessible, and resilient.",
    filename: "Terrace Restoration and Management.pdf",
    mapPosition: { x: 18, y: 58, tooltipSide: "right" },
  },
];

export const getEbaStrategyBySlug = (slug: string) =>
  ebaStrategies.find((strategy) => strategy.slug === slug);

export const getEbaStrategiesByCategory = (category: EbaCategory) =>
  ebaStrategies.filter((strategy) => strategy.category === category);
