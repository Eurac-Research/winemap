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
    id: "agrobiodiversity-conservation",
    label: "Agrobiodiversity conservation",
    icon: "biodiversity",
    glossaryId: "agrobiodiversity-conservation",
  },
  {
    id: "biodiversity-enhancement",
    label: "Biodiversity enhancement",
    icon: "biodiversity",
    glossaryId: "biodiversity-enhancement",
  },
  {
    id: "carbon-sequestration",
    label: "Carbon sequestration",
    icon: "soil",
    glossaryId: "carbon-sequestration",
  },
  {
    id: "climate-resilience",
    label: "Climate resilience",
    icon: "temperature",
    glossaryId: "climate-resilience",
  },
  {
    id: "cultural-heritage",
    label: "Cultural heritage",
    icon: "heritage",
    glossaryId: "cultural-heritage",
  },
  {
    id: "cultural-heritage-and-landscape-aesthetics",
    label: "Cultural heritage and landscape aesthetics",
    icon: "heritage",
    glossaryId: "cultural-heritage-and-landscape-aesthetics",
  },
  {
    id: "erosion-control",
    label: "Erosion control",
    icon: "slope",
    glossaryId: "erosion-control",
  },
  {
    id: "flood-and-erosion-control",
    label: "Flood and erosion control",
    icon: "slope",
    glossaryId: "flood-and-erosion-control",
  },
  {
    id: "grape-production",
    label: "Grape production",
    icon: "production",
    glossaryId: "grape-production",
  },
  {
    id: "habitat-provision",
    label: "Habitat provision",
    icon: "habitat",
    glossaryId: "habitat-provision",
  },
  {
    id: "habitat-provision-and-biodiversity-conservation",
    label: "Habitat provision and biodiversity conservation",
    icon: "habitat",
    glossaryId: "habitat-provision-and-biodiversity-conservation",
  },
  {
    id: "landscape-aesthetics",
    label: "Landscape aesthetics",
    icon: "landscape",
    glossaryId: "landscape-aesthetics",
  },
  {
    id: "microclimate-regulation",
    label: "Microclimate regulation",
    icon: "temperature",
    glossaryId: "microclimate-regulation",
  },
  {
    id: "natural-pest-control",
    label: "Natural pest control",
    icon: "pest-control",
    glossaryId: "natural-pest-control",
  },
  {
    id: "pollination-services",
    label: "Pollination services",
    icon: "biodiversity",
    glossaryId: "pollination-services",
  },
  {
    id: "reduced-plant-protection-requirements",
    label: "Reduced plant protection requirements",
    icon: "pest-control",
    glossaryId: "reduced-plant-protection-requirements",
  },
  {
    id: "soil-health-fertility",
    label: "Soil health and fertility",
    icon: "soil",
    glossaryId: "soil-health-and-fertility",
  },
  {
    id: "water-quality",
    label: "Water quality",
    icon: "water",
    glossaryId: "water-quality",
  },
  {
    id: "water-regulation",
    label: "Water regulation",
    icon: "water",
    glossaryId: "water-regulation",
  },
  {
    id: "water-retention",
    label: "Water retention",
    icon: "water",
    glossaryId: "water-retention",
  },
  {
    id: "weed-control",
    label: "Weed control",
    icon: "pest-control",
    glossaryId: "weed-control",
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
