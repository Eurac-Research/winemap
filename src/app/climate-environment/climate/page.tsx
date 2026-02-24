"use client";

import Link from "next/link";
import CollapsiblePanel from "@/app/components/ui/collapsible-panel";
import IndicatorContent from "@/app/components/indicators/IndicatorContent";
import { getIndicatorsByCategory } from "@/app/components/indicators/indicator-index";

const renderParagraphs = (paragraphs: string[], className = "mt-4 text-white/80") =>
  paragraphs.map((text, index) => (
    <p key={`${className}-${index}`} className={className}>
      {text}
    </p>
  ));

export default function ClimateIndicatorsPage() {
  const climateIndicators = getIndicatorsByCategory("climate");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <article className="space-y-12">
          <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12">
            <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Climate and Environment
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">Climate Indicators and Scenarios</h1>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/80">
              Wine production and its quality are highly sensitive to local weather variability and broader climatic conditions.
              Climate is often considered the most important factor influencing viticultural productivity and quality, largely
              determining which grape varieties can be grown and the distinctive wines that can be produced in a specific
              region.
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/80">
              Bioclimatic indicators help evaluate shifts in climatic conditions and growing suitability over time. They provide
              essential information on present-day and future climatic conditions for wine-growing regions and support adaptation
              planning.
            </p>

            <div className="mt-8" />

            <h2 className="text-xl font-semibold text-white">Jump to indicator</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {climateIndicators.map(indicator => (
                <a
                  key={indicator.id}
                  href={`#${indicator.id}`}
                  className="rounded-lg border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-[#E91E63] hover:text-white"
                >
                  {indicator.name}
                </a>
              ))}
            </div>
          </section>

          {climateIndicators.map(indicator => (
            <section
              key={indicator.id}
              id={indicator.id}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-8"
            >
              <h3 className="text-2xl font-semibold text-white">{indicator.name}</h3>
              {indicator.subtitle ? (
                <p className="mt-2 text-sm text-white/60">{indicator.subtitle}</p>
              ) : null}

              {renderParagraphs(indicator.description)}

              {indicator.contentBlocks?.length ? (
                <IndicatorContent blocks={indicator.contentBlocks} />
              ) : null}

              {indicator.methodology?.length ? (
                <CollapsiblePanel title="Methodology">
                  {renderParagraphs(indicator.methodology, "mt-4 text-white/80")}
                </CollapsiblePanel>
              ) : null}

              {indicator.references?.length ? (
                <CollapsiblePanel title="References">
                  <ul className="mt-4 space-y-3 text-white/80">
                    {indicator.references.map(reference => (
                      <li key={reference}>{reference}</li>
                    ))}
                  </ul>
                </CollapsiblePanel>
              ) : null}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
