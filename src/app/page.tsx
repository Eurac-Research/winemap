import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { mainAreas } from "@/content/main-areas";
import { mapApplications } from "@/content/map-applications";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Map,
  Scale,
  ThermometerSun,
} from "lucide-react";

import BackgroundImageCarousel from "@/components/BackgroundImageCarousel";
import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import MainAreaCarousel from "@/components/winemap-sections/MainAreaCarousel";
import styles from "@/styles/Home.module.css";

const overviewItems = [
  {
    id: "adaptation",
    title: "WINEMAP Adaptation",
    Icon: Leaf,
    accent: "var(--section-adaptation-accent)",
    arcOffset: "md:-translate-x-5",
    summary:
      "A practice-oriented entry point for vineyard managers, advisors, researchers, and local actors who want to understand how wine regions can respond to climate stress. This section brings together ecosystem-based adaptation strategies, pilot experiences, and implementation examples so users can move from general adaptation needs to concrete measures in the vineyard and surrounding landscape.",
  },
  {
    id: "climate-environment",
    title: "Climate-Environment",
    Icon: ThermometerSun,
    accent: "var(--section-climate-environment-accent)",
    arcOffset: "md:translate-x-2",
    summary:
      "The scientific and spatial evidence base of WINEMAP. This section is for users who need to explore climate indicators, environmental conditions, and vulnerability patterns across European wine regions. It helps researchers, planners, educators, and practitioners understand where pressures are emerging, how they differ by region, and which environmental factors matter for adaptation planning.",
  },
  {
    id: "governance",
    title: "WINEMAP Governance",
    Icon: Scale,
    accent: "var(--section-governance-accent)",
    arcOffset: "md:translate-x-2",
    summary:
      "A guide to the policy, institutional, and participatory side of climate adaptation in viticulture. This section is useful for decision-makers, public administrations, regional organizations, educators, and project teams who need to understand legal frameworks, protected designations, stakeholder processes, and learning resources that shape how wine regions can act.",
  },
  {
    id: "map-applications",
    title: "Map Applications",
    Icon: Map,
    accent: "var(--accent)",
    arcOffset: "md:-translate-x-5",
    summary:
      "A dedicated collection of interactive tools for exploring WINEMAP data directly on maps. This area is for users who want to browse spatial layers, compare regions, inspect PDO information, investigate vulnerability, or work with specific geospatial applications without first reading through the thematic sections. It is the fastest route from a question about place to an interactive map view.",
  },
];

