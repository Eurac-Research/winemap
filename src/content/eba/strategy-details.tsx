import type { ReactNode } from "react";
import type { EbaEcosystemServiceId } from "@/content/eba/ecosystem-services";
import type { EbaPotentialChallengeId } from "@/content/eba/potential-challenges";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";

export type EbaFact = {
  label: string;
  value: ReactNode;
};

export type EbaSectionContent = {
  id: string;
  title: string;
  children: ReactNode;
};

export type EbaVideoContent = {
  id: string;
  title: string;
  youtubeId: string;
  caption?: string;
};

export type EbaStrategyChallenge = {
  id: EbaPotentialChallengeId;
  details?: ReactNode;
};

export type EbaEcosystemServiceEntry = {
  id: EbaEcosystemServiceId;
  note?: string;
}

export type EbaStrategyDetailContent = {
  slug: string;
  facts?: EbaFact[];
  about?: ReactNode;
  ecosystemServices?: EbaEcosystemServiceEntry[];
  challenges?: EbaStrategyChallenge[];
  sections?: EbaSectionContent[];
  videos?: EbaVideoContent[];
  aside?: ReactNode;
};

export const ebaStrategyDetails: EbaStrategyDetailContent[] = [
  {
    slug: "dry-stone-walls",
    about: (
      <>
        <p>
          Dry-stone walls are traditional masonry structures built without
          binders such as mortar or cement, using locally sourced stones often
          collected from cultivated land or nearby quarries. Their construction
          relies on a foundation of large blocks, successive layers of coarser
          material, and smaller stones filling the gaps to ensure stability,
          with wall dimensions adapted to slope conditions and typically
          tapering towards the top. The dry laying allows rainwater drainage and
          is often combined with a crushed stone backing to reduce hydrostatic
          pressure.
        </p>
        <p>
          Dry-stone walls are integral components of terraced and agricultural
          landscapes, shaped over centuries through the interaction between
          human management and natural processes. They are considered
          &quot;living&quot; structures due to their ecological functions and
          interactions within the environment. Along with other structural
          elements such as hedgerows and stone heaps, dry-stone walls create
          valuable{" "}
          <GlossaryTermPopover id="ecological-niche">
            ecological niches
          </GlossaryTermPopover>{" "}
          in agricultural landscapes, particularly in viticultural areas.
        </p>
      </>
    ),
    ecosystemServices: [
      {id: "erosion-control", note: "slope stabilisation"},
      {id: "water-retention", note: "reduced surface runoff"},
      {id: "microclimate-regulation", note: "reduced temperature extremes"},
      {id: "water-regulation", note: "improved infiltration, retention, and reduced nutrient leaching"},
      {id: "habitat-provision", note: "microhabitats for plants, invertebrates, reptiles, and small mammals"},
      {id: "biodiversity-conservation"},
      {id: "cultural-heritage", note: "preservation of traditional knowledge and historical land-use practices"},
      {id: "landscape-aesthetic-value", note: "distinct landscape character"},
      {id: "outdoor-recreation", note: "enhanced recreational value"},
    ],
    challenges: [
      {
        id: "management-labour-costs",
        details:
          "The construction and maintenance of dry-stone walls are labour-intensive and require skilled craftspeople, which can make them less economically viable compared to modern concrete alternatives.",
      },
      {
        id: "technical-material-requirements",
        details:
          "Long-term stability depends on correct construction techniques and solid foundations, while sourcing suitable local stone can pose logistical challenges.",
      },
      {
        id: "abandonment-degradation",
        details:
          "Agricultural intensification and land abandonment threaten traditional landscapes featuring dry-stone walls. The adoption of modern materials has led to the neglect of these structures, which are also vulnerable to damage from farming activities and collapse, leading to the degradation of terraced landscapes.",
      },
    ],
  },
  {
    slug: "agroforestry",
    about: (
      <p>
        Agroforestry is an integrated agricultural practice that combines
        traditional farming techniques with forest management, integrating woody
        and perennial plants with herbaceous crops and/or animal husbandry. This
        approach aims to create land-use systems that are more productive,
        healthy, diversified, and sustainable. The integration of trees, shrubs,
        annual crops, and animals into vineyards is an ancient practice,
        particularly in the Mediterranean region.
      </p>
    ),
    ecosystemServices: [
      {id: "soil-health-improvement", note: "enhanced organic matter, nutrient cycling, and soil structure"},
      {id: "erosion-control", note: "root stabilisation"},
      {id: "water-retention", note: "reduced surface runoff"},
      {id: "microclimate-regulation", note: "wind buffering, shading, and temperature moderation"},
      {id: "habitat-provision", note: "refuge, food resources, and ecological connectivity"},
      {id: "biodiversity-conservation"},
      {id: "natural-pest-control", note: "support for beneficial insects and natural enemies"},
      {id: "water-regulation", note: "improved infiltration and reduced nutrient leaching"},
      {id: "increased-production", note: "multiple outputs such as crops, fodder, timber, or non-timber products"},
      {id: "economic-diversification"},
      {id: "cultural-heritage", note: "cultural identity, structural diversity "},
      {id: "landscape-aesthetic-value", note: "visual character of agricultural landscapes"},
    ],
    challenges: [
      {
        id: "management-labour-costs",
        details:
          "Agroforestry systems require more complex management, including additional training and careful machinery use, which can increase labour demands and costs compared to monocultures, especially during establishment.",
      },
      {
        id: "yield-uncertainty-economic-viability",
        details:
          "The transition from conventional to nature-based agriculture may result in temporary yield reductions, particularly in the early years, while the full land-use and economic potential of by-product-producing species such as poplar or oak is not always ensured due to local management constraints.",
      },
      {
        id: "resource-competition",
        details:
          "Even though trees can enhance water availability, there is a potential for competition for water and nutrients between trees and the vine, particularly in arid regions or during establishment.",
      },
    ],
    sections: [
      {
        id: "types",
        title: "The different types of agroforestry",
        children: (
          <>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Silvo-arable systems involve growing tree species such as woody
                plants or fruit trees alongside herbaceous crops.
              </li>
              <li>
                Forestry and pastoral systems combine livestock with
                arboriculture, either for wood or fruit production.
              </li>
              <li>
                Cultivations in the forest primarily focus on non-wood products
                like mushrooms and berries.
              </li>
            </ul>
            <p>
              Agroforestry emphasises long-term land-use practices and woodlot
              management, meeting criteria of being intensive, interactive, and
              integrated. It is a nature-based solution that supports the
              development of multifunctional landscapes and contributes to
              enhanced climate resilience.
            </p>
          </>
        ),
      },
    ],
  },
  {
    slug: "landscape-elements",
    about: (
      <>
        <p>
          Landscape elements such as hedges, isolated trees, and shrubs are
          forms of plant diversification integrated into agricultural landscapes
          to enhance their ecological functions and promote sustainability. As
          nature-based solutions, these elements leverage ecosystem processes to
          provide environmental, social, and economic benefits.
        </p>
        <p>
          Woody plants increase the compositional and configurational diversity
          of the cultural landscape, strengthening habitat connectivity and
          supporting biodiversity. They provide shelter, food resources, and
          breeding sites for a wide range of species, including pollinators and
          natural enemies of pests.
        </p>
        <p>
          The establishment, maintenance, or conservation of landscape elements
          plays a key role in creating valuable ecological niches and enhancing
          the resilience of agricultural landscapes to environmental pressures
          and climate variability.
        </p>
      </>
    ),
    ecosystemServices: [
      {id: "habitat-provision", note: "refuge, food resources, and ecological connectivity"},
      {id: "biodiversity-conservation"},
      {id: "microclimate-regulation", note: "wind buffering, shading, and temperature moderation"},
      {id: "water-regulation", note: "improved infiltration, retention, and reduced nutrient leaching"},
      {id: "soil-health-improvement", note: "enhanced organic matter, nutrient cycling, and soil structure"},
      {id: "erosion-control", note: "root stabilisation"},
      {id: "water-retention", note: "reduced surface runoff"},
      {id: "natural-pest-control", note: "support for beneficial insects and natural enemies"},
      {id: "cultural-heritage", note: "cultural identity"},
      {id: "landscape-aesthetic-value", note: "structural diversity and visual character of agricultural landscapes"},
    ],
    challenges: [
      {
        id: "water-competition",
        details:
          "While deep-rooted trees can enhance water availability through hydraulic lift, competition for water can still occur if not carefully managed.",
      },
      {
        id: "management-labour-costs",
        details:
          "Hedges require regular and professional maintenance to ensure their long-term ecological functions.",
      },
    ],
  },
];

export const getEbaStrategyDetailBySlug = (slug: string) =>
  ebaStrategyDetails.find((strategy) => strategy.slug === slug);
