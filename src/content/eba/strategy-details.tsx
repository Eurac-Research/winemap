import type { ReactNode } from "react";
import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm"

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

export type EbaStrategyDetailContent = {
  slug: string;
  facts?: EbaFact[];
  sections?: EbaSectionContent[];
  videos?: EbaVideoContent[];
  aside?: ReactNode;
};

export const ebaStrategyDetails: EbaStrategyDetailContent[] = [
  {
    slug: "dry-stone-walls",
    sections: [
      {
        id: "about",
        title: "About this EbA strategy",
        children: (
        <>
          <p>
            Dry-stone walls are traditional masonry structures built without binders such as mortar or cement, using
            locally sourced stones often collected from cultivated land or nearby quarries. Their construction relies on
            a foundation of large blocks, successive layers of coarser material, and smaller stones filling the gaps to ensure
            stability, with wall dimensions adapted to slope conditions and typically tapering towards the top. The dry
            laying allows rainwater drainage and is often combined with a crushed stone backing to reduce hydrostatic
            pressure.
          </p>
          <p>
            Dry-stone walls are integral components of terraced and agricultural landscapes, shaped over centuries
            through the interaction between human management and natural processes. They are considered “living”
            structures due to their ecological functions and interactions within the environment. Along with other
            structural elements such as hedgerows and stone heaps, dry-stone walls, create valuable <GlossaryTermPopover id="ecological-niche">ecological niches</GlossaryTermPopover>{" "}
            in agricultural landscapes, particularly in viticultural areas.
          </p>
        </>
            )
      },
      {
        id: "ecosystem-services",
        title: "Key ecosystem services provided",
        children: (
          <>
          <ul className="list-disc space-y-2 pl-6">
            <li>Erosion control (slope stabilisation)</li>
            <li>Water retention (reduced surface runoff)</li>
            <li>Microclimate regulation (reduced temperature extremes)</li>
            <li>Water regulation (improved infiltration, retention, and reduced nutrient leaching)</li>
            <li>Habitat provision and biodiversity conservation (microhabitats for plants, invertebrates, reptiles, and small mammals)</li>
            <li>Cultural heritage (preservation of traditional knowledge and historical land-use practices)</li>
            <li>Landscape aesthetic and outdoor recreation (distinct landscape character and enhanced recreational value)</li>
          </ul>
          </>
        )
      },
      {
        id: "challenges",
        title: "Potential challenges",
        children: (
          <>
          <p>
            <span className="font-semibold">Management and labour costs:</span> The construction and maintenance of dry-stone walls are labour-intensive and require
            skilled craftspeople, which can make them less economically viable compared to modern concrete alternatives.
          </p>
          <p>
            <span className="font-semibold">Technical requirements and material sourcing:</span> Long-term stability depends on correct construction techniques
            and solid foundations, while sourcing suitable local stone can pose logistical challenges.
          </p>
          <p>
            <span className="font-semibold">Abandonment and degradation:</span> Agricultural intensification and land abandonment threaten traditional landscapes
            featuring dry-stone walls. The adoption of modern materials has led to the neglect of these structures, which are also
            vulnerable to damage from farming activities and collapse, leading to the degradation of terraced landscapes.
          </p>
          </>
        )
      }
    ]
  },
  {
    slug: "agroforestry",
    sections: [
      {
        id: "about",
        title: "About this EbA strategy",
        children: (
        <>
          <p>
            Agroforestry is an integrated agricultural practice that combines traditional farming techniques with
            forest management, integrating woody and perennial plants with herbaceous crops and/or animal
            husbandry. This approach aims to create land-use systems that are more productive, healthy, diversified,
            and sustainable. The integration of trees, shrubs, annual crops, and animals into vineyards is an ancient
            practice, particularly in the Mediterranean region.
          </p>
        </>
            )
      },
      {
        id: "types",
        title: "The different types of agroforestry",
        children: (
        <>
          <ul className="list-disc space-y-2 pl-6">
            <li>Silvo-arable systems involve growing tree species (woody plants, fruit trees, or others) alongside herbaceous crops.</li>
            <li>Forestry and pastoral systems combine livestock with arboriculture, either for wood or fruit production.</li>
            <li>Cultivations in the forest primarily focus on non-wood products like mushrooms and berries.</li>
          </ul>
          <p>
            Agroforestry emphasises long-term land-use practices and woodlot management, meeting criteria of being intensive,
            interactive, and integrated. It is a nature-based solution that supports the development of multifunctional landscapes
            and contributes to enhanced climate resilience.
          </p>
        </>
            )
      },
      {
        id: "ecosystem-services",
        title: "Key ecosystem services provided",
        children: (
          <>
          <ul className="list-disc space-y-2 pl-6">
            <li>Soil health improvement (enhanced organic matter, nutrient cycling, and soil structure)</li>
            <li>Erosion control (root stabilisation)</li>
            <li>Water retention (reduced surface runoff)</li>
            <li>Microclimate regulation (wind buffering, shading, and temperature moderation)</li>
            <li>Habitat provision and biodiversity conservation (refuge, food resources, and ecological connectivity)</li>
            <li>Natural pest control (support for beneficial insects and natural enemies)</li>
            <li>Increased overall production and economic diversification (multiple outputs such as crops, fodder, timber, or non-timber products)</li>
            <li>Cultural and landscape aesthetic value (cultural identity, structural diversity and visual character of agricultural landscapes)</li>
          </ul>
          </>
        )
      },
      {
        id: "challenges",
        title: "Potential challenges",
        children: (
          <>
          <p>
            <span className="font-semibold">Management and labour costs:</span> Agroforestry systems require more complex management, including additional training
              and careful machinery use, which can increase labour demands and costs compared to monocultures, especially during
              establishment.
          </p>
          <p>
            <span className="font-semibold">Yield uncertainty and economic viability:</span> The transition from conventional to nature-based agriculture may result
              in temporary yield reductions, particularly in the early years, while the full land-use and economic potential of by-product-
              producing species (e.g. poplar or oak) is not always ensured due to local management constraints.
          </p>
          <p>
            <span className="font-semibold">Resource competition:</span> Even though trees can enhance water availability, there is a potential for competition for water
            and nutrients between trees and the vine, particularly in arid regions or during establishment.
          </p>
          </>
        )
      }
    ]
  },
  {
    slug: "landscape-elements",
    sections: [
      {
        id: "about",
        title: "About this EbA strategy",
        children: (
        <>
          <p>
            Landscape elements such as hedges, isolated trees, and shrubs are forms of plant diversification integrated
            into agricultural landscapes to enhance their ecological functions and promote sustainability. As nature-
            based solutions, these elements leverage ecosystem processes to provide environmental, social, and economic
            benefits.
          </p>
          <p>
            Woody plants increase the compositional and configurational diversity of the cultural landscape,
            strengthening habitat connectivity and supporting biodiversity. They provide shelter, food resources,
            and breeding sites for a wide range of species, including pollinators and natural enemies of pests.
          </p>
          <p>
            The establishment, maintenance, or conservation of landscape elements plays a key role in creating valuable
            ecological niches and enhancing the resilience of agricultural landscapes to environmental pressures and
            climate variability.
          </p>
        </>
            )
      },
      {
        id: "ecosystem-services",
        title: "Key ecosystem services provided",
        children: (
          <>
          <ul className="list-disc space-y-2 pl-6">
            <li>Habitat provision and biodiversity conservation (refuge, food resources, and ecological connectivity)</li>
            <li>Microclimate regulation (wind buffering, shading, and temperature moderation)</li>
            <li>Water regulation (improved infiltration, retention, and reduced nutrient leaching)</li>
            <li>Soil health improvement (enhanced organic matter, nutrient cycling, and soil structure)</li>
            <li>Erosion control (root stabilisation)</li>
            <li>Water retention (reduced surface runoff)</li>
            <li>Natural pest control (support for beneficial insects and natural enemies)</li>
            <li>Cultural and landscape aesthetic value (cultural identity, structural diversity and visual character of agricultural landscapes)</li>
          </ul>
          </>
        )
      },
      {
        id: "challenges",
        title: "Potential challenges",
        children: (
          <>
          <p>
            <span className="font-semibold">Water competition:</span> While deep-rooted trees can enhance water availability through hydraulic lift, competition for water
              can still occur if not carefully managed.
          </p>
          <p>
            <span className="font-semibold">Management and labour costs:</span> Hedges require regular and professional maintenance to ensure their long-term ecological
              functions.
          </p>
          </>
        )
      }
    ]
  }
];

export const getEbaStrategyDetailBySlug = (slug: string) =>
  ebaStrategyDetails.find((strategy) => strategy.slug === slug);
