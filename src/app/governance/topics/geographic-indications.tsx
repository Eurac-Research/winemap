import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map as MapIcon } from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";

export const metadata = {
  slug: "geographic-indications",
  title: "Geographic Indications",
  description:
    "Learn how Protected Designations of Origin protect the quality and identity of European wines.",
  order: 1,
} satisfies TopicMetadata;

export default function GeographicIndicationsTopic() {
  return (
    <>
      <p>
        Across Europe, wine production and vineyard management are governed by a dense, complex network of regulations. The recent EU framework covers a wide range of topics, such as the organization of the markets in agricultural products and their financing, through the{" "}
        <GlossaryTermPopover id="common-agricultural-policy">
          Common Agricultural Policy (CAP)
        </GlossaryTermPopover>
        . On a technical level, the EU also covers planting and plant health regulations, targeting physical and chemical characteristics of grapevine products and the authorizations for vine plantings and certifications.
      </p>
      <p>
        Besides EU legal frameworks, local participatory approaches, such as{" "}
        <GlossaryTermPopover id="living-lab">living-labs </GlossaryTermPopover>{" "},
        also contribute to developing innovative solutions and ideas for the management and protection of vineyards and wine-regions identities and quality of wines. Making this knowledge accessible allows winemakers and researchers to share knowledge and ensure a sustainable future for wine regions.
      </p>
      <p>
        As Europe is home to some of the world’s most prestigious wine regions, the European Union has established a quality scheme called{" "}
        <GlossaryTermPopover id="protected-designation-of-origin">Protected Designation of Origin (PDO)</GlossaryTermPopover>{" "}
        in order to maintain the integrity and quality of these wines. This system sets rules and regulations for the production, labelling, and promotion of wines within specific regions of Europe. This classification ensures that wines produced within those regions follow strict standards of quality and tradition, protecting the reputation and authenticity of each wine. The PDO designation is granted by the EU, and only wines that are produced within a certain region and meet specific production criteria are allowed to carry the PDO label.
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
        The PDO system is extensive and complex, covering thousands of wine types from various regions in Europe. Until recently, wine enthusiasts and industry professionals had to consult various sources to understand these classifications.
      </p>
      <p>
        This complex system is now easier to navigate, as Eurac Research has published the {" "}
          <Link
            key="pdo-atlas"
            href="map-applications/pdo-atlas"
            className="font-semibold app-accent-text underline underline-offset-4 transition-colors hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--app-accent-text-color)]"
          >
            European PDO-Atlas
          </Link>
        , the first-ever comprehensive map of Europe’s wine regions classified under the PDO system. Additionally, across the WINEMAP Governance you can find accessible information on PDOs and other EU legislation regarding vineyards and wine products. The aim of the WINEMAP Governance is to ensure wine-related stakeholders can learn and better understand the legal management and protection of European vineyards, by offering specific courses and map applications and thereby ensuring the cultural continuity of European wine-growing regions.
      </p>
      {/* <DatawrapperChart
        chartId="DEUDJ/6?dark=true"
        title="Nr. of registered PDOs"
        ariaLabel="Line chart showing the number of registered PDOs over time"
        height={378}
      /> */}   
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild className="w-fit">
          <Link href="/map-applications/pdo-atlas">
            <MapIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Open European PDO Atlas
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </>
  );
}
