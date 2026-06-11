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

const discoverMoreLinks =
  mainAreas.find((area) => area.id === "governance")?.categories ?? [];

const discoverMoreIcons = {
  "/governance/eu-policy": Scale,
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

              <h1 className={styles.landingTitle}>Text 1</h1>

              <p className={styles.landingIntro}>Text 2</p>
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
            <aside className={styles.landingAside}>Part 1</aside>

            <div className={styles.landingCopy}>
              <p>Text in part 1</p>
            </div>
          </div>
        </section>

        <section className={styles.landingSection}>
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>Part 2</aside>

            <div className={styles.landingCopy}>
              <p>Text in part 2</p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.landingSection} ${styles.landingSectionBorderTop}`}
        >
          <div className={styles.landingSectionGrid}>
            <aside className={styles.landingAside}>Part 3</aside>

            <div className={styles.landingCopy}>
              <p>Text in part 3</p>
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
