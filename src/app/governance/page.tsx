import Image from "next/image";
import Link from "next/link";
import { mainAreas } from "@/content/main-areas";
import {
  ArrowRight,
  BookOpenText,
  GraduationCap,
  Scale,
  Users,
} from "lucide-react";

import styles from "@/styles/Home.module.css";
import DatawrapperChart from "@/components/DatawrapperChart";

const discoverMoreLinks =
  mainAreas.find((area) => area.id === "governance")?.categories ?? [];

const discoverMoreIcons = {
  "/governance/participatory-approaches": Users,
  "/governance/courses": GraduationCap,
};

export default function GovernancePage() {
  return (
    <main className={`${styles.landingPage} ${styles.sectionThemeGovernance}`}>
      <article>
        <section className={styles.landingHero}>
          <div className={styles.landingHeroGrid}>
            <div>
              <div className={styles.landingEyebrow}>
                <span className="section-icon">
                  <Scale className="h-4 w-4" />
                </span>
                <span>Winemap Governance</span>
              </div>

              <h1 className={styles.landingTitle}>Navigating vineyards’ legal frameworks </h1>

              <p className={styles.landingIntro}>
                Europe’s diverse vineyard landscapes and wine traditions are framed by a complex set of regional, national, and EU regulations. WINEMAP Governance gathers information about these legal frameworks and geographic indications for wine production in Europe.
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
            <aside className={styles.landingAside}>Legal framework and participatory approaches</aside>

            <div className={styles.landingCopy}>
              <p>
                Across Europe, wine production and vineyard management are governed by a dense, complex network of regulations. The recent EU framework covers a wide range of topics, such as the organization of the markets in agricultural products and their financing, through the Common Agricultural Policy (CAP). On a technical level, the EU also covers planting and plant health regulations, targeting physical and chemical characteristics of grapevine products and the authorizations for vine plantings and certifications.
              </p>
              <p>
                Besides EU legal frameworks, local participatory approaches also contribute to developing innovative solutions and ideas for the management and protection of vineyards and wine-regions identities and quality of wines. Making this knowledge accessible allows winemakers and researchers to share knowledge and ensure a sustainable future for wine regions.               </p>
            </div>
          </div>
        </section>

        <section className={styles.landingSection}>
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>Geographic Indications</aside>

            <div className={styles.landingCopy}>
              <p>
                As Europe is home to some of the world’s most prestigious wine regions, the European Union has established a quality scheme called Protected Designation of Origin (PDO) in order to maintain the integrity and quality of these wines. This system sets rules and regulations for the production, labelling, and promotion of wines within specific regions of Europe. This classification ensures that wines produced within those regions follow strict standards of quality and tradition, protecting the reputation and authenticity of each wine. The PDO designation is granted by the EU, and only wines that are produced within a certain region and meet specific production criteria are allowed to carry the PDO label.
              </p>
              <a
                className="article-media-link block"
                target="_blank"
                rel="noopener noreferrer"
                href="https://agriculture.ec.europa.eu/farming/geographical-indications-and-quality-schemes/geographical-indications-and-quality-schemes-explained_en#pdo"
              >
                <figure className="article-figure flex flex-col items-center px-4 text-center">
                  <Image
                    src="/icons/pdo-label.svg"
                    alt="PDO logo"
                    width={212}
                    height={212}
                    className="mx-auto"
                  />
                  <figcaption className="article-caption">
                    Official PDO logo from the European Commission
                  </figcaption>
                </figure>
              </a>
              <p>
                The PDO system is extensive and complex, covering thousands of wine types from various regions in Europe. Until recently, wine enthusiasts and industry professionals had to consult various sources to understand these classifications.              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionBorderTop}`}
        >
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>WINEMAP Governance</aside>

            <div className={styles.landingCopy}>
              <p>
                This complex system is now easier to navigate, as Eurac Research has produced the first-ever comprehensive map of Europe’s wine regions classified under the PDO system. Across the WINEMAP Governance, you can find accessible information on PDOs and other EU legislation about vineyards and wine products to link environmental and climatic components to specific PDO regions. The aim of the WINEMAP is to ensure wine-related stakeholders can learn and better understand, through specific courses or map applications, the global picture associated to vineyards’ management and protection, ensuring the cultural continuity of Europe’s wine-growing regions.
              </p>
              <DatawrapperChart
                chartId="DEUDJ/6?dark=true"
                title="Nr. of registered PDOs"
                ariaLabel="Line chart showing the number of registered PDOs over time"
                height={378}
              />
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
