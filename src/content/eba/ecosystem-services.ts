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
    glossaryId: "landscape-aesthetic-value",
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
    glossaryId: "natural-pest-control",
  },
  {
    id: "grape-production",
    label: "Grape production",
    icon: "production",
    glossaryId: "increased-production",
  },
  {
    id: "pollination-services",
    label: "Pollination services",
    icon: "biodiversity",
  },
  {
    id: "water-quality",
    label: "Water quality",
    icon: "water",
    glossaryId: "water-regulation",
  },
  {
    id: "economic-diversification",
    label: "Economic diversification",
    icon: "economy",
    glossaryId: "economic-diversification",
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
