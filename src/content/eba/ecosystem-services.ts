import type { GlossaryTerm } from "@/content/glossary";

export type EbaServiceIcon =
  | "biodiversity"
  | "economy"
  | "habitat"
  | "heritage"
  | "landscape"
  | "pest-control"
  | "production"
  | "recreation"
  | "soil"
  | "slope"
  | "temperature"
  | "water";

export type EbaEcosystemService = {
  id: string;
  label: string;
  icon: EbaServiceIcon;
  glossaryId?: GlossaryTerm["id"];
};

export const ebaEcosystemServices = [
  {
    id: "erosion-control",
    label: "Erosion control",
    icon: "slope",
    glossaryId: "erosion-control",
  },
  {
    id: "water-retention",
    label: "Water retention",
    icon: "water",
    glossaryId: "water-retention",
  },
  {
    id: "climate-regulation",
    label: "Climate regulation",
    icon: "temperature",
    glossaryId: "climate-regulation",
  },
  {
    id: "climate-resilience",
    label: "Climate resilience",
    icon: "temperature",
    glossaryId: "climate-resilience",
  },
  {
    id: "water-regulation",
    label: "Water regulation",
    icon: "water",
    glossaryId: "water-regulation",
  },
  {
    id: "habitat-provision",
    label: "Habitat provision",
    icon: "habitat",
    glossaryId: "habitat-provision",
  },
  {
    id: "carbon-sequestration",
    label: "Carbon sequestration",
    icon: "soil",
    glossaryId: "carbon-sequestration",
  },
  {
    id: "biodiversity-enhancement",
    label: "Biodiversity enhancement",
    icon: "biodiversity",
    glossaryId: "biodiversity-enhancement",
  },
  {
    id: "cultural-heritage",
    label: "Cultural heritage",
    icon: "heritage",
    glossaryId: "cultural-heritage",
  },
  {
    id: "landscape-aesthetics",
    label: "Landscape aesthetics",
    icon: "landscape",
    glossaryId: "landscape-aesthetics",
  },
  {
    id: "outdoor-recreation",
    label: "Outdoor recreation",
    icon: "recreation",
    glossaryId: "outdoor-recreation",
  },
  {
    id: "soil-health-fertility",
    label: "Soil health and fertility",
    icon: "soil",
    glossaryId: "soil-health-and-fertility",
  },
  {
    id: "weed-control",
    label: "Weed control",
    icon: "pest-control",
    glossaryId: "weed-control",
  },
  {
    id: "natural-pest-control",
    label: "Natural pest control",
    icon: "pest-control",
    glossaryId: "natural-pest-control",
  },
  {
    id: "natural-pest-pathogen-control",
    label: "Natural pest and pathogen control",
    icon: "pest-control",
    glossaryId: "natural-pest-pathogen-control",
  },
  {
    id: "grape-production",
    label: "Grape production",
    icon: "production",
    glossaryId: "grape-production",
  },
  {
    id: "pollination-services",
    label: "Pollination services",
    icon: "biodiversity",
    glossaryId: "pollination-services",
  },
  {
    id: "water-quality",
    label: "Water quality",
    icon: "water",
    glossaryId: "water-quality",
  },
  {
    id: "economic-diversification",
    label: "Economic diversification",
    icon: "economy",
    glossaryId: "economic-diversification",
  },
  {
    id: "microclimate-regulation",
    label: "Microclimate regulation",
    icon: "temperature",
    glossaryId: "microclimate-regulation",
  },
  {
    id: "micro-climate-regulation",
    label: "Micro-climate regulation",
    icon: "temperature",
    glossaryId: "microclimate-regulation",
  },
  {
    id: "habitat-provision-and-biodiversity-conservation",
    label: "Habitat provision and biodiversity conservation",
    icon: "habitat",
    glossaryId: "habitat-provision-and-biodiversity-conservation",
  },
  {
    id: "cultural-heritage-and-landscape-aesthetics",
    label: "Cultural heritage and landscape aesthetics",
    icon: "heritage",
    glossaryId: "cultural-heritage-and-landscape-aesthetics",
  },
  {
    id: "improved-grape-quality-and-production-stability",
    label: "Improved grape quality and production stability",
    icon: "production",
    glossaryId: "improved-grape-quality-and-production-stability",
  },
  {
    id: "natural-weed-and-vegetation-control",
    label: "Natural weed and vegetation control",
    icon: "pest-control",
    glossaryId: "natural-weed-and-vegetation-control",
  },
  {
    id: "flood-and-erosion-control",
    label: "Flood and erosion control",
    icon: "slope",
    glossaryId: "flood-and-erosion-control",
  },
  {
    id: "water-quality-improvement",
    label: "Water quality improvement",
    icon: "water",
    glossaryId: "water-quality-improvement",
  },
  {
    id: "drought-mitigation-through-increased-landscape-water-retention",
    label: "Drought mitigation through increased landscape water retention",
    icon: "water",
    glossaryId:
      "drought-mitigation-through-increased-landscape-water-retention",
  },
  {
    id: "agrobiodiversity-conservation",
    label: "Agrobiodiversity conservation",
    icon: "biodiversity",
    glossaryId: "agrobiodiversity-conservation",
  },
  {
    id: "sustainable-grape-production",
    label: "Sustainable grape production",
    icon: "production",
    glossaryId: "sustainable-grape-production",
  },
  {
    id: "reduced-plant-protection-requirements",
    label: "Reduced plant protection requirements",
    icon: "pest-control",
    glossaryId: "reduced-plant-protection-requirements",
  },
  {
    id: "pollination",
    label: "Pollination",
    icon: "biodiversity",
    glossaryId: "pollination",
  },
  {
    id: "landscape-aesthetic",
    label: "Landscape aesthetic",
    icon: "landscape",
    glossaryId: "landscape-aesthetic",
  },
  {
    id: "soil-health-improvement",
    label: "Soil health improvement",
    icon: "soil",
    glossaryId: "soil-health-improvement",
  },
  {
    id: "cultural-and-landscape-aesthetic-value",
    label: "Cultural and landscape aesthetic value",
    icon: "heritage",
    glossaryId: "cultural-and-landscape-aesthetic-value",
  },
] as const satisfies readonly EbaEcosystemService[];

export type EbaEcosystemServiceId = (typeof ebaEcosystemServices)[number]["id"];

export const getEbaEcosystemServiceById = (
  id: EbaEcosystemServiceId,
): EbaEcosystemService | undefined =>
  ebaEcosystemServices.find((service) => service.id === id);

export const getEbaEcosystemServiceGlossaryHref = (
  service: EbaEcosystemService,
) => (service.glossaryId ? `/about/glossary#${service.glossaryId}` : undefined);
