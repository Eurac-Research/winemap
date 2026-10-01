import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map as MapIcon } from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";
import styles from "@/styles/Home.module.css";

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

      <p>
        Each product specification sets out the area covered by the PDO and the
        rules that help define its wine. These can include permitted grape
        varieties, blend ratios, yields, vineyard practices, and winemaking
        methods. In this way, PDOs protect a shared regional identity while
        providing a common framework for growers, producers, and public
        authorities.
      </p>

      <p>
        The European PDO Atlas makes all this information easy to explore. Use the
        interactive map to find PDO regions across Europe, view their borders,
        and inspect the regulatory characteristics that shape each region. You
        can also search and filter regions to get detailed information on
        the diversity of European wine traditions.
      </p>

      <section
        className={styles.pdoAtlasTeaser}
        aria-labelledby="pdo-atlas-title"
      >
        <Image
          src="/images/map_applications/pdo_atlas.jpg"
          alt="Map of European wine Protected Designations of Origin"
          fill
          sizes="(min-width: 1024px) 680px, (min-width: 768px) 75vw, 100vw"
          className={styles.pdoAtlasTeaserImage}
        />
        <div className={styles.pdoAtlasTeaserOverlay} />

        <div className={styles.pdoAtlasTeaserContent}>
          <div className={styles.pdoAtlasTeaserIcon}>
            <MapIcon aria-hidden="true" />
          </div>
          <p className={styles.pdoAtlasTeaserEyebrow}>Interactive map</p>
          <h3 id="pdo-atlas-title" className={styles.pdoAtlasTeaserTitle}>
            Explore European wine PDOs
          </h3>
          <p className={styles.pdoAtlasTeaserDescription}>
            Search a region, inspect its boundary, and compare the production
            rules that shape its wine.
          </p>
          <ul
            className={styles.pdoAtlasTeaserFeatures}
            aria-label="PDO Atlas features"
          >
            <li>Search regions</li>
            <li>View boundaries</li>
            <li>Explore regulations</li>
          </ul>
          <span className={styles.pdoAtlasTeaserCta}>
            Open the interactive PDO Atlas
            <ArrowRight aria-hidden="true" />
          </span>
        </div>

        <Link
          href="/map-applications/pdo-atlas"
          className={styles.pdoAtlasTeaserLink}
          aria-label="Open the interactive European PDO Atlas"
        />
      </section>
    </>
  );
}
