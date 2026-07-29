import Link from "next/link";
import { ebaStrategies } from "@/content/eba/catalogue";
import { ArrowRight, Table } from "lucide-react";

import { EbaStrategyImageMap } from "@/components/eba/EbaStrategyImageMap";
import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

export const metadata = {
  slug: "ecosystem-based-adaptation",
  title: "Ecosystem-based Adaptation",
  description:
    "Discover how biodiversity and ecosystem functions can strengthen vineyard resilience.",
  order: 1,
} satisfies TopicMetadata;

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
        Over the past decade, several approaches have emerged to guide the
        transition towards more resilient agricultural systems.{" "}
        <GlossaryTermPopover id="nature-based-solutions">
          Nature-based Solutions
        </GlossaryTermPopover>{" "}
        (NbS) harness natural processes to address environmental and societal
        challenges.{" "}
        <GlossaryTermPopover id="ecosystem-based-adaptation">
          Ecosystem-based Adaptation
        </GlossaryTermPopover>{" "}
        (EbA) is part of the broader family of NbS, but places a stronger
        emphasis on climate adaptation and promotes the use of biodiversity and{" "}
        <GlossaryTermPopover id="ecosystem-functions">
          ecosystem functions
        </GlossaryTermPopover>{" "}
        to help agricultural systems adapt to climate change.
      </p>

      <p>
        EbA strategies aim to manage vineyards in ways that strengthen their
        capacity to buffer climate impacts while maintaining productivity and
        environmental health. By enhancing biodiversity at field, farm, and
        landscape scales, vineyards can better withstand climate variability,
        reduce external inputs, and maintain multiple ecosystem functions. EbA
        encourages winegrowers to view vineyard landscapes as dynamic systems,
        moving from simplified, input-dependent systems towards more diverse,
        self-regulating, and resilient agroecosystems.
      </p>

      <p>
        WINEMAP Adaptation contains descriptions and practical implementation
        examples for several of the most common EbA strategies. Each dot on the
        vineyard landscape below corresponds to a different EbA strategy. By
        hovering over each dot and clicking on it, more details about each
        strategy can be discovered.
      </p>

      <EbaStrategyImageMap
        imageSrc="/images/vineyards/vineyard_landscape_mountains.jpg"
        imageAlt="Terraced vineyard landscape with vines, trees, shrubs and dry-stone structures"
        markers={strategyMarkers}
      />

      <aside className="flex flex-col gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-overlay)] px-4 py-3 app-caption shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] app-accent-text">
            <Table className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-medium app-text-color">Prefer a table view?</p>
            <p className="mt-1 leading-6">
              There is also a technical catalogue with search, filters,
              classification metadata and PDF links for all EbA strategies.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-fit shrink-0 border-[color:var(--border)] bg-[color:var(--surface)] app-text-color hover:bg-[color:var(--surface-muted)]"
        >
          <Link href="/adaptation/eba-strategies">
            Open catalogue
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </aside>
    </>
  );
}
