import type { GlossaryTerm } from "@/content/glossary";

export type EbaServiceIcon =
  | "biodiversity"
  | "heritage"
  | "landscape"
  | "pest-control"
  | "production"
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
  },
  {
    id: "water-retention",
    label: "Water retention",
    icon: "water",
  },
  {
    id: "microclimate-regulation",
    label: "Microclimate regulation",
    icon: "temperature",
  },
  {
    id: "water-regulation",
    label: "Water regulation",
    icon: "water",
  },
  {
    id: "habitat-provision-biodiversity-conservation",
    label: "Habitat provision and biodiversity conservation",
    icon: "biodiversity",
  },
  {
    id: "cultural-heritage",
    label: "Cultural heritage",
    icon: "heritage",
  },
  {
    id: "landscape-aesthetic-recreation",
    label: "Landscape aesthetic and outdoor recreation",
    icon: "landscape",
  },
  {
    id: "soil-health-improvement",
    label: "Soil health improvement",
    icon: "soil",
  },
  {
    id: "natural-pest-control",
    label: "Natural pest control",
    icon: "pest-control",
  },
  {
    id: "production-economic-diversification",
    label: "Increased production and economic diversification",
    icon: "production",
  },
] as const satisfies readonly EbaEcosystemService[];

export type EbaEcosystemServiceId = (typeof ebaEcosystemServices)[number]["id"];

export const getEbaEcosystemServiceById = (id: EbaEcosystemServiceId) =>
  ebaEcosystemServices.find((service) => service.id === id);

export const getEbaEcosystemServiceGlossaryHref = (
  service: EbaEcosystemService,
) => (service.glossaryId ? `/about/glossary#${service.glossaryId}` : undefined);
