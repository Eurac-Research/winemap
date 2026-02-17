"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import Image from "next/image";

type Indicator = {
  id: string;
  title: string;
  subtitle?: string;
  body: ReactNode;
  methodology?: ReactNode;
  references?: ReactNode;
};

const indicators: Indicator[] = [
  {
    id: "pollination",
    title: "Pollination",
    subtitle: "Thermal growing conditions and ripening suitability",
    body: (
      <p className="mt-4 text-white/80">
        The indicator describes the relative capacity of ecosystems to support insect pollination (index). 
        Crop pollination by wild insects is a key regulating ecosystem service with high economic implications. 
        In fact, the productivity of many agricultural crops depends on the presence of pollinating insects 
        and the ecosystems that support insect populations (Zulian et al., 2013). 
      </p>
    ),
    methodology: (
      <p className="mt-4 text-white/80">
        The methodology used to map the pollination indicator focuses on wild bees as key animal pollinators. 
        The indicator assumes that different habitats offer varying floral resources and nesting opportunities. 
        The indicator also accounts for climatic variation in temperature and solar irradiance by calculating an 
        annually averaged activity coefficient representing the pollination activity. In addition, given that 
        pollination services decrease by increasing the distance from natural and semi-natural areas, a distance 
        decay function is applied. The indicator values were mapped on a 0-100 scale, with higher values indicating 
        a higher potential capacity to support insect pollination. 
      </p>
    ),
    references: (
      <ul className="mt-4 space-y-3 text-white/80">
        <li>Zulian G, Maes J, Paracchini M. L. 2013 Linking Land Cover Data and Crop Yields for Mapping and Assessment of Pollination Services in Europe. Land 2013, 2, 472-492; doi:10.3390/land2030472</li>
        <li>Vallecillo S, La Notte A, Polce C, Zulian G, Alexandris N, Ferrini S, Maes J. 2018. Ecosystem services accounting: Part I - Outdoor recreation and crop pollination, EUR 29024 EN; Publications Office of the European Union, Luxembourg, doi:10.2760/619793, JRC110321</li>
        <li>Zulian G, Paracchini M, Maes J, Liquete Garcia M. ESTIMAP: Ecosystem services mapping at European scale. EUR 26474. Luxembourg (Luxembourg): Publications Office of the European Union; 2013. JRC87585 10.2788/64713</li>
      </ul>
    ),
  },
  {
    id: "erosion-control",
    title: "Soil Erosion Control",
    subtitle: "Thermal growing conditions and ripening suitability",
    body: (
      <>
        <p className="mt-4 text-white/80">
          The indicator describes the prevention of soil erosion. Soil erosion is a widespread issue in natural and managed ecosystems, 
          with several implications for environmental quality (soil deterioration) and social economy (decline in soil productivity). 
          By protecting soil from wind and water processes, terrestrial ecosystems control soil erosion rates, therefore providing 
          a fundamental ecosystem service that ensures human wellbeing. 
        </p>

        <br></br>

        <p className="mt-4 text-white/80">
          Learn more about soil erosion here  https://www.youtube.com/watch?v=BoSUEIkK_Y4 
        </p>
      </>
    ),
    methodology: (
      <p className="mt-4 text-white/80">
        Using the Revised Universal Soil Loss Equation, the soil erosion rates are calculated based on rainfall erosivity, 
        soil erodibility, topography and soil retention, which is determined by vegetation cover. For the vegetation cover 
        factor and erosion control practice factors, proxy values where used. The indicator values range on a 0-100 scale, 
        with higher values indicating higher control of soil erosion. 
      </p>
    ),
    references: (
      <ul className="mt-4 space-y-3 text-white/80">
        <li>Fu, B., Liu, Y. Lü, Y., He, C. Zeng, Y., Wu, B., (2011). Assessing the soil erosion control service of ecosystems change in the Loess Plateau of China. Ecological Complexity (8), Issue 4, 284-293. https://doi.org/10.1016/j.ecocom.2011.07.003.</li>
        <li>Guerra, Carlos A., Maes, J. Geijzendorffer, I. Metzger, M.J. (2016). An assessment of soil erosion prevention by vegetation in Mediterranean Europe: Current trends of ecosystem service provision. Ecological Indicators (60), 213-222. https://doi.org/10.1016/j.ecolind.2015.06.043</li>
        <li>Laaich, H. et al. (2016). Soil erodibility mapping using three approaches in the Tangiers province â€“Northern Morocco. International Soil and Water Conservation Research (4), 159-167.</li>
        <li>Panagos, P. et al. (2015). Estimating the soil erosion cover-management factor at the European scale. Land Use Policy (48), 38-50.</li>
      </ul>
    ),
  },
];

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

export default function EcosystemServicesPage() {
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
              {indicators.map(indicator => (
                <a
                  key={indicator.id}
                  href={`#${indicator.id}`}
                  className="rounded-lg border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-[#E91E63] hover:text-white"
                >
                  {indicator.title}
                </a>
              ))}
            </div>
          </section>
          
          {indicators.map(indicator => (
            <section
              key={indicator.id}
              id={indicator.id}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-8"
            >
              <h3 className="text-2xl font-semibold text-white">{indicator.title}</h3>
              {indicator.subtitle ? (
                <p className="mt-2 text-sm text-white/60">{indicator.subtitle}</p>
              ) : null}

              {indicator.body}

              {indicator.methodology ? (
                <CollapsiblePanel title="Methodology">{indicator.methodology}</CollapsiblePanel>
              ) : null}

              {indicator.references ? (
                <CollapsiblePanel title="References">{indicator.references}</CollapsiblePanel>
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
