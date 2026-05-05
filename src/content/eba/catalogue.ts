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
      "Agroforestry is an integrated agricultural practice that combines traditional farming techniques with forest management, integrating woody and perennial plants with herbaceous crops and/or animal husbandry. This approach aims to create land-use systems that are more productive, healthy, diversified, and sustainable. The integration of trees, shrubs, annual crops, and animals into vineyards is an ancient practice, particularly in the Mediterranean region.",
    keywords: ["Agroforestry"],
    filename: "Agroforestry.pdf",
  },
  {
    id: "2",
    slug: "dry-stone-walls",
    title: "Dry-Stone Walls",
    authors: ["RESPOnD Project"],
    year: 2026,
    category: "Dry-Stone Walls",
    summary:
      "Dry-stone walls are traditional structures built without mortar, using locally sourced stones and a layering technique that ensures both stability and efficient drainage. Their design often adapts to the landscape, tapering towards the top and incorporating crushed stone backing to minimize water pressure. These walls play a crucial role in terraced and agricultural environments, providing ecological functions and serving as \"living\" structures that interact with both human activity and natural processes. Alongside hedgerows and stone heaps, dry-stone walls create valuable habitats and ecological niches, especially in areas dedicated to viticulture.",
    keywords: ["Dry-Stone Walls"],
    filename: "Dry-stone_walls.pdf",
  },
  {
    id: "3",
    slug: "landscape-elements",
    title: "Landscape Elements",
    authors: ["RESPOnD Project"],
    year: 2026,
    category: "Landscape Elements",
    summary:
      "Landscape elements like hedges, isolated trees, and shrubs are integrated into agricultural areas to enhance ecological functions and sustainability. These plant structures act as nature-based solutions, improving environmental, social, and economic outcomes. By increasing landscape diversity, woody plants foster habitat connectivity and support biodiversity, offering shelter and resources to numerous species. Their establishment and conservation are crucial for creating ecological niches and boosting the resilience of agricultural landscapes against environmental and climate challenges.",
    keywords: ["Hedges", "Isolated trees", "Shrub planting"],
    filename: "Landscape_elements.pdf",
  },
];

export const getEbaStrategyBySlug = (slug: string) =>
  ebaStrategies.find((strategy) => strategy.slug === slug);
