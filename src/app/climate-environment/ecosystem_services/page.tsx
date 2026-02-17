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
              Nature not only provides us with all kinds of goods and benefits—as human beings, 
              we are part of a holistic natural system upon which our lives depend. From food and 
              raw materials to energy, water and breathable air, we rely on nature for our survival. 
              Natural processes support us and contribute to our quality of life: they control the climate 
              in which we live, purify the air we breathe and the water we drink; they protect us from 
              hazards and disease. Nature also provides us with other intangible benefits that inspire us 
              and provide us with space to relax and recreate. In the late nineties and early 2000s, there 
              was a concerted effort from the scientific community to define and quantify the benefits that 
              nature provides us with and that contribute to our well-being. Scientists believed that if we 
              could see the hard data on what the environment gives us, we could more effectively coordinate 
              how to protect these resources, for the sake of humans and nature. Out of this effort came the 
              concept of “ecosystem services”, the benefits that humans receive from nature, and its three 
              categories—Provisioning, Regulating and Cultural services.
            </p>

            <br></br>
            <br></br>

            <p>
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
              id={indicator.id}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-8"
            >
              <h3 className="text-2xl font-semibold text-white">{indicator.name}</h3>
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
