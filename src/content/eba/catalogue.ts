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
  | "Land reorganisation"

export type FieldOfAction = 
  | "Soil"
  | "Water"
  | "Plant/Vines"
  | "Ecological connectivity & Biodiversity"
  | "Farm system"
  | "Vineyard stability"
  | "Land use"

export type SpatialScale = 
  | "Vineyard field"
  | "Vineyard Landscape"
  | "Farm"

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
    slug: "agroforestry",
    title: "Agroforestry",
    category: "Adapted farm management",
    field_of_action: "Farm system",
    spatial_scale: "Farm",
    summary:
      "Agroforestry integrates trees, shrubs, crops, or livestock into vineyard systems. It can diversify production while supporting soil health, biodiversity, and local climate regulation.",
    filename: "Agroforestry.pdf",
    mapPosition: { x: 39, y: 46, tooltipSide: "right" },
  },
  {
    id: "2",
    slug: "dry-stone-walls",
    title: "Dry-Stone Walls",
    category: "Landscape features",
    field_of_action: "Vineyard stability",
    spatial_scale: "Vineyard Landscape",
    summary:
      "Dry-stone walls stabilize vineyard slopes while allowing water to drain through the structure. They also create microhabitats and preserve the cultural character of terraced landscapes.",
    filename: "Dry-stone_walls.pdf",
    mapPosition: { x: 12, y: 65, tooltipSide: "right" },
  },
  {
    id: "3",
    slug: "hedges-isolatedtrees-shrub-planting",
    title: "Hedges / Isolated trees / Shrub plantings",
    category: "Landscape features",
    field_of_action: "Ecological connectivity & Biodiversity",
    spatial_scale: "Vineyard Landscape",
    summary:
      "Landscape elements such as hedges, isolated trees, and shrubs add ecological structure to vineyard landscapes. They support biodiversity, habitat connectivity, microclimate regulation, and natural pest control.",
    filename: "Landscape_elements.pdf",
    mapPosition: { x: 42, y: 77, tooltipSide: "right" },
  },
];

export const getEbaStrategyBySlug = (slug: string) =>
  ebaStrategies.find((strategy) => strategy.slug === slug);

export const getEbaStrategiesByCategory = (category: EbaCategory) =>
  ebaStrategies.filter((strategy) => strategy.category === category);