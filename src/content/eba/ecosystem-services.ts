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
    id: "microclimate-regulation",
    label: "Microclimate regulation",
    icon: "temperature",
    glossaryId: "microclimate-regulation",
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
    id: "biodiversity-conservation",
    label: "Biodiversity conservation",
    icon: "biodiversity",
    glossaryId: "biodiversity-conservation",
  },
  {
    id: "cultural-heritage",
    label: "Cultural heritage",
    icon: "heritage",
    glossaryId: "cultural-heritage",
  },
  {
    id: "landscape-aesthetic-value",
    label: "Landscape aesthetic value",
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
    id: "soil-health-improvement",
    label: "Soil health improvement",
    icon: "soil",
    glossaryId: "soil-health-improvement",
  },
  {
    id: "natural-pest-control",
    label: "Natural pest control",
    icon: "pest-control",
    glossaryId: "natural-pest-control",
  },
  {
    id: "increased-production",
    label: "Increased production",
    icon: "production",
    glossaryId: "increased-production",
  },
  {
    id: "economic-diversification",
    label: "Economic diversification",
    icon: "economy",
    glossaryId: "economic-diversification",
  },
] as const satisfies readonly EbaEcosystemService[];

export type EbaEcosystemServiceId = (typeof ebaEcosystemServices)[number]["id"];

export const getEbaEcosystemServiceById = (id: EbaEcosystemServiceId) =>
  ebaEcosystemServices.find((service) => service.id === id);

export const getEbaEcosystemServiceGlossaryHref = (
  service: EbaEcosystemService,
) => (service.glossaryId ? `/about/glossary#${service.glossaryId}` : undefined);
