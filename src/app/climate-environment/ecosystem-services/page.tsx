"use client";

import Link from "next/link";
import { Indicators } from "@/app/components/indicators/indicator-index";
import CollapsiblePanel from "@/app/components/ui/collapsible-panel";

const renderParagraphs = (paragraphs: string[], className = "mt-4 text-white/80") =>
  paragraphs.map((text, index) => (
    <p key={`${className}-${index}`} className={className}>
      {text}
    </p>
  ));

export default function EcosystemServicesPage() {
  const categories = new Set(["ecosystem-services", "ecosystem-conditions"]);
  const ecosystemIndicators = Indicators.filter(indicator =>
    categories.has(indicator.category)
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <article className="space-y-12">
          <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12">
            <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Climate and Environment
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">Ecosystem Services</h1>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/80">
              Ecosystems provide essential services that sustain agricultural production, environmental stability, 
              and human well-being. These services range from regulating functions such as pollination, 
              natural pest control, and soil erosion prevention to cultural benefits including recreation and 
              landscape aesthetics. At the same time, underlying ecosystem conditions—such as naturalness, 
              landscape integrity, productivity, and water availability—strongly influence the capacity of 
              landscapes to deliver these benefits.
            </p>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/80">
              The indicators presented here assess the relative potential of landscapes to provide key ecosystem 
              services and maintain ecological functionality. Together, they offer a spatially explicit overview 
              of ecosystem performance and resilience, supporting informed land management and long-term sustainability planning.
            </p>

            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/80">
              Learn more about ecosystem services here: https://www.youtube.com/watch?v=r7UCAsBT5Yg 
            </p>

            <div className="mt-8" />

            <h2 className="text-xl font-semibold text-white">Jump to indicator</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {ecosystemIndicators.map(indicator => (
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
          
          {ecosystemIndicators.map(indicator => (
            <section
              key={indicator.id}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-8"
            >
              <h3
                id={indicator.id}
                className="scroll-mt-64 text-2xl font-semibold text-white"
              >
                {indicator.name}
              </h3>
              {indicator.subtitle ? (
                <p className="mt-2 text-sm text-white/60">{indicator.subtitle}</p>
              ) : null}

              {renderParagraphs(indicator.description)}

              {indicator.video ? (
                <p className="mt-4 text-white/80">
                  {indicator.video.label} {indicator.video.url}
                </p>
              ) : null}

              {indicator.methodology ? (
                <CollapsiblePanel title="Methodology">
                  {renderParagraphs(indicator.methodology, "mt-4 text-white/80")}
                </CollapsiblePanel>
              ) : null}

              {indicator.references ? (
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

          <div className="border-t border-gray-700 pt-8">
            <Link href="/climate-environment" className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
              {"<-"} Back to Climate and Environment
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
