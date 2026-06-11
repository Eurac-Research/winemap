import Link from "next/link";
import { mainAreas } from "@/content/main-areas";
import {
  ArrowRight,
  Map as MapIcon,
  ShieldAlert,
  ThermometerSun,
} from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import styles from "@/styles/Home.module.css";

const discoverMoreLinks =
  mainAreas
    .find((area) => area.id === "climate-environment")
    ?.categories.filter((category) =>
      [
        "/map-applications/environment-browser",
        "/map-applications/vulnerability-explorer",
      ].includes(category.href),
    ) ?? [];

const discoverMoreIcons = {
  "/map-applications/environment-browser": MapIcon,
  "/map-applications/vulnerability-explorer": ShieldAlert,
};

export default function ClimateEnvironmentPage() {
  return (
    <main
      className={`${styles.landingPage} ${styles.sectionThemeClimateEnvironment}`}
    >
      <article>
        <section className={styles.landingHero}>
          <div className={styles.landingHeroGrid}>
            <div>
              <div className={styles.landingEyebrow}>
                <span className="section-icon">
                  <ThermometerSun className="h-4 w-4" />
                </span>
                <span>Winemap Environment</span>
              </div>

              <h1 className={styles.landingTitle}>
                Understanding the foundations of vineyard landscapes
              </h1>

              <p className={styles.landingIntro}>
                Vineyard landscapes across Europe are dynamic socio-ecological
                systems shaped by the interaction between agricultural
                practices, environmental conditions, and cultural heritage.
              </p>
            </div>

            <div className={styles.landingHeroPanel}>
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
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionBorderY}`}
        >
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>Vineyard landscapes</aside>

            <div className={styles.landingCopy}>
              <p>
                For centuries, vineyard landscapes across Europe have evolved
                into complex systems that are deeply embedded in local
                economies, environments, and cultural traditions. Far from being
                mere production areas, these landscapes represent dynamic{" "}
                <GlossaryTermPopover id="socio-ecological-system">
                  socio-ecological systems
                </GlossaryTermPopover>{" "}
                shaped by long-standing interactions between human activities
                and natural processes.
              </p>

              <p>
                Vineyard landscapes provide a wide range of{" "}
                <GlossaryTermPopover id="ecosystem-services">
                  ecosystem services
                </GlossaryTermPopover>{" "}
                , the benefits that nature offers to society. While their
                economic importance is primarily linked to grape and wine
                production, their value extends far beyond this. The mosaic of
                land uses surrounding vineyards, including forests, croplands,
                and riparian areas, supports biodiversity and ensures the proper
                functioning of ecosystems. At the same time, these landscapes
                embody strong cultural and historical identities, offering
                intangible benefits that shape local traditions, attract
                tourism, and reinforce the connection between communities and
                their environment.
              </p>

              <p>
                This interplay between environmental conditions, agricultural
                practices, and cultural heritage is at the heart of the concept
                of terroir.{" "}
                <GlossaryTermPopover id="terroir">Terroir</GlossaryTermPopover>{" "}
                reflects how the unique combination of climate, soil, landscape,
                and human knowledge defines the distinctive character of wines.
                In this sense, the quality and identity of wine are not only
                rooted in the land, but also in the cultural practices and
                traditions that have developed over generations.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.landingSection}>
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>Pressures and change</aside>

            <div className={styles.landingCopy}>
              <p>
                However, the ecological balance that underpins these systems is
                increasingly under pressure. Vineyard landscapes are highly
                sensitive to both environmental and human-induced changes, which
                can disrupt the provision of key ecosystem services.
              </p>

              <p>
                One of the most pressing challenges is climate change. Shifts in
                temperature and precipitation patterns are already affecting
                vine growth cycles, grape composition, and the suitability of
                traditional wine-growing areas. These changes may alter not only
                productivity, but also the identity and quality of wines,
                potentially redefining the geographical areas where certain
                varieties can thrive. As climatic conditions continue to evolve,
                winegrowers are being forced to reconsider established practices
                and explore new approaches, including changes in cultivation
                techniques, grape varieties, or even the relocation of
                vineyards.
              </p>

              <p>
                At the same time, vineyard landscapes are undergoing significant
                transformations driven by{" "}
                <GlossaryTermPopover id="intensification">
                  agricultural intensification
                </GlossaryTermPopover>
                . In response to increasing market competition and changing
                consumer demands, many vineyards have shifted towards more
                intensive and specialized production systems. This often
                involves simplifying landscape structures, reducing diversity,
                and focusing on maximizing grape yields. While these approaches
                can enhance short-term productivity, they frequently come at the
                cost of environmental sustainability.
              </p>

              <p>
                The expansion of monocultures and the increased use of
                fertilizers and pesticides have contributed to biodiversity loss
                and the degradation of essential{" "}
                <GlossaryTermPopover id="ecosystem-functions">
                  ecosystem functions
                </GlossaryTermPopover>
                . Services such as soil fertility, water regulation, and natural
                pest control are increasingly compromised, making vineyard
                systems more vulnerable to external disturbances. In parallel,
                traditional, smaller-scale vineyards are often abandoned due to
                lower economic competitiveness, leading to further landscape
                homogenization or conversion to other land uses.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionBorderTop}`}
        >
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>WINEMAP Environment</aside>

            <div className={styles.landingCopy}>
              <p>
                Together, these pressures highlight the urgent need to better
                understand and manage vineyard landscapes as multifunctional
                vineyard systems. Assessing their{" "}
                <GlossaryTermPopover id="ecological-conditions">
                  ecological conditions
                </GlossaryTermPopover>{" "}
                , mapping ecosystem services, and identifying areas of
                vulnerability are essential steps toward more sustainable and
                resilient viticulture.
              </p>

              <p>
                In this context, the WINEMAP Environment provides spatially
                explicit, accessible information on environmental conditions,
                ecosystem services, and climate-related risks, supporting
                winegrowers, researchers, and policymakers in making informed
                decisions. Ultimately, this knowledge base helps guide the
                transition toward more sustainable vineyard management practices
                that can preserve both the ecological integrity and cultural
                heritage of European wine landscapes.
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
              className={`${styles.landingDiscoverGrid} ${styles.landingDiscoverGrid2}`}
            >
              {discoverMoreLinks.map((category) => {
                const Icon =
                  discoverMoreIcons[
                    category.href as keyof typeof discoverMoreIcons
                  ] ?? MapIcon;
                const label = category.label.replace(/\s*[-–—]*>\s*$/, "");

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
                    <h3 className={styles.landingDiscoverTitle}>{label}</h3>
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
