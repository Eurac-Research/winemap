import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map as MapIcon } from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

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
        A{" "}
        <GlossaryTermPopover id="geographic-indications">
          geographic indication (GI)
        </GlossaryTermPopover>{" "}
        is a name used for a product whose qualities, reputation, or character
        are connected to a particular place. It helps consumers understand where
        a product comes from and helps producers protect its name from imitation
        or misuse. For wine, this connection can reflect local climate, soils,
        grape varieties, and the knowledge and traditions that have developed in
        a region over time.
      </p>

      <p>
        The{" "}
        <GlossaryTermPopover id="protected-designation-of-origin">
          Protected Designation of Origin (PDO)
        </GlossaryTermPopover>{" "}
        label is the strongest link between a wine and its place of origin. The
        PDO designation is granted by the EU, and only wines that are produced
        within a certain region and meet very strict and specific production
        criteria are allowed to carry the PDO label. Many of the most
        prestigious wine regions in Europe therefore produce wines with the PDO
        label.
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
        Each product specification sets out the area covered by the PDO and the
        rules that help define its wine. These can include permitted grape
        varieties, blend ratios, yields, vineyard practices, and winemaking
        methods. In this way, PDOs protect a shared regional identity while
        providing a common framework for growers, producers, and public
        authorities.
      </p>

      <p>
        The European PDO Atlas makes this information easy to explore. Use the
        interactive map to find PDO regions across Europe, view their borders,
        and inspect the regulatory characteristics that shape each region. You
        can also search and filter regions to compare the diversity of European
        wine traditions.
      </p>

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
