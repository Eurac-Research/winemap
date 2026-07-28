import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { AdaptationTopicMetadata } from "../topics.generated";

export const metadata = {
  slug: "multifunctional-vineyards",
  title: "Multifunctional Vineyards",
  description:
    "See how vineyard landscapes can support production, nature, and cultural value together.",
  order: 2,
} satisfies AdaptationTopicMetadata;

export default function MultifunctionalVineyardsTopic() {
  return (
    <>
      <p>
        Translating Ecosystem-based Adaptation into practice means managing
        vineyards as multifunctional systems that deliver multiple benefits at
        once. Beyond grape production, vineyard landscapes can provide{" "}
        <GlossaryTermPopover id="ecosystem-services">
          ecosystem services
        </GlossaryTermPopover>
        , including biodiversity conservation, soil protection, water
        regulation, and climate mitigation.
      </p>

      <p>
        This perspective moves beyond single outputs and recognises vineyards as
        systems in which ecological, economic, and social functions interact. It
        can reconcile agricultural production with nature conservation by
        designing for productivity, environmental sustainability, and cultural
        values together.
      </p>

      <p>
        Multifunctional vineyards can therefore become more resilient to
        changing conditions while helping preserve the identity and long-term
        viability of European wine-growing landscapes.
      </p>
    </>
  );
}
