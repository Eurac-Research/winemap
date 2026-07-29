import Image from "next/image";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";

export const metadata = {
  slug: "geographic-indications",
  title: "Geographic Indications",
  description:
    "Learn how Protected Designations of Origin protect the quality and identity of European wines.",
  order: 2,
} satisfies TopicMetadata;

export default function GeographicIndicationsTopic() {
  return (
    <>
      <p>
        Europe is home to some of the world&apos;s most prestigious wine
        regions. The European Union&apos;s quality scheme for{" "}
        <GlossaryTermPopover id="protected-designation-of-origin">
          Protected Designation of Origin (PDO)
        </GlossaryTermPopover>{" "}
        helps maintain the integrity and quality of these wines by setting rules
        for their production, labelling, and promotion within defined regions.
        Only wines that meet the applicable regional production criteria may
        carry the PDO label, protecting their reputation and authenticity.
      </p>

      <a
        className="article-media-link block"
        target="_blank"
        rel="noopener noreferrer"
        href="https://agriculture.ec.europa.eu/farming/geographical-indications-and-quality-schemes/geographical-indications-and-quality-schemes-explained_en#pdo"
      >
        <figure className="article-figure flex flex-col items-center px-4 text-center">
          <Image
            src="/icons/pdo-label.svg"
            alt="PDO logo"
            width={212}
            height={212}
            className="mx-auto"
          />
          <figcaption className="article-caption">
            Official PDO logo from the European Commission
          </figcaption>
        </figure>
      </a>

      <p>
        The PDO system is extensive and complex, covering thousands of wine
        types across Europe. WINEMAP brings its geographic and regulatory
        information together in an accessible form.
      </p>
    </>
  );
}
