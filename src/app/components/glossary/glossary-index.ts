export type GlossaryReference = {
  label: string;
  href?: string;
  type?: "literature" | "website" | "doi";
};

export type GlossaryTerm = {
  id: string;
  term: string;
  aliases?: string[];
  definition: string;
  references?: GlossaryReference[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "adaptive-capacity",
    term: "Adaptive capacity",
    aliases: ["adaptation capacity", "capacity for adaptation"],
    definition:
      "The ability to cope with changes, reduce damage, and respond to new conditions or opportunities.",
  },
  {
    id: "bioclimatic-indicator",
    term: "Bioclimatic indicator",
    aliases: ["bioclimatic indicators"],
    definition:
      "Diagnostic indicators used to characterize aspects of the climate system and link them to biological responses, helping to monitor conditions such as drought, heat stress, or temperature accumulation that affect crop growth, yields, and phenological stages.",
  },
  {
    id: "protected-designation-of-origin",
    term: "Protected Designation of Origin",
    aliases: ["PDO", "Designation of Origin"],
    definition:
      "A label that protects the name of a product from a specific region, where all ingredients and production steps come from that area and follow specific production methods.",
  },
  {
    id: "dry-stone-construction",
    term: "Dry-stone construction",
    aliases: ["dry stones", "dry-stone walls"],
    definition: "Building with stones without using any binding material.",
  },
  {
    id: "ecosystem-services",
    term: "Ecosystem services",
    definition:
      "Benefits nature provides to humans, such as soil fertility, water regulation, or pest control in vineyards.",
  },
  {
    id: "ecosystem-based-adaptation",
    term: "Ecosystem-based adaptation",
    aliases: ["EbA", "ecosystem based adaptation"],
    definition:
      "The use of biodiversity and ecosystem services to help people adapt to the adverse effects of climate change.",
  },
  {
    id: "erosion",
    term: "Erosion",
    definition:
      "The removal and movement of soil and rock by natural forces such as water, wind, and ice.",
  },
  {
    id: "exposure",
    term: "Exposure",
    definition:
      "The presence of people, ecosystems, or resources in areas where they may be negatively affected by hazards or environmental changes.",
  },
  {
    id: "evapotranspiration",
    term: "Evapotranspiration",
    aliases: ["ET"],
    definition:
      "The combined process of evaporation from soil and plant surfaces and transpiration from plant tissue, resulting in water loss that can increase during heatwaves.",
  },
  {
    id: "landscape",
    term: "Landscape",
    definition:
      "An area made up of different interacting ecosystems forming a repeated pattern.",
  },
  {
    id: "latitude",
    term: "Latitude",
    definition:
      "The distance north or south of the Equator, measured in degrees from 0 to 90, used to describe a location on Earth.",
  },
  {
    id: "living-lab",
    term: "Living Lab",
    aliases: ["living labs"],
    definition:
      "A way of creating and testing solutions with users in real-life situations.",
  },
  {
    id: "naturalness",
    term: "Naturalness",
    definition:
      "The degree to which an ecosystem remains natural, depending on how much it is influenced by humans, how much effort is needed to maintain it, and how many native species are present.",
  },
  {
    id: "net-primary-production",
    term: "Net primary production",
    aliases: ["NPP"],
    definition:
      "The amount of energy or biomass a plant produces after subtracting what it uses for its own respiration.",
  },
  {
    id: "oceanic-climate",
    term: "Oceanic climate",
    definition:
      "A temperate climate with mild temperatures, cool summers, and rainfall spread evenly throughout the year, where the coldest month is above -3 deg C but below +18 deg C. It is typically found between 45 and 65 degrees latitude, often along coastal regions.",
  },
  {
    id: "pesticides",
    term: "Pesticides",
    aliases: ["pesticide"],
    definition:
      "Substances used to control or eliminate pests, including insects, weeds, and fungi.",
  },
  {
    id: "polyphenol",
    term: "Polyphenol",
    aliases: ["polyphenols"],
    definition:
      "Natural compounds synthesized by plants, including flavonoids and non-flavonoids, that influence wine color, flavor, taste, and health-related properties, and whose composition can be affected by climate conditions.",
  },
  {
    id: "resilience",
    term: "Resilience",
    definition:
      "The ability of a system to absorb changes or shocks, maintain its internal relationships, and continue to function or recover after disturbance.",
  },
  {
    id: "sensitivity",
    term: "Sensitivity",
    definition:
      "The degree to which a system or species is affected by climate change or variability, either directly or indirectly.",
  },
  {
    id: "semi-natural-habitats",
    term: "Semi-natural habitats",
    aliases: ["semi-natural habitat", "seminatural habitats"],
    definition:
      "An ecosystem that still retains most of its functions and biodiversity but has been partly modified by human activity.",
  },
  {
    id: "sustainability",
    term: "Sustainability",
    definition:
      "A concept combining long-term continuity and supportability, based on balancing environmental, social, and economic dimensions.",
  },
  {
    id: "sustainable-agriculture",
    term: "Sustainable agriculture",
    definition:
      "Sound management of resources for agriculture to satisfy human needs while preserving or improving the quality of the environment and the conservation of natural resources.",
  },
  {
    id: "vulnerability",
    term: "Vulnerability",
    definition:
      "How likely a system is to be harmed by climate change, depending on its exposure, sensitivity, and ability to adapt, for example a vineyard exposed to drought but with low irrigation capacity.",
  },
  {
    id: "water-balance",
    term: "Water balance",
    definition:
      "The balance between the water entering and leaving a system over a given period.",
  },
];
