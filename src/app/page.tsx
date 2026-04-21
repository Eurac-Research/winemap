import Image from "next/image";
import Link from "next/link";
import WinemapDescription from "@/app/components/WinemapDescription";
import MapApplicationCard from "@/app/components/map-applications/MapApplicationCard";
import { mapApplications } from "@/app/components/map-applications/mapApplications";
import MainAreaCard from "@/app/components/winemap-sections/MainAreaCard";
import { mainAreas } from "@/app/components/winemap-sections/mainAreas";

import { ArrowRight, Leaf } from 'lucide-react';

export default function HomePage() {

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[color:var(--page-bg)] text-[color:var(--text-strong)]">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/landscape.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        />

        <div className="relative z-20 mx-auto min-h-[clamp(34rem,72vh,54rem)] max-w-7xl">
          <div className="absolute bottom-10 left-4 right-4 z-20 max-w-3xl sm:left-auto sm:right-5">
            <div className="w-fit max-w-full rounded-2xl border border-white/20 bg-black/35 px-6 py-6 text-right text-white">
              <p className="text-5xl font-semibold uppercase tracking-[0.18em] sm:text-6xl lg:text-7xl">
                Winemap
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:ml-auto sm:text-lg">
                An essential resource for stakeholders, farmers, and researchers on understanding wine heritage, climate adaptation, and governance frameworks.
              </p>
              <div className='mt-8 flex flex-wrap justify-end gap-4'>
                <Link href='/about' className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--primary)] px-4 py-2 transition hover:bg-[color:var(--primary)]">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href='/about#institute' className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--primary)] px-4 py-2 transition hover:bg-[color:var(--primary)]">
                  <span>Our Team</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.9))]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20 lg:px-8 lg:py-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/20 text-[color:var(--accent-strong)]">
                <Leaf className="h-4 w-4" />
              </span>
              <span>Winemap Climate</span>
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight text-[color:var(--text-strong)] sm:text-5xl">
              Discover how climate pressure is reshaping European viticulture.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-[color:var(--text-strong)]">
              Explore indicators, spatial patterns, and vulnerability insights designed to support adaptation planning across wine-growing regions.
            </p>
            <Link
              href="/climate"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-[color:var(--accent-strong)] transition hover:gap-3"
            >
              <span>Learn more about climate indicators</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[24rem] lg:min-h-[34rem]">
            <div className="absolute inset-x-0 top-6 hidden h-px bg-[color:var(--border-soft)] lg:block" />
            <div className="absolute right-6 top-0 hidden h-20 w-20 rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/35 lg:block" />

            <div className="relative ml-auto w-full max-w-2xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_30px_80px_rgba(21,20,18,0.16)]">
                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                  <span>Climate Indicator</span>
                  <span>Projected Heat Accumulation</span>
                </div>
                <Image
                  src="/images/indicators/huglin_2071_2100.png"
                  alt="Projected viticulture climate indicator map"
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                />
                <div className="flex items-center justify-between bg-white/92 px-5 py-4 text-sm text-[color:var(--text-muted)] backdrop-blur">
                  <span>Scenario window</span>
                  <span className="font-medium text-[color:var(--text-strong)]">2071-2100</span>
                </div>
              </div>

              <div className="relative mt-6 ml-0 w-52 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-[0_18px_45px_rgba(21,20,18,0.14)] sm:-mt-24 sm:ml-[-2rem] sm:w-64">
                <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                  Vulnerability
                </div>
                <Image
                  src="/images/vulnerability/4_vulnerability_bioclim.png"
                  alt="Bioclimatic vulnerability layer"
                  width={700}
                  height={700}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Areas */}
      <section
        id='main-areas'
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[color:var(--text-strong)] sm:text-4xl">
            Discover Our Focus Areas
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainAreas.filter((area) => area.showOnLanding).map((area) => (
            <MainAreaCard
              key={area.id}
              id={area.id}
              title={area.title}
              description={area.description}
              icon={area.icon}
              mainHref={area.mainHref}
              categories={area.categories}
              categoriesClassName={area.categoriesClassName}
            />
          ))}
        </div>
      </section>


      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="relative z-20 w-full">
        
          {/* Map-Applications */}
          <section id='map-applications' className="mx-auto max-w-5xl border-t border-[color:var(--border-soft)] px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-[color:var(--text-strong)]">Map Applications</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pt-2 pb-6 snap-x snap-mandatory w-full mx-auto">
              {mapApplications.map((app) => (
                <MapApplicationCard
                  key={app.title}
                  href={app.href}
                  title={app.title}
                  description={app.description}
                  icon={app.icon}
                />
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="mx-auto max-w-5xl border-t border-[color:var(--border-soft)] px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-[color:var(--text-strong)]">About the Winemap</h2>
            </div>
            <WinemapDescription className="mt-3 text-[color:var(--text-muted)]"/>
          </section>

          {/* FAQ Section */}
          <section className="mx-auto max-w-5xl border-t border-[color:var(--border-soft)] px-4 py-20 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold mb-12 text-center text-[color:var(--text-strong)]">Frequently Asked Questions</h2>
              <div className="space-y-8">
                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">Who is behind this project?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    WINEMAP is developed by the{" "}
                    <a
                      href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      Institute for Alpine Environment{" "}
                    </a>
                    at Eurac Research in Bolzano, Italy. Our interdisciplinary research team 
                    specializes in climate adaptation, environmental science, and sustainable 
                    agriculture, providing the scientific foundation for this platform. The project is part of{" "}
                    <a
                      href="https://www.eurac.edu/en/data-in-action"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      Data in Action
                    </a>
                    , an initiative by Eurac Research&apos;s Communication Department that transforms research data into accessible digital experiences. The platform&apos;s concept and technical development are handled by the Communication Department. Learn more about{" "}
                    <Link href="/team" className="text-[color:var(--accent-strong)] hover:underline">
                      our team
                    </Link>
                    .
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">What is the research behind the Winemap?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    The different datasets and map-applications show in the Winemap were created 
                    in the framework of several projects and publications.
                    You can find out more about the projects{" "}
                    <a
                      href="/about#projects"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      here{" "}
                    </a>
                    and browse through related publications{" "}
                    <a
                      href="/literature"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      here
                    </a>
                    .
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">What is the timeline of the project?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    The project began with the collection and digitization of PDO wine region data in 2020-2021. Climate and environmental data integration followed in 2022-2023, with ongoing updates to adaptation strategies and pilot implementation experiences. The platform continues to evolve with new data and features.
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">How can I use this data?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    The WINEMAP data is available for research, educational, and policy-making purposes. For specific data access, collaboration opportunities, or questions about data usage, please{" "}
                    <Link href="/imprint-privacy" className="text-[color:var(--accent-strong)] hover:underline">
                      contact us
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

