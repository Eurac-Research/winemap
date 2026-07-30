import Link from "next/link";
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
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import MainAreaCarousel from "@/components/winemap-sections/MainAreaCarousel";
import OverviewNavigation from "@/components/winemap-sections/OverviewNavigation";
import ProjectSmallCard from "@/components/ProjectCard"
import { projects } from "@/content/projects"
import styles from "@/styles/Home.module.css";

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
        className="section-winemap-overview relative isolate z-20 overflow-visible border-y border-[color:var(--border)] bg-[radial-gradient(circle_at_18%_18%,rgba(151,4,41,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.92))]"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl mt-4 font-semibold leading-tight app-text-color sm:text-5xl">
              How WINEMAP supports climate-resilient winegrowing
            </h2>
            <p className="mt-3 app-lead">
              WINEMAP is organized around three thematic pillars and one
              dedicated collection of map applications. Each entry point leads
              to a different way of working with the platform.
            </p>
          </div>

          <OverviewNavigation />
        </div>
      </section>

      <section
        id='projects'
        className="mx-auto flex flex-grid gap-4 max-w-4xl overflow-y-hidden py-4"
      >
        {projects.map(project => (
          <ProjectSmallCard key={project.slug} {... project} />
        ))}
      </section>

      <section
        id="environment"
        className="section-environment border-y border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.9))]"
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
              Explore indicators, spatial patterns, and vulnerability
              insights designed to support adaptation planning across
              wine-growing regions.
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link
                href="/environment"
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
