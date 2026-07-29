import Image from "next/image";
import { Scale } from "lucide-react";

import { TopicDirectory, TopicPanel } from "@/components/topics/TopicDirectory";
import { topics } from "@/app/governance/topics.generated";
import styles from "@/styles/Home.module.css";

export default function GovernancePage() {
  const activeSlug = topics[0]?.slug;

  if (!activeSlug) {
    throw new Error("WINEMAP Governance requires at least one topic module.");
  }

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
                <span>WINEMAP Governance</span>
              </div>

              <h1 className={styles.landingTitle}>
                Navigating vineyard legal frameworks
              </h1>

              <p className={styles.landingIntro}>
                Europe&apos;s diverse vineyard landscapes and wine traditions
                are framed by a complex set of regional, national, and EU
                regulations. WINEMAP Governance brings together these legal
                frameworks and geographic indications for wine production in
                Europe.
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
                Vineyard governance connects regulations, local knowledge, and
                the stewardship of wine-growing landscapes.
              </figcaption>
            </figure>
          </div>
        </section>

        <TopicDirectory
          sectionLabel="WINEMAP Governance"
          heading="Explore Governance topics"
          topics={topics.map(({ slug, title, description }) => ({
            slug,
            title,
            description,
          }))}
          initialActiveSlug={activeSlug}
        >
          {topics.map((topic) => {
            const Topic = topic.Component;

            return (
              <TopicPanel
                key={topic.slug}
                slug={topic.slug}
                title={topic.title}
                description={topic.description}
              >
                <Topic />
              </TopicPanel>
            );
          })}
        </TopicDirectory>
      </article>
    </main>
  );
}
