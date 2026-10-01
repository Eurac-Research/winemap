export type EbaChallengeIcon =
  | "cost"
  | "degradation"
  | "resources"
  | "technical"
  | "viability"
  | "water";

export type EbaPotentialChallenge = {
  id: string;
  label: string;
  icon: EbaChallengeIcon;
};

export const ebaPotentialChallenges = [
  {
    id: "management-labour-costs",
    label: "Management and labour costs",
    icon: "cost",
  },
  {
    id: "technical-material-requirements",
    label: "Technical requirements and material sourcing",
    icon: "technical",
  },
  {
    id: "abandonment-degradation",
    label: "Abandonment and degradation",
    icon: "degradation",
  },
  {
    id: "yield-uncertainty-economic-viability",
    label: "Yield uncertainty and economic viability",
    icon: "viability",
  },
  {
    id: "resource-competition",
    label: "Resource competition",
    icon: "resources",
  },
  {
    id: "water-competition",
    label: "Water competition",
    icon: "water",
  },
] as const satisfies readonly EbaPotentialChallenge[];

export type EbaPotentialChallengeId =
  (typeof ebaPotentialChallenges)[number]["id"];

export const getEbaPotentialChallengeById = (
  id: EbaPotentialChallengeId,
): EbaPotentialChallenge | undefined =>
  ebaPotentialChallenges.find((challenge) => challenge.id === id);
