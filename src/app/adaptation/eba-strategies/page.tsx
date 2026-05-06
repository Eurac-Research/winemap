import type { Metadata } from "next";
import Link from "next/link";
import { ebaStrategies } from "@/content/eba/catalogue";
import { Database, Leaf } from "lucide-react";

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
          summary: strategy.summary,
          position: strategy.mapPosition,
        },
      ]
    : [],
);

export default function EbaStrategiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:py-32">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              <Leaf className="h-4 w-4" aria-hidden="true" />
              Adaptation
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[color:var(--text-strong)] md:text-5xl">
              EbA Strategies
            </h1>
            <p className="mt-5 text-lg leading-8 text-[color:var(--text-muted)]">
              Explore{" "}
              <GlossaryTermPopover id="ecosystem-based-adaptation">
                ecosystem-based adaptation
              </GlossaryTermPopover>{" "}
              strategies in a vineyard landscape and open the detailed
              factsheets behind each intervention.
            </p>
          </div>

          <Button
            variant="outline"
            asChild
            className="w-fit border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)]"
          >
            <Link href="/adaptation/eba-strategies/catalogue">
              <Database className="mr-2 h-4 w-4" aria-hidden="true" />
              Technical catalogue
            </Link>
          </Button>
        </header>

        <EbaStrategyImageMap
          imageSrc="/images/vineyard_landscape.jpg"
          imageAlt="Terraced vineyard landscape with vines, trees, shrubs and dry-stone structures"
          markers={strategyMarkers}
        />
      </div>
    </main>
  );
}
