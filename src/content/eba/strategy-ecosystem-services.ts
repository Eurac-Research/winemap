import type { EbaEcosystemServiceId } from "./ecosystem-services";

export type EbaStrategyEcosystemServiceEntry = {
  id: EbaEcosystemServiceId;
  note?: string;
};

/** The ecosystem services supported by each EbA strategy. */
export const ebaStrategyEcosystemServices = {
  "intercropping-herbs-plants": [
    {
      id: "soil-health-fertility",
      note: "improved soil structure, nutrient cycling and organic matter content",
    },
    { id: "erosion-control", note: "slope stabilisation" },
    { id: "carbon-sequestration" },
    { id: "water-retention", note: "reduced surface runoff" },
    {
      id: "water-regulation",
      note: "improved infiltration, retention, and reduced nutrient leaching",
    },
    { id: "biodiversity-enhancement" },
    {
      id: "natural-pest-control",
      note: "support for beneficial insects and natural enemies",
    },
    {
      id: "climate-regulation",
      note: "local microclimate regulation and reduced temperature extremes",
    },
    {
      id: "cultural-heritage",
      note: "preservation of traditional knowledge and historical land-use practices",
    },
    { id: "landscape-aesthetics", note: "distinct landscape character" },
  ],
  "mulching-organic-soil-cover": [
    {
      id: "soil-health-fertility",
      note: "improved soil structure, nutrient cycling and organic matter content",
    },
    { id: "erosion-control", note: "root stabilisation" },
    { id: "water-retention", note: "reduced surface runoff" },
    {
      id: "water-regulation",
      note: "improved infiltration and soil moisture conservation",
    },
    { id: "climate-regulation", note: "soil temperature control" },
    { id: "biodiversity-enhancement", note: "above- and below-ground" },
    { id: "weed-control" },
    {
      id: "grape-production",
      note: "improved vine growth and resilience under water-limited conditions",
    },
  ],
  "reduced-no-tillage": [
    {
      id: "soil-health-fertility",
      note: "improved soil structure, nutrient cycling and organic matter content",
    },
    { id: "erosion-control", note: "slope stabilisation" },
    {
      id: "water-retention",
      note: "reduced surface runoff and moisture control",
    },
    {
      id: "climate-regulation",
      note: "local microclimate regulation and reduced temperature extremes",
    },
    { id: "carbon-sequestration" },
    { id: "biodiversity-enhancement", note: "above- and below-ground" },
    { id: "pollination-services" },
    {
      id: "natural-pest-control",
      note: "support for beneficial insects and natural enemies",
    },
    { id: "landscape-aesthetics", note: "distinct landscape character" },
  ],
  "soil-amendments-compost-biochar": [
    {
      id: "soil-health-fertility",
      note: "improved soil structure, nutrient cycling and organic matter content",
    },
    { id: "erosion-control", note: "slope stabilisation" },
    { id: "water-retention", note: "reduced surface runoff" },
    { id: "water-quality" },
    { id: "carbon-sequestration" },
    { id: "biodiversity-enhancement", note: "above- and below-ground" },
    {
      id: "natural-pest-pathogen-control",
      note: "support for beneficial insects and natural enemies",
    },
    { id: "grape-production", note: "improved vine growth and yield" },
  ],
  agroforestry: [
    {
      id: "soil-health-fertility",
      note: "improved soil structure, nutrient cycling, and organic matter accumulation",
    },
    {
      id: "water-regulation",
      note: "enhanced infiltration, reduced runoff, and improved water retention",
    },
    { id: "erosion-control", note: "soil stabilisation through root systems" },
    {
      id: "microclimate-regulation",
      note: "wind buffering, shading, and temperature moderation",
    },
    {
      id: "habitat-provision-and-biodiversity-conservation",
      note: "food resources, shelter, and ecological connectivity",
    },
    {
      id: "natural-pest-control",
      note: "support for beneficial insects, birds, and other natural enemies",
    },
    {
      id: "cultural-heritage-and-landscape-aesthetics",
      note: "maintenance of traditional multifunctional landscapes",
    },
  ],
  "canopy-pruning-management": [
    {
      id: "microclimate-regulation",
      note: "improved vineyard microclimate and reduced heat stress",
    },
    {
      id: "natural-pest-control",
      note: "better air circulation and lower disease pressure",
    },
    {
      id: "water-regulation",
      note: "reduced plant water stress through balanced canopy development",
    },
    { id: "improved-grape-quality-and-production-stability" },
    {
      id: "biodiversity-enhancement",
      note: "support for beneficial organisms through reduced pesticide requirements",
    },
  ],
  "grapevine-diversity": [
    {
      id: "agrobiodiversity-conservation",
      note: "maintenance and use of grapevine genetic diversity",
    },
    {
      id: "sustainable-grape-production",
      note: "greater production stability under climate variability",
    },
    { id: "reduced-plant-protection-requirements" },
    {
      id: "cultural-heritage",
      note: "conservation of traditional and locally adapted grape varieties",
    },
  ],
  "livestock-grazing": [
    {
      id: "soil-health-fertility",
      note: "enhanced nutrient cycling, soil biological activity, and organic matter inputs",
    },
    { id: "natural-weed-and-vegetation-control" },
    {
      id: "natural-pest-control",
      note: "support for beneficial insects and natural enemies",
    },
    {
      id: "habitat-provision-and-biodiversity-conservation",
      note: "more diverse ground vegetation and associated wildlife",
    },
    {
      id: "erosion-control",
      note: "maintenance of permanent vegetation cover and improved soil stability",
    },
    {
      id: "cultural-heritage",
      note: "preservation of traditional knowledge and historical land-use practices",
    },
  ],
  "rainwater-infiltration-soil-water-retention": [
    { id: "water-retention", note: "reduced surface runoff" },
    {
      id: "water-regulation",
      note: "enhanced infiltration and groundwater recharge",
    },
    { id: "flood-and-erosion-control" },
    {
      id: "soil-health-fertility",
      note: "improved soil structure, organic matter and nutrient cycling",
    },
    { id: "biodiversity-enhancement", note: "above- and below-ground" },
    {
      id: "micro-climate-regulation",
      note: "greater resilience to drought and extreme rainfall",
    },
  ],
  "restoration-of-waterways-and-drainage-networks": [
    {
      id: "flood-and-erosion-control",
      note: "reduced runoff and sediment transport",
    },
    {
      id: "water-regulation",
      note: "enhanced infiltration, groundwater recharge and natural flow regulation",
    },
    { id: "water-quality-improvement" },
    { id: "drought-mitigation-through-increased-landscape-water-retention" },
    {
      id: "biodiversity-enhancement",
      note: "above- and below-ground habitats and ecological connectivity",
    },
    {
      id: "cultural-heritage",
      note: "maintenance of traditional landscape features",
    },
    {
      id: "landscape-aesthetics",
      note: "enhanced visual quality and landscape character",
    },
  ],
  "woody-landscape-elements": [
    {
      id: "habitat-provision-and-biodiversity-conservation",
      note: "refuge, food resources, and ecological connectivity",
    },
    {
      id: "microclimate-regulation",
      note: "wind buffering, shading, and temperature moderation",
    },
    {
      id: "water-regulation",
      note: "improved infiltration, retention, and reduced nutrient leaching",
    },
    {
      id: "soil-health-improvement",
      note: "enhanced organic matter, nutrient cycling, and soil structure",
    },
    { id: "erosion-control", note: "root stabilisation" },
    { id: "water-retention", note: "reduced surface runoff" },
    {
      id: "natural-pest-control",
      note: "support for beneficial insects and natural enemies",
    },
    {
      id: "cultural-and-landscape-aesthetic-value",
      note: "cultural identity, structural diversity and visual character of agricultural landscapes",
    },
  ],
  "habitats-for-beneficial-species": [
    { id: "habitat-provision-and-biodiversity-conservation" },
    {
      id: "natural-pest-control",
      note: "support for beneficial insects and natural enemies",
    },
    { id: "pollination" },
    { id: "microclimate-regulation", note: "reduced temperature extremes" },
    {
      id: "cultural-heritage",
      note: "preservation of traditional knowledge and historical land-use practices",
    },
    { id: "landscape-aesthetic", note: "distinct landscape character" },
  ],
  "vegetated-buffer-flower-strips": [
    {
      id: "soil-health-fertility",
      note: "improved soil structure, nutrient cycling, and organic matter content",
    },
    {
      id: "erosion-control",
      note: "slope stabilisation and prevention of runoff",
    },
    { id: "carbon-sequestration" },
    { id: "water-retention", note: "reduced surface runoff" },
    {
      id: "water-regulation",
      note: "improved infiltration, retention, and reduced nutrient leaching",
    },
    { id: "biodiversity-enhancement", note: "above- and below-ground" },
    {
      id: "natural-pest-control",
      note: "support for beneficial insects and natural enemies",
    },
    {
      id: "climate-regulation",
      note: "local microclimate regulation and reduced temperature extremes",
    },
    {
      id: "pollination-services",
      note: "food and habitat resources for pollinators",
    },
    { id: "landscape-aesthetics" },
  ],
  "dry-stone-walls": [
    { id: "erosion-control", note: "slope stabilisation" },
    { id: "water-retention", note: "reduced surface runoff" },
    { id: "climate-regulation", note: "reduced temperature extremes" },
    {
      id: "water-regulation",
      note: "improved infiltration, retention, and reduced nutrient leaching",
    },
    {
      id: "habitat-provision",
      note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
    },
    {
      id: "biodiversity-enhancement",
      note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
    },
    {
      id: "cultural-heritage",
      note: "preservation of traditional knowledge and historical land-use practices",
    },
    {
      id: "landscape-aesthetics",
      note: "distinct landscape character and enhanced recreational value",
    },
  ],
  "terrace-restoration-management": [
    { id: "erosion-control", note: "slope stabilisation" },
    {
      id: "water-regulation",
      note: "improved infiltration, retention, and reduced nutrient leaching",
    },
    {
      id: "climate-resilience",
      note: "enhanced stability of vineyard systems under extreme weather conditions",
    },
    {
      id: "habitat-provision",
      note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
    },
    {
      id: "biodiversity-enhancement",
      note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
    },
    {
      id: "cultural-heritage",
      note: "preservation of traditional knowledge and historical land-use practices",
    },
    {
      id: "landscape-aesthetics",
      note: "distinct landscape character and enhanced recreational value",
    },
  ],
} as const satisfies Record<
  string,
  readonly EbaStrategyEcosystemServiceEntry[]
>;

export const getEbaStrategyEcosystemServices = (slug: string) =>
  ebaStrategyEcosystemServices[
    slug as keyof typeof ebaStrategyEcosystemServices
  ] ?? [];

export const getEbaStrategySlugsByEcosystemService = (
  serviceId: EbaEcosystemServiceId,
) =>
  Object.entries(ebaStrategyEcosystemServices).flatMap(([slug, services]) =>
    services.some((service) => service.id === serviceId) ? [slug] : [],
  );
