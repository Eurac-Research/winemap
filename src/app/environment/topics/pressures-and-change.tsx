import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scale, ShieldAlert } from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";
import styles from "@/styles/Home.module.css";

export const metadata = {
  slug: "pressures-and-change",
  title: "Pressures and Change",
  description:
    "Explore the climate change vulnerability of European Wine Regions.",
  order: 1,
} satisfies TopicMetadata;

export default function PressuresAndChangeTopic() {
  return (
    <>
      <p>
        Climate is one of the foundations of winegrowing. It influences when
        vines grow and ripen, the water they need, and the quality and style of
        the grapes. As Europe warms, changing temperatures, rainfall patterns,
        droughts, and heat extremes are already reshaping the conditions in
        which wine is made.
      </p>

      <p>
        The effects are not the same everywhere. A warmer season may bring new
        possibilities in some cooler places, but it can also create more water
        stress, earlier ripening, and changes in grape composition. Wine regions
        differ in their climates, grape varieties, landscapes, and the rules
        that regulate the production of their wines. These differences shape how
        strongly a region is affected by changing environmental conditions and
        the options it has for responding.
      </p>

      <p>
        The Vulnerability Explorer turns this information into an interactive
        map of European {" "}
        <GlossaryTermPopover id="protected-designation-of-origin">
          Protected Designation of Origin (PDO)
        </GlossaryTermPopover>{" "} wine regions. It
        is based on a{" "}
        <Link
          href="https://www.nature.com/articles/s41467-024-50549-w"
          className="text-cyan-700 hover:text-cyan-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          scientific study
        </Link>{" "}
        of 1,085 wine regions and helps you assess and compare how they are affected
        by climate change. This information helps to
        identify regions most at risk, to guide efforts to enhance resilience
        and to reduce negative impacts of climate change. 
        The Vulnerability Explorer includes information on three
        dimensions for each region, which together determine the climate-change{" "}
        <GlossaryTermPopover id="vulnerability">
          vulnerability
        </GlossaryTermPopover>.{" "}
        <GlossaryTermPopover id="exposure">
          <strong>Exposure</strong>
        </GlossaryTermPopover>{" "}
        describes how much the climate is expected to change in a region.{" "}
        <GlossaryTermPopover id="sensitivity">
          <strong>Sensitivity</strong>
        </GlossaryTermPopover>{" "}
        is related to how strongly its vines and wines may be affected by those
        changes.{" "}
        <GlossaryTermPopover id="adaptive-capacity">
          <strong>Adaptive capacity</strong>
        </GlossaryTermPopover>{" "}
        identifies what resources and opportunities the region has to adapt,
        such as knowledge, labour, finance, infrastructure, water, and suitable
        land.
      </p>

      <p>
        Looking at all three dimensions together is important. A region that
        faces major climate change may be better able to respond if it has major
        resources for adaptation. Conversely, even a smaller change can pose a
        major challenge where varieties are already close to their climatic
        limits or where support for change is limited.
      </p>

      <section
        className={styles.pdoAtlasTeaser}
        aria-labelledby="vulnerability-explorer-title"
      >
        <Image
          src="/images/map_applications/vulnerability_explorer.png"
          alt="Map of climate-change vulnerability across European wine regions"
          fill
          sizes="(min-width: 1024px) 680px, (min-width: 768px) 75vw, 100vw"
          className={styles.pdoAtlasTeaserImage}
        />
        <div className={styles.pdoAtlasTeaserOverlay} />

        <div className={styles.pdoAtlasTeaserContent}>
          <div className={styles.pdoAtlasTeaserIcon}>
            <ShieldAlert aria-hidden="true" />
          </div>
          <p className={styles.pdoAtlasTeaserEyebrow}>Interactive map</p>
          <h3
            id="vulnerability-explorer-title"
            className={styles.pdoAtlasTeaserTitle}
          >
            Explore climate vulnerability
          </h3>
          <p className={styles.pdoAtlasTeaserDescription}>
            Compare how European wine regions are exposed to climate change and
            where adaptation capacity matters most.
          </p>
          <ul
            className={styles.pdoAtlasTeaserFeatures}
            aria-label="Vulnerability Explorer features"
          >
            <li>Find regions</li>
            <li>Inspect indicators</li>
            <li>Explore vulnerability</li>
          </ul>
          <span className={styles.pdoAtlasTeaserCta}>
            Open the Vulnerability Explorer
            <ArrowRight aria-hidden="true" />
          </span>
        </div>

        <Link
          href="/map-applications/vulnerability-explorer"
          className={styles.pdoAtlasTeaserLink}
          aria-label="Open the interactive Vulnerability Explorer"
        />
      </section>

      <aside className="mt-8 flex flex-col gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-overlay)] px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] app-accent-text">
            <Scale className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-medium app-text-color">
              Interested in PDO regulations?
            </p>
            <p className="mt-1 app-caption">
              Learn how European wine regions and their production rules are
              defined in WINEMAP Governance.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-fit shrink-0 border-[color:var(--border)] bg-[color:var(--surface)] app-text-color hover:bg-[color:var(--surface-muted)]"
        >
          <Link href="/governance">
            Explore Governance
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </aside>
    </>
  );
}
