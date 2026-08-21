import Link from "next/link";
import { mapApplications } from "@/content/map-applications";
import { ChevronDown } from "lucide-react";

import BackgroundImageCarousel from "@/components/BackgroundImageCarousel";
import CourseCarousel from "@/components/CourseCarousel";
// import RespondLogo from "@/components/ui/RespondLogo";
import OverviewNavigation from "@/components/winemap-sections/OverviewNavigation";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[color:var(--background)] app-text-color">
      <section className="relative isolate z-30 overflow-visible">
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
          <div className="absolute bottom-36 left-4 right-4 z-20 max-w-3xl sm:bottom-10 sm:left-auto sm:right-5">
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

          {/* <a
            href="https://www.alpine-space.eu/project/respond/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the RESPOnD project website (opens in a new tab)"
            className="absolute bottom-0 flex left-4 z-30 max-w-70 translate-y-1/2 items-center border border-[color:var(--border)] bg-[color:var(--surface)] px-2 py-2 shadow-[var(--shadow-strong)] transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] sm:left-6 lg:left-8"
          >
            <span className="mb-1 block text-xs font-semibold leading-5 app-text-color">
              Developed within the RESPOnD project
            </span>
            <RespondLogo className="h-20 w-auto shrink-0" aria-hidden="true" />
          </a> */}
        </div>
      </section>

      <section
        id="winemap-overview"
        className="section-winemap-overview relative isolate z-20 overflow-visible border-y border-[color:var(--border)] bg-[radial-gradient(circle_at_18%_18%,rgba(151,4,41,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,232,0.92))]"
      >
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
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

      <CourseCarousel />

      <div className="relative z-20 w-full">
        <div className="relative z-20 w-full">
          {/* <div id="map-applications" className="scroll-mt-28">
            <BackgroundImageCarousel
              items={mapApplications}
              ariaLabel="Map applications carousel"
            />
          </div> */}

          <section
            id="faq"
            aria-labelledby="faq-title"
            className={styles.FAQSection}
          >
            <div className={styles.FAQIntro}>
              <p className="app-eyebrow">Start exploring</p>
              <h2 id="faq-title" className="app-section-title">
                Questions about WINEMAP?
              </h2>
              <p className="app-lead">
                Find the right starting point, understand what the maps show,
                and discover where to find more detail.
              </p>
            </div>

            <div className={styles.FAQList}>
              <details className={styles.FAQDetails}>
                <summary className={styles.FAQSummary}>
                  <span className={styles.FAQQuestion}>What is WINEMAP?</span>
                  <span className={styles.FAQChevron} aria-hidden="true">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className={styles.FAQAnswer}>
                  <p>
                    WINEMAP is a digital knowledge platform for
                    climate-resilient European viticulture. It brings together
                    environmental evidence, adaptation approaches, governance
                    knowledge, and interactive maps for winegrowers, advisors,
                    policymakers, researchers, and anyone interested in the
                    future of wine landscapes.
                  </p>
                </div>
              </details>

              <details className={styles.FAQDetails}>
                <summary className={styles.FAQSummary}>
                  <span className={styles.FAQQuestion}>
                    Where should I start?
                  </span>
                  <span className={styles.FAQChevron} aria-hidden="true">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className={styles.FAQAnswer}>
                  <p>
                    Start with the area that best matches your question:{" "}
                    <Link href="/adaptation" className={styles.FAQLink}>
                      Adaptation
                    </Link>{" "}
                    for practical nature-based measures,{" "}
                    <Link href="/environment" className={styles.FAQLink}>
                      Environment
                    </Link>{" "}
                    for climate and landscape context,{" "}
                    <Link href="/governance" className={styles.FAQLink}>
                      Governance
                    </Link>{" "}
                    for legal and participatory frameworks, or{" "}
                    <Link
                      href="/map-applications/environment-browser"
                      className={styles.FAQLink}
                    >
                      WINEMAP Explorer
                    </Link>{" "}
                    to explore regional information directly.
                  </p>
                </div>
              </details>

              <details className={styles.FAQDetails}>
                <summary className={styles.FAQSummary}>
                  <span className={styles.FAQQuestion}>
                    How is WINEMAP organized and how do I navigate it?
                  </span>
                  <span className={styles.FAQChevron} aria-hidden="true">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className={styles.FAQAnswer}>
                  <p>
                    WINEMAP is organized around three thematic areas—{" "}
                    <Link href="/environment" className={styles.FAQLink}>
                      Environment
                    </Link>
                    ,{" "}
                    <Link href="/adaptation" className={styles.FAQLink}>
                      Adaptation
                    </Link>
                    , and{" "}
                    <Link href="/governance" className={styles.FAQLink}>
                      Governance
                    </Link>
                    —plus the{" "}
                    <Link
                      href="/map-applications/environment-browser"
                      className={styles.FAQLink}
                    >
                      WINEMAP Explorer
                    </Link>
                    . Use the main navigation to move between these areas. Each
                    thematic area opens with an introduction and a topic guide;
                    select a topic to explore its content, then use the Explorer
                    when you want to investigate a specific place or dataset
                    directly.
                  </p>
                </div>
              </details>

              <details className={styles.FAQDetails}>
                <summary className={styles.FAQSummary}>
                  <span className={styles.FAQQuestion}>
                    How do I explore a wine region in WINEMAP Explorer?
                  </span>
                  <span className={styles.FAQChevron} aria-hidden="true">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className={styles.FAQAnswer}>
                  <p>
                    Open the Explorer, then zoom to a place or use the search
                    and layer controls. Select a region or layer to inspect its
                    details. Use the map switcher at the left edge of the screen
                    to move to the PDO Atlas or Vulnerability Explorer; each
                    application includes an in-context help control.
                  </p>
                </div>
              </details>

              <details className={styles.FAQDetails}>
                <summary className={styles.FAQSummary}>
                  <span className={styles.FAQQuestion}>
                    Which map application should I use?
                  </span>
                  <span className={styles.FAQChevron} aria-hidden="true">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className={styles.FAQAnswer}>
                  <p>
                    Start with the Explorer for environmental layers and general
                    map exploration. Choose the European PDO Atlas to look up
                    wine regions and their regulatory information, or the
                    Vulnerability Explorer to compare the climate-change
                    vulnerability of PDO regions. You can switch between all
                    three applications from the map navigation bar.
                  </p>
                </div>
              </details>

              <details className={styles.FAQDetails}>
                <summary className={styles.FAQSummary}>
                  <span className={styles.FAQQuestion}>
                    Where do the data and methods come from?
                  </span>
                  <span className={styles.FAQChevron} aria-hidden="true">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className={styles.FAQAnswer}>
                  <p>
                    WINEMAP combines harmonised datasets and research outputs
                    from several projects and publications.{" "}
                    <Link href="/about/definitions" className={styles.FAQLink}>
                      Indicator definitions, methodology notes, references, and
                      sources
                    </Link>{" "}
                    are available in the Definitions section; related{" "}
                    <Link href="/literature" className={styles.FAQLink}>
                      publications
                    </Link>{" "}
                    are collected in the Scientific Literature library.
                  </p>
                </div>
              </details>

              <details className={styles.FAQDetails}>
                <summary className={styles.FAQSummary}>
                  <span className={styles.FAQQuestion}>
                    Can I reuse the data or get in touch?
                  </span>
                  <span className={styles.FAQChevron} aria-hidden="true">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className={styles.FAQAnswer}>
                  <p>
                    WINEMAP is available to explore online. For questions about
                    data access, reuse, collaboration, or the platform,{" "}
                    <Link href="/imprint-privacy" className={styles.FAQLink}>
                      contact the Institute for Alpine Environment at Eurac
                      Research
                    </Link>
                    . Learn more{" "}
                    <Link href="/about" className={styles.FAQLink}>
                      about WINEMAP
                    </Link>
                    .
                  </p>
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