export default function HomePage() {
  const adaptationArea = mainAreas.find((area) => area.id === "adaptation");
  const governanceArea = mainAreas.find((area) => area.id === "governance");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[color:var(--background)] app-text-color">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/landscape_digital.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="relative z-20 mx-auto min-h-[clamp(34rem,72vh,54rem)] max-w-7xl">
          <div className="absolute bottom-10 left-4 right-4 z-20 max-w-3xl sm:left-auto sm:right-5">
            <div className="w-fit max-w-full rounded-2xl border border-white/20 bg-black/35 px-6 py-6 text-right text-white">
              <p className="text-5xl font-semibold uppercase tracking-[0.18em] sm:text-6xl lg:text-7xl">
                WINEMAP
              </p>
              <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white sm:ml-auto">
                An Interactive Platform for Climate Adaptation and Resilient
                Viticulture
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:ml-auto sm:text-xl">
                Explore Europe&apos;s wine regions through interactive maps,
                legal frameworks, training resources, and practical experiences.
              </p>
              {/* <div className="mt-8 flex flex-wrap justify-end gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--accent)] px-4 py-2 transition hover:bg-[color:var(--accent)]"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about/team"
                  className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--accent)] px-4 py-2 transition hover:bg-[color:var(--accent)]"
                >
                  <span>Our Team</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section
        id="winemap-overview"
        className="section-winemap-overview relative isolate overflow-hidden border-y border-[color:var(--border)] bg-[radial-gradient(circle_at_18%_18%,rgba(151,4,41,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.92))]"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="app-eyebrow">Website structure</p>
            <h2 className="text-4xl font-semibold leading-tight app-text-color sm:text-5xl">
                Four entry points into climate-resilient viticulture.
            </h2>
            <p className="mt-3 app-lead">
              WINEMAP is organized around three thematic pillars and one
              dedicated collection of map applications. Each entry point leads
              to a different way of working with the platform.
            </p>
          </div>

          <div className="mx-auto mt-4 w-full max-w-[28rem] md:grid md:max-w-[44rem] md:grid-cols-[minmax(0,1fr)_9rem] md:items-center md:gap-0 xl:max-w-[54rem] xl:grid-cols-[minmax(0,1fr)_10rem]">
            <div className="relative mx-auto aspect-square min-h-72 w-full max-w-[22rem] sm:min-h-96 sm:max-w-[28rem] md:mx-0 md:min-h-0 md:max-w-[30rem] xl:max-w-[42rem]">
              <Image
                src="/winemap_illustration.png"
                alt="Illustration of the WINEMAP platform structure"
                fill
                sizes="(min-width: 1024px) 672px, (min-width: 640px) 48rem, 100vw"
                className="object-contain"
                priority
              />
            </div>

            <nav
              aria-label="WINEMAP structure overview"
              className="mt-8 grid grid-cols-2 items-start justify-items-center gap-x-3 gap-y-8 sm:mt-10 sm:grid-cols-4 sm:gap-x-5 md:mt-0 md:h-[30rem] md:grid-cols-1 md:grid-rows-4 md:content-center md:justify-items-start md:gap-0 xl:h-[34rem]"
            >
              {overviewItems.map(
                ({ id, title, Icon, accent, arcOffset, summary }) => (
                  <Link
                    key={id}
                    href={`#${id}`}
                    className={`group relative flex w-full max-w-36 flex-col items-center gap-3 text-center transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--overview-accent)] md:max-w-none md:justify-self-start ${arcOffset}`}
                    style={
                      {
                        "--overview-accent": accent,
                      } as CSSProperties
                    }
                  >
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--overview-accent)]/35 bg-white/80 text-[color:var(--overview-accent)] shadow-[0_10px_28px_rgba(21,20,18,0.1)] transition duration-200 group-hover:scale-110 group-hover:border-[color:var(--overview-accent)] group-hover:bg-[color:var(--overview-accent)]/10">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold leading-snug app-text-color">
                      {title}
                    </span>
                    <span className="pointer-events-none absolute z-30 hidden w-[22rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-left text-sm leading-6 text-[color:var(--app-text-color)] opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.2)] transition group-hover:opacity-100 group-focus-visible:opacity-100 md:right-[calc(100%+1.25rem)] md:top-1/2 md:-translate-y-1/2 md:block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--overview-accent)]">
                        {title}
                      </span>
                      {summary}
                    </span>
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      </section>

      <section
        id="climate-environment"
        className="section-climate-environment border-y border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.9))]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20 lg:px-8 lg:py-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] app-accent-text">
              <span className="section-icon">
                <ThermometerSun className="h-4 w-4" />
              </span>
              <span>
                WINEMAP <em>Environment</em>
              </span>
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight app-text-color sm:text-5xl">
              Discover how climate is reshaping European viticulture.
            </h2>
            <p className="mt-6 max-w-md app-lead">
              Explore indicators, spatial patterns, and{" "}
              <GlossaryTermPopover id="vulnerability">
                vulnerability
              </GlossaryTermPopover>{" "}
              insights designed to support adaptation planning across
              wine-growing regions.
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link
                href="/climate-environment"
                className="inline-flex items-center gap-2 text-base font-medium app-accent-text transition hover:gap-3"
              >
                <span>
                  Discover WINEMAP <em>Environment</em>
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[24rem] lg:min-h-[34rem]">
            <div className="absolute inset-x-0 top-6 hidden h-px bg-[color:var(--border)] lg:block" />
            <div className="absolute right-6 top-0 hidden h-20 w-20 rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/35 lg:block" />

            <div className="relative ml-auto w-full max-w-2xl">
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white px-5 py-4 shadow-[0_30px_80px_rgba(21,20,18,0.16)]">
                <ImageComparisonSlider
                  beforeImage="/images/indicators/huglin_1981_2010.png"
                  afterImage="/images/indicators/huglin_2071_2100.png"
                  beforeLabel="1981-2010"
                  afterLabel="2071-2100"
                  alt="Huglin Index Comparison"
                  aspectRatio="auto"
                  labelPosition="bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="adaptation"
        className="section-adaptation border-y border-[color:var(--border)] bg-[color:var(--accent)]/10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.85fr)] lg:items-center lg:gap-12 lg:px-8 lg:py-12">
          <div className="relative min-h-[24rem] lg:min-h-[34rem]">
            {adaptationArea ? (
              <MainAreaCarousel items={adaptationArea.categories} />
            ) : null}
          </div>

          <div className="max-w-lg lg:justify-self-end">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] app-accent-text">
              <span className="section-icon">
                <Leaf className="h-4 w-4" />
              </span>
              <span>
                WINEMAP <em>Adaptation</em>
              </span>
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight app-text-color sm:text-5xl">
              Explore strategies to adapt vineyards to climate change.
            </h2>
            <p className="mt-6 max-w-md app-lead">
              Discover ecosystem-based adaptation approaches, pilot experiences,
              and practical measures that connect climate resilience with
              everyday vineyard management.
            </p>
            <Link
              href="/adaptation"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium app-accent-text transition hover:gap-3"
            >
              <span>
                Discover WINEMAP <em>Adaptation</em>
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="governance"
        className="section-governance border-y border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.9))]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20 lg:px-8 lg:py-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] app-accent-text">
              <span className="section-icon">
                <Scale className="h-4 w-4" />
              </span>
              <span>
                WINEMAP <em>Governance</em>
              </span>
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight app-text-color sm:text-5xl">
              Understand the rules, institutions, and decisions shaping wine
              regions.
            </h2>
            <p className="mt-6 max-w-md app-lead">
              Navigate the policy frameworks, participatory approaches, and
              educational resources that influence how viticulture responds to
              environmental and social change.
            </p>
            <Link
              href="/governance"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium app-accent-text transition hover:gap-3"
            >
              <span>
                Discover WINEMAP <em>Governance</em>
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[24rem] lg:min-h-[34rem]">
            {governanceArea ? (
              <MainAreaCarousel items={governanceArea.categories} />
            ) : null}
          </div>
        </div>
      </section>

      <div className="relative z-20 w-full">
        <div className="relative z-20 w-full">
          <div id="map-applications" className="scroll-mt-28">
            <BackgroundImageCarousel
              items={mapApplications}
              ariaLabel="Map applications carousel"
            />
          </div>

          {/* FAQ Section */}
          <section className="mx-auto max-w-5xl border-t border-[color:var(--border)] px-4 py-20 sm:px-6 lg:px-8">
            <div>
              <h2 className="app-section-title mb-12 text-center font-bold">
                Frequently Asked Questions
              </h2>
              <div className={styles.FAQList}>
                <details className={styles.FAQDetails}>
                  <summary className={styles.FAQSummary}>
                    <span className={styles.FAQQuestion}>
                      Who is behind this project?
                    </span>
                    <span className={styles.FAQChevron}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className={styles.FAQAnswer}>
                    WINEMAP is developed by the{" "}
                    <a
                      href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.FAQLink}
                    >
                      Institute for Alpine Environment{" "}
                    </a>
                    at Eurac Research in Bolzano, Italy. Our interdisciplinary
                    research team specializes in climate adaptation,
                    environmental science, and sustainable agriculture,
                    providing the scientific foundation for this platform. The
                    project is part of{" "}
                    <a
                      href="https://www.eurac.edu/en/data-in-action"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.FAQLink}
                    >
                      Data in Action
                    </a>
                    , an initiative by Eurac Research&apos;s Communication
                    Department that transforms research data into accessible
                    digital experiences. The platform&apos;s concept and
                    technical development are handled by the Communication
                    Department. Learn more about{" "}
                    <Link href="/about/team" className={styles.FAQLink}>
                      our team
                    </Link>
                    .
                  </p>
                </details>

                <details className={styles.FAQDetails}>
                  <summary className={styles.FAQSummary}>
                    <span className={styles.FAQQuestion}>
                      What is the research behind the WINEMAP?
                    </span>
                    <span className={styles.FAQChevron}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className={styles.FAQAnswer}>
                    The different datasets and map-applications show in the
                    WINEMAP were created in the framework of several projects
                    and publications. You can find out more about the projects{" "}
                    <Link href="/about#projects" className={styles.FAQLink}>
                      here{" "}
                    </Link>
                    and browse through related publications{" "}
                    <Link href="/literature" className={styles.FAQLink}>
                      here
                    </Link>
                    .
                  </p>
                </details>

                <details className={styles.FAQDetails}>
                  <summary className={styles.FAQSummary}>
                    <span className={styles.FAQQuestion}>
                      What is the timeline of the project?
                    </span>
                    <span className={styles.FAQChevron}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className={styles.FAQAnswer}>
                    The project began with the collection and digitization of
                    PDO wine region data in 2020-2021. Climate and environmental
                    data integration followed in 2022-2023, with ongoing updates
                    to adaptation strategies and pilot implementation
                    experiences. The platform continues to evolve with new data
                    and features.
                  </p>
                </details>

                <details className={styles.FAQDetails}>
                  <summary className={styles.FAQSummary}>
                    <span className={styles.FAQQuestion}>
                      How can I use this data?
                    </span>
                    <span className={styles.FAQChevron}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className={styles.FAQAnswer}>
                    The WINEMAP data is available for research, educational, and
                    policy-making purposes. For specific data access,
                    collaboration opportunities, or questions about data usage,
                    please{" "}
                    <Link href="/imprint-privacy" className={styles.FAQLink}>
                      contact us
                    </Link>
                    .
                  </p>
                </details>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
