import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";

export const metadata = {
  slug: "legal-frameworks",
  title: "Legal Frameworks",
  description:
    "See how EU rules and participatory approaches shape vineyard management and wine regions.",
  order: 1,
} satisfies TopicMetadata;

export default function LegalFrameworksTopic() {
  return (
    <>
      <p>
        Across Europe, wine production and vineyard management are governed by a
        dense network of regulations. The EU framework covers subjects ranging
        from agricultural-market organisation and financing through the{" "}
        <GlossaryTermPopover id="common-agricultural-policy">
          Common Agricultural Policy (CAP)
        </GlossaryTermPopover>{" "}
        to planting, plant-health, product-characteristic, and vine-planting
        authorisation rules.
      </p>

      <p>
        Local participatory approaches, such as{" "}
        <GlossaryTermPopover id="living-lab">living labs</GlossaryTermPopover>,
        complement legal frameworks by bringing winegrowers, researchers, and
        communities together to develop solutions for vineyard management,
        regional identity, and wine quality. Making this knowledge accessible
        helps stakeholders share experience and build a sustainable future for
        wine regions.
      </p>
    </>
  );
}
