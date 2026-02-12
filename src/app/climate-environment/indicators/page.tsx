"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import ImageComparisonSlider from "@/app/components/ImageComparisonSlider";

function CollapsiblePanel({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleToggle();
        }
      }}
      className={`mt-4 cursor-pointer rounded-xl border bg-black/30 p-5 transition-colors ${isOpen
          ? "border-[#E91E63]/80"
          : "border-white/15 hover:border-[#E91E63]"
        }`}
      aria-expanded={isOpen}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <span className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-white/60">
          {isOpen ? "Hide" : "Show"}
        </span>
      </div>

      {isOpen ? <div className="mt-4 text-white/80">{children}</div> : null}
    </div>
  );
}

export default function ClimateIndicatorsPage() {
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
              <a href="#huglin" className="rounded-lg border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-[#E91E63] hover:text-white">
                Huglin Index
              </a>
              <a href="#cool-night" className="rounded-lg border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-[#E91E63] hover:text-white">
                Cool Night Index
              </a>
              <a href="#dryness" className="rounded-lg border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-[#E91E63] hover:text-white">
                Dryness Index
              </a>
            </div>
            <p className="mt-4 text-sm text-white/60">Tip: expand only the sections you need with the toggles below.</p>
          </section>
          
          <section id="huglin" className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Huglin Index</h3>
            <p className="mt-2 text-sm text-white/60">Thermal growing conditions and ripening suitability</p>

            <p className="mt-4 text-white/80">
              The Huglin Index (HI) is a bioclimatic indicator that describes the thermal growing conditions throughout the
              vegetation period in a wine region. It is primarily linked to vine phenology and development and demonstrates a
              good relationship with potential sugar content in grapes.
            </p>

            <div className="mt-6 mx-auto w-full max-w-3xl">
              <ImageComparisonSlider
                beforeImage="/images/indicators/huglin_1981_2010.png"
                afterImage="/images/indicators/huglin_2071_2100.png"
                beforeLabel="1981-2010"
                afterLabel="2071-2100"
                alt="Huglin Index Comparison"
                aspectRatio="auto"
                caption="Figure 1: Comparison of Huglin Index between historical (1981-2010) and projected (2071-2100) climate scenarios showing increased thermal suitability across European wine regions."
              />
            </div>

            <CollapsiblePanel title="Interpretation">
              <p className="mt-4 text-white/80">
                The HI categorises climatic conditions into classes ranging from very cool to very warm, indicating different
                suitability levels for grape varieties and ripening.
              </p>
              <ul className="mt-4 space-y-3 text-white/80">
                <li><strong>1200-1500 GDD (Very cool):</strong> Only very early-ripening varieties are likely to reach maturity.</li>
                <li><strong>1500-1800 GDD (Cool):</strong> Supports many early-ripening white and red varieties.</li>
                <li><strong>1800-2100 GDD (Temperate):</strong> Later-ripening varieties such as Syrah can also mature.</li>
                <li><strong>2100-2400 GDD (Warm temperate):</strong> Late-ripening and predominantly red varieties can reach full potential.</li>
                <li><strong>2400-2700 GDD (Warm):</strong> Thermal potential exceeds needs for many varieties, with possible heat stress.</li>
                <li><strong>2700-3000 GDD (Very warm):</strong> Typical of intertropical climates with very high heat availability.</li>
              </ul>
            </CollapsiblePanel>

            <CollapsiblePanel title="Methodology">
              <p className="mt-4 text-white/80">
                The Huglin Index is calculated over a 6-month period (typically 1 April to 30 September in the Northern
                Hemisphere).
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-black p-4 font-mono text-sm text-white/90">
                HI = Sigma(((T - 10) + (Tmax - 10)) / 2) * d
              </div>
              <ul className="mt-4 space-y-2 text-white/80">
                <li><strong>T</strong> = Mean air temperature (deg C)</li>
                <li><strong>Tmax</strong> = Maximum air temperature (deg C)</li>
                <li><strong>d</strong> = Day-length coefficient (1.00 to 1.06 depending on latitude)</li>
              </ul>
            </CollapsiblePanel>
          </section>

          <section id="cool-night" className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Cool Night Index</h3>
            <p className="mt-2 text-sm text-white/60">Night-time temperature during ripening</p>

            <p className="mt-4 text-white/80">
              The Cool Night Index (CNI) describes minimum temperature during the ripening phase of grapes. It is useful for
              evaluating sensory qualities such as aroma and polyphenol development.
            </p>

            <div className="mt-6 mx-auto w-full max-w-3xl">
              <ImageComparisonSlider
                beforeImage="/images/indicators/cni_1981_2010.png"
                afterImage="/images/indicators/cni_2071_2100.png"
                beforeLabel="1981-2010"
                afterLabel="2071-2100"
                alt="Cool Night Index Comparison"
                aspectRatio="auto"
                caption="Figure 2: Comparison of Cool Night Index between historical (1981-2010) and projected (2071-2100) climate scenarios indicating shifts towards warmer night temperatures during grape ripening in many wine regions."
              />
            </div>

            <CollapsiblePanel title="Interpretation">
              <ul className="mt-4 space-y-3 text-white/80">
                <li><strong>Below 12 deg C (Very cool):</strong> Can be favorable if thermal potential is still sufficient for ripening.</li>
                <li><strong>12-14 deg C (Cool):</strong> Typically beneficial for color and aroma development.</li>
                <li><strong>14-18 deg C (Temperate):</strong> Intermediate condition; effects depend on variety and ripening timing.</li>
                <li><strong>Above 18 deg C (Warm):</strong> Higher risk of aroma loss and reduced color development, especially in reds.</li>
              </ul>
            </CollapsiblePanel>

            <CollapsiblePanel title="Methodology">
              <p className="mt-4 text-white/80">
                CNI is calculated as the average minimum temperature in September (Northern Hemisphere) or March (Southern
                Hemisphere), using daily minimum temperature data.
              </p>
            </CollapsiblePanel>
          </section>

          <section id="dryness" className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Dryness Index</h3>
            <p className="mt-2 text-sm text-white/60">Soil water balance and drought pressure</p>

            <p className="mt-4 text-white/80">
              The Dryness Index (DI) evaluates water availability for grapevines by combining precipitation, evapotranspiration,
              and soil water reserve assumptions. It helps characterise drought pressure and adaptation needs.
            </p>

            <div className="mt-6 mx-auto w-full max-w-3xl">
              <ImageComparisonSlider
                beforeImage="/images/indicators/di_1981_2010.png"
                afterImage="/images/indicators/di_2071_2100.png"
                beforeLabel="1981-2010"
                afterLabel="2071-2100"
                alt="Dryness Index Comparison"
                aspectRatio="auto"
                caption="Figure 3: Comparison of Dryness Index between historical (1981-2010) and projected (2071-2100) climate scenarios showing increased dryness in many traditional wine regions, highlighting the growing importance of water management and irrigation strategies."
              />
            </div>

            <CollapsiblePanel title="Interpretation">
              <ul className="mt-4 space-y-3 text-white/80">
                <li><strong>Above 150 mm (Humid):</strong> High water availability, sometimes beyond optimum for quality.</li>
                <li><strong>50-150 mm (Subhumid):</strong> Lower drought risk; some varieties may still benefit from moderate dryness.</li>
                <li><strong>-100 to 50 mm (Moderately dry):</strong> Can support quality through controlled stress, depending on management.</li>
                <li><strong>Below -100 mm (Very dry):</strong> High drought stress risk, often requiring irrigation.</li>
              </ul>
            </CollapsiblePanel>

            <CollapsiblePanel title="Methodology">
              <p className="mt-4 text-white/80">
                DI is computed over a 6-month period and follows a water balance equation:
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-black p-4 font-mono text-sm text-white/90">
                W = Wo + P - Tv - Es
              </div>
              <ul className="mt-4 space-y-2 text-white/80">
                <li><strong>W</strong> = Soil water reserve at the end of the period</li>
                <li><strong>Wo</strong> = Initial useful soil water reserve (often 200 mm)</li>
                <li><strong>P</strong> = Precipitation</li>
                <li><strong>Tv</strong> = Potential vineyard transpiration</li>
                <li><strong>Es</strong> = Direct evaporation from soil</li>
              </ul>
            </CollapsiblePanel>
          </section>

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
