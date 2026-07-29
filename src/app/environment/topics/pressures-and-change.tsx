import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";

export const metadata = {
  slug: "pressures-and-change",
  title: "Pressures and Change",
  description:
    "Explore the climate and land-use pressures transforming European vineyard landscapes.",
  order: 2,
} satisfies TopicMetadata;

export default function PressuresAndChangeTopic() {
  return (
    <>
      <p>
        The ecological balance that underpins vineyard landscapes is
        increasingly under pressure. These systems are sensitive to
        environmental and human-induced changes that can disrupt the provision
        of key ecosystem services.
      </p>

      <p>
        Climate change is one of the most pressing challenges. Shifts in
        temperature and precipitation already affect vine growth cycles, grape
        composition, and the suitability of traditional wine-growing areas. They
        can reshape productivity, wine identity, and the regions where
        particular varieties thrive, requiring changes in cultivation,
        varieties, or even vineyard locations.
      </p>

      <p>
        Vineyard landscapes are also changing through{" "}
        <GlossaryTermPopover id="intensification">
          agricultural intensification
        </GlossaryTermPopover>
        . Competition and consumer demand have encouraged more specialised,
        intensive production systems that simplify landscape structures, reduce
        diversity, and prioritise yield. These practices may improve short-term
        productivity while weakening environmental sustainability.
      </p>

      <p>
        Expanding monocultures and greater use of fertilisers and pesticides
        have contributed to biodiversity loss and degradation of essential{" "}
        <GlossaryTermPopover id="ecosystem-functions">
          ecosystem functions
        </GlossaryTermPopover>
        . Soil fertility, water regulation, and natural pest control are
        increasingly compromised, making vineyards more vulnerable to external
        disturbances. At the same time, less competitive small-scale vineyards
        may be abandoned or converted to other land uses.
      </p>
    </>
  );
}
