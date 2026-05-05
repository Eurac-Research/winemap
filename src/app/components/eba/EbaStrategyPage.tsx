import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import type { EbaStrategy } from "@/content/eba/catalogue";
import type {
  EbaFact,
  EbaStrategyDetailContent,
} from "@/content/eba/strategy-details";

import { EbaFactList } from "./EbaFactList";
import { EbaSection } from "./EbaSection";
import { EbaVideoEmbed } from "./EbaVideoEmbed";

type EbaStrategyPageProps = {
  strategy: EbaStrategy;
  content?: EbaStrategyDetailContent;
};

function getDefaultFacts(strategy: EbaStrategy): EbaFact[] {
  return [
    { label: "Category", value: strategy.category },
    { label: "Year", value: strategy.year },
    { label: "Authors", value: strategy.authors.join(", ") },
    ...(strategy.keywords?.length
      ? [{ label: "Keywords", value: strategy.keywords.join(", ") }]
      : []),
  ];
}

export function EbaStrategyPage({ strategy, content }: EbaStrategyPageProps) {
  const facts = content?.facts?.length
    ? content.facts
    : getDefaultFacts(strategy);
  const hasCustomSections = Boolean(content?.sections?.length);
  const pdfHref = `/factsheets/${strategy.filename}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <Link
          href="/adaptation/eba-strategies"
          className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent-strong)] underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to EbA strategies
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              EbA Strategy
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-[color:var(--text-strong)] md:text-5xl">
              {strategy.title}
            </h1>
            {strategy.summary ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--text-muted)] text-justify">
                {strategy.summary}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="outline"
                asChild
                className="border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)]"
              >
                <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Open factsheet
                </a>
              </Button>
            </div>
          </div>

          <aside className="rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-panel-muted)] p-5">
            <h2 className="text-base font-semibold text-[color:var(--text-strong)]">
              Key facts
            </h2>
            <div className="mt-4">
              <EbaFactList facts={facts} />
            </div>
            {content?.aside ? (
              <div className="mt-5 border-t border-[color:var(--border-soft)] pt-5 text-sm leading-6 text-[color:var(--text-base)]">
                {content.aside}
              </div>
            ) : null}
          </aside>
        </header>

        <div className="mt-12 text-justify">
          <article>
            {hasCustomSections ? (
              content?.sections?.map((section) => (
                <EbaSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                >
                  {section.children}
                </EbaSection>
              ))
            ) : null}

            {content?.videos?.length ? (
              <EbaSection id="videos" title="Videos">
                <div className="grid gap-5">
                  {content.videos.map((video) => (
                    <EbaVideoEmbed
                      key={video.id}
                      title={video.title}
                      youtubeId={video.youtubeId}
                      caption={video.caption}
                    />
                  ))}
                </div>
              </EbaSection>
            ) : null}
          </article>

        </div>
      </div>
    </main>
  );
}
