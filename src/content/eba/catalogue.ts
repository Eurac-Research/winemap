export type EbaStrategy = {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  year: number;
  category: string;
  summary?: string;
  keywords?: string[];
  filename: string;
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
    authors: ["RESPOnD Project"],
    year: 2026,
    category: "Agroforestry",
    summary:
      "Agroforestry integrates trees, shrubs, crops, or livestock into vineyard systems. It can diversify production while supporting soil health, biodiversity, and local climate regulation.",
    keywords: ["Agroforestry"],
    filename: "Agroforestry.pdf",
    mapPosition: { x: 39, y: 46, tooltipSide: "right" },
  },
  {
    id: "2",
    slug: "dry-stone-walls",
    title: "Dry-Stone Walls",
    authors: ["RESPOnD Project"],
    year: 2026,
    category: "Dry-Stone Walls",
    summary:
      "Dry-stone walls stabilize vineyard slopes while allowing water to drain through the structure. They also create microhabitats and preserve the cultural character of terraced landscapes.",
    keywords: ["Dry-Stone Walls"],
    filename: "Dry-stone_walls.pdf",
    mapPosition: { x: 12, y: 65, tooltipSide: "right" },
  },
  {
    id: "3",
    slug: "landscape-elements",
    title: "Landscape Elements",
    authors: ["RESPOnD Project"],
    year: 2026,
    category: "Landscape Elements",
    summary:
      "Landscape elements such as hedges, isolated trees, and shrubs add ecological structure to vineyard landscapes. They support biodiversity, habitat connectivity, microclimate regulation, and natural pest control.",
    keywords: ["Hedges", "Isolated trees", "Shrub planting"],
    filename: "Landscape_elements.pdf",
    mapPosition: { x: 42, y: 77, tooltipSide: "right" },
  },
];

export const getEbaStrategyBySlug = (slug: string) =>
  ebaStrategies.find((strategy) => strategy.slug === slug);
