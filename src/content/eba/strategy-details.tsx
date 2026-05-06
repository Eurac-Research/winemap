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
  }
];

export const getEbaStrategyDetailBySlug = (slug: string) =>
  ebaStrategyDetails.find((strategy) => strategy.slug === slug);
