import type { Metadata } from "next";
import Link from "next/link";
import { ebaStrategies } from "@/content/eba/catalogue";
import { ArrowRight, Database, Table } from "lucide-react";

import { EbaStrategyImageMap } from "@/components/eba/EbaStrategyImageMap";
import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "EbA Strategies | Winemap",
  description:
    "Explore ecosystem-based adaptation strategies for vineyards through an interactive visual catalogue.",
};

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

export default function EbaStrategiesPage() {
  return (
    <main className="section-adaptation min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:py-32">
        <header className="mb-8 flex flex-col gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] app-accent-text">
              <span className="section-icon">
                <Database className="h-4 w-4" aria-hidden="true" />
              </span>
              Winemap Adaptation
            </p>
            <h1 className="mt-4 app-page-title">EbA Strategies</h1>
            <p className="mt-5 app-lead app-muted">
              Explore{" "}
              <GlossaryTermPopover id="ecosystem-based-adaptation">
                ecosystem-based adaptation
              </GlossaryTermPopover>{" "}
              strategies in a vineyard landscape and open the detailed
              factsheets behind each intervention.
            </p>
          </div>
        </header>

        <aside className="mb-8 flex max-w-4xl flex-col gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-overlay)] px-4 py-3 app-caption shadow-sm sm:flex-row sm:items-center sm:justify-between">
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
            <Link href="/adaptation/eba-strategies/catalogue">
              Open catalogue
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </aside>

        <EbaStrategyImageMap
          imageSrc="/images/vineyards/vineyard_landscape_mountains.jpg"
          imageAlt="Terraced vineyard landscape with vines, trees, shrubs and dry-stone structures"
          markers={strategyMarkers}
        />
      </div>
    </main>
  );
}
