import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Scale,
  ThermometerSun,
} from "lucide-react";

import BackgroundImageCarousel from "@/components/BackgroundImageCarousel";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import RespondLogo from "@/components/ui/RespondLogo";
import MainAreaCarousel from "@/components/winemap-sections/MainAreaCarousel";
import { mainAreas } from "@/content/main-areas";
import { mapApplications } from "@/content/map-applications";
import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  const adaptationArea = mainAreas.find((area) => area.id === "adaptation");
  const governanceArea = mainAreas.find((area) => area.id === "governance");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/landscape.jpg)",
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
                Winemap
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:ml-auto sm:text-lg">
                An essential resource for stakeholders, farmers, and researchers
                on understanding wine heritage, climate adaptation, and
                governance frameworks.
              </p>
              <div className="mt-8 flex flex-wrap justify-end gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--primary)] px-4 py-2 transition hover:bg-[color:var(--primary)]"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about/team"
                  className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--primary)] px-4 py-2 transition hover:bg-[color:var(--primary)]"
                >
                  <span>Our Team</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id = "climate-environment" className="border-y border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.9))]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20 lg:px-8 lg:py-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/20 text-[color:var(--accent-strong)]">
                <ThermometerSun className="h-4 w-4" />
              </span>
              <span>Winemap Environment</span>
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-5xl">
              Discover how climate pressure is reshaping European viticulture.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-[color:var(--foreground)]">
              Explore indicators, spatial patterns, and <GlossaryTermPopover id="vulnerability">vulnerability</GlossaryTermPopover>{" "} insights
              designed to support adaptation planning across wine-growing
              regions.
            </p>
            <Link
              href="/map-applications/environment-browser"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-[color:var(--accent-strong)] transition hover:gap-3"
            >
              <span>Open the environment browser</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[24rem] lg:min-h-[34rem]">
            <div className="absolute inset-x-0 top-6 hidden h-px bg-[color:var(--border-soft)] lg:block" />
            <div className="absolute right-6 top-0 hidden h-20 w-20 rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/35 lg:block" />

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

      <section id = 'adaptation' className="border-y border-[color:var(--border-soft)] bg-[color:var(--primary)]/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.85fr)] lg:items-center lg:gap-12 lg:px-8 lg:py-12">
          <div className="relative min-h-[24rem] lg:min-h-[34rem]">
            {adaptationArea ? (
              <MainAreaCarousel items={adaptationArea.categories} />
            ) : null}
          </div>

          <div className="max-w-lg lg:justify-self-end">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/20 text-[color:var(--accent-strong)]">
                <Leaf className="h-4 w-4" />
              </span>
              <span>Winemap Adaptation</span>
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-5xl">
              Explore strategies to adapt vineyards to climate change.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-[color:var(--foreground)]">
              Discover ecosystem-based adaptation approaches, pilot experiences,
              and practical measures that connect climate resilience with
              everyday vineyard management.
            </p>
            <Link
              href="/adaptation"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-[color:var(--accent-strong)] transition hover:gap-3"
            >
              <span>Learn more about adaptation pathways</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id = 'governance' className="border-y border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.9))]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20 lg:px-8 lg:py-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/20 text-[color:var(--accent-strong)]">
                <Scale className="h-4 w-4" />
              </span>
              <span>Winemap Governance</span>
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-5xl">
              Understand the rules, institutions, and decisions shaping wine
              regions.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-[color:var(--foreground)]">
              Navigate the policy frameworks, participatory approaches, and
              educational resources that influence how viticulture responds to
              environmental and social change.
            </p>
            <Link
              href="/legal/eu-policy"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-[color:var(--accent-strong)] transition hover:gap-3"
            >
              <span>Learn more about governance frameworks</span>
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
          <section className="mx-auto max-w-5xl border-t border-[color:var(--border-soft)] px-4 py-20 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold mb-12 text-center text-[color:var(--foreground)]">
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
                      What is the research behind the Winemap?
                    </span>
                    <span className={styles.FAQChevron}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className={styles.FAQAnswer}>
                    The different datasets and map-applications show in the
                    Winemap were created in the framework of several projects
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
