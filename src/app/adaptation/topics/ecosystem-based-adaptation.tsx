import Link from "next/link";
import { ebaStrategies } from "@/content/eba/catalogue";
import { ArrowRight, Table } from "lucide-react";

import { EbaStrategyImageMap } from "@/components/eba/EbaStrategyImageMap";
import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import { Button } from "@/components/ui/button";
import type { AdaptationTopicMetadata } from "../topics.generated";

export const metadata = {
  slug: "ecosystem-based-adaptation",
  title: "Ecosystem-based Adaptation",
  description:
    "Discover how biodiversity and ecosystem functions can strengthen vineyard resilience.",
  order: 1,
} satisfies AdaptationTopicMetadata;

const strategyMarkers = ebaStrategies.flatMap((strategy) =>
  strategy.mapPosition
    ? [
        {
          id: strategy.id,
          title: strategy.title,
          href: `/adaptation/eba-strategies/${strategy.slug}`,
          category: strategy.category,
          fieldOfAction: strategy.field_of_action,
          spatialScale: strategy.spatial_scale,
          summary: strategy.summary,
          position: strategy.mapPosition,
        },
      ]
    : [],
);

export default function EcosystemBasedAdaptationTopic() {
  return (
    <>
      <p>
        Ecosystem-based Adaptation (EbA) promotes the use of biodiversity and{" "}
        <GlossaryTermPopover id="ecosystem-functions">
          ecosystem functions
        </GlossaryTermPopover>{" "}
        to help agricultural systems adapt to climate change. It is part of the
        broader family of{" "}
        <GlossaryTermPopover id="nature-based-solutions">
          Nature-based Solutions
        </GlossaryTermPopover>{" "}
        that work with natural processes to address environmental and societal
        challenges.
      </p>

      <p>
        In viticulture, EbA means managing vineyards to buffer climate impacts
        while maintaining productivity and environmental health. Increasing
        biodiversity at field, farm, and landscape scales can reduce external
        inputs and support more diverse, self-regulating, resilient
        agroecosystems.
      </p>

      <p>
        Explore practical EbA strategies on the vineyard landscape. Select a
        marker to open its detailed strategy page.
      </p>

      <EbaStrategyImageMap
        imageSrc="/images/vineyards/vineyard_landscape_mountains.jpg"
        imageAlt="Terraced vineyard landscape with vines, trees, shrubs and dry-stone structures"
        markers={strategyMarkers}
      />

      <aside className="flex max-w-4xl flex-col gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-overlay)] px-4 py-3 app-caption shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] app-accent-text">
            <Table className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-medium app-text-color">Prefer a table view?</p>
            <p className="mt-1 leading-6">
              Search and filter all EbA strategies in the technical catalogue.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-fit shrink-0 border-[color:var(--border)] bg-[color:var(--surface)] app-text-color hover:bg-[color:var(--surface-muted)]"
        >
          <Link href="/adaptation/eba-strategies/catalogue">
            Open catalogue
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </aside>
    </>
  );
}
