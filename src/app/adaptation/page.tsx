import Image from "next/image";
import Link from "next/link";
import { mainAreas } from "@/content/main-areas";
import {
  ArrowRight,
  BookOpenText,
  Film,
  Leaf,
  Database,
  Map as MapIcon,
} from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import styles from "@/styles/Home.module.css";

const discoverMoreLinks =
  mainAreas.find((area) => area.id === "adaptation")?.categories ?? [];

const discoverMoreIcons = {
  "/adaptation/eba-strategies": Database,
  "/adaptation/pilot-experiences": Film,
  "/adaptation": MapIcon,
};

export default function AdaptationPage() {
  return (
    <main className={`${styles.landingPage} ${styles.sectionThemeAdaptation}`}>
      <article>
        <section className={styles.landingHero}>
          <div className={styles.landingHeroGrid}>
            <div>
              <div className={styles.landingEyebrow}>
                <span className="section-icon">
                  <Leaf className="h-4 w-4" />
                </span>
                <span>WINEMAP Adaptation</span>
              </div>

              <h1 className={styles.landingTitle}>
                Working with nature in vineyard landscapes
              </h1>

              <p className={styles.landingIntro}>
                Across Europe, winegrowers are already witnessing the tangible
                effects of climate change. WINEMAP Adaptation explores how
                vineyard management can become more resilient, multifunctional,
                and sustainable.
              </p>
            </div>

            <figure className={styles.landingHeroFigure}>
              <div className={styles.landingHeroImage}>
                <Image
                  src="/images/vineyard_sun.jpg"
                  alt="Sunlit vineyard landscape"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <figcaption className={styles.landingHeroCaption}>
                Adaptation in viticulture starts from the vineyard landscape:
                soil, biodiversity, water, management, and local knowledge.
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionBorderY}`}
        >
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>Climate pressure</aside>

            <div className={styles.landingCopy}>
              <p>
                Across Europe, especially in the Alpine regions, winegrowers are
                already witnessing the tangible effects of climate change.
                Rising temperatures, shifting precipitation patterns, and more
                frequent extreme events are reshaping the conditions under which
                grapes are grown.
              </p>

              <p>
                While these changes pose significant challenges, they also open
                new opportunities to rethink how vineyards are managed and how
                they can become more resilient and sustainable in the future.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.landingSection}>
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>
              From concepts to practice
            </aside>

            <div className={styles.landingCopy}>
              <p>
                Over the past decade, several approaches have emerged to guide
                the transition towards more resilient agricultural systems.
                Among these,{" "}
                <GlossaryTermPopover id="ecosystem-based-adaptation">
                  Ecosystem-based Adaptation
                </GlossaryTermPopover>{" "}
                (EbA) promotes the use of biodiversity and{" "}
                <GlossaryTermPopover id="ecosystem-functions">
                  ecosystem functions
                </GlossaryTermPopover>{" "}
                to help agricultural systems adapt to climate change. EbA builds
                on the broader concept of{" "}
                <GlossaryTermPopover id="nature-based-solutions">
                  Nature-based Solutions (NbS)
                </GlossaryTermPopover>
                , approaches that harness natural processes to address
                environmental and societal challenges, while placing a stronger
                emphasis on climate adaptation.
              </p>

              <p>
                In vineyard systems, this means managing ecosystems in ways that
                strengthen their capacity to buffer climate impacts while
                maintaining productivity and environmental health. Importantly,
                EbA is not implemented through fixed solutions, but through
                adaptive management, an iterative process in which practices are
                continuously adjusted based on observation, learning, and
                feedback from the system.
              </p>

              <p>
                This approach encourages winegrowers to view vineyard landscapes
                as dynamic systems, where management evolves over time in
                response to changing environmental conditions. In this context,
                the concept of vinecology further supports the integration of
                ecological and agronomic principles, promoting vineyard systems
                that simultaneously sustain production, biodiversity, and
                long-term ecosystem functioning.
              </p>

              <p>
                Together, these approaches highlight a fundamental principle:
                diversity and ecological complexity are key to{" "}
                <GlossaryTermPopover id="resilience">
                  resilience
                </GlossaryTermPopover>
                . By enhancing biodiversity at field, farm, and landscape
                scales, vineyards can better withstand climate variability,
                reduce external inputs, and maintain multiple ecosystem
                functions. EbA therefore represents not just a set of practices,
                but a systemic shift in how vineyards are managed, moving from
                simplified, input-dependent systems towards more diverse,
                self-regulating, and resilient agroecosystems.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionBorderTop}`}
        >
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>
              Multifunctional vineyards
            </aside>

            <div className={styles.landingCopy}>
              <p>
                Translating Ecosystem-based Adaptation into practice means
                managing vineyards as multifunctional systems, capable of
                delivering multiple benefits simultaneously. Beyond grape
                production, vineyard landscapes can provide a wide range of{" "}
                <GlossaryTermPopover id="ecosystem-services">
                  ecosystem services
                </GlossaryTermPopover>
                , including biodiversity conservation, soil protection, water
                regulation, and climate mitigation.
              </p>

              <p>
                The concept of ecosystem multifunctionality reflects a shift
                from focusing on single outputs towards recognising vineyards as
                complex systems where ecological, economic, and social functions
                interact. Multifunctionality also helps reconcile the
                long-standing debate between agricultural production and nature
                conservation.
              </p>

              <p>
                Rather than separating these objectives, vineyard systems can be
                designed to integrate them, creating win-win solutions where
                productivity, environmental sustainability, and cultural values
                coexist. In this way, multifunctional vineyards not only adapt
                better to changing environmental conditions but also contribute
                to preserving the identity and long-term viability of vineyard
                landscapes.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionBorderTop}`}
        >
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>
              Bridging knowledge and action
            </aside>

            <div className={styles.landingCopy}>
              <p>
                Based on these principles, WINEMAP Adaptation aims to empower
                winegrowers, advisors, and policymakers to move towards more
                resilient, multifunctional vineyard systems, where production,
                environmental sustainability, and{" "}
                <GlossaryTermPopover id="cultural-heritage">
                  cultural heritage
                </GlossaryTermPopover>{" "}
                can coexist and thrive under changing climatic conditions.
              </p>

              <p>
                To this end, it provides a structured overview of
                Ecosystem-based Adaptation strategies tailored to viticulture,
                translating concepts into concrete and actionable practices. At
                the same time, adaptation is inherently context-specific.
                Strategies that are effective in one region may not be suitable
                in another, as local environmental conditions, grape varieties,
                and socio-economic factors strongly influence both feasibility
                and outcomes.
              </p>

              <p>
                Recognising this complexity, WINEMAP Adaptation offers users
                accessible, science-based information that links practices to
                their ecological conditions, functions, and benefits.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionDiscover}`}
        >
          <div className={styles.landingDiscoverShell}>
            <div>
              <p className={styles.landingDiscoverHeading}>Discover more</p>
            </div>

            <div
              className={`${styles.landingDiscoverGrid} ${styles.landingDiscoverGrid3}`}
            >
              {discoverMoreLinks.map((category) => {
                const Icon =
                  discoverMoreIcons[
                    category.href as keyof typeof discoverMoreIcons
                  ] ?? BookOpenText;
                const label = category.label.replace(/\s*->\s*$/, "");

                return (
                  <Link
                    key={category.href}
                    href={category.href}
                    className={styles.landingDiscoverCard}
                  >
                    <div className={styles.landingDiscoverIcons}>
                      <Icon className={styles.landingDiscoverIcon} />
                      <ArrowRight className={styles.landingDiscoverArrow} />
                    </div>
                    <h2 className={styles.landingDiscoverTitle}>{label}</h2>
                    <p className={styles.landingDiscoverDescription}>
                      {category.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
