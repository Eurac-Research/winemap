import { ThermometerSun } from "lucide-react";

import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { TopicDirectory, TopicPanel } from "@/components/topics/TopicDirectory";
import { topics } from "@/app/environment/topics.generated";
import styles from "@/styles/Home.module.css";

export default function EnvironmentPage() {
  const activeSlug = topics[0]?.slug;

  if (!activeSlug) {
    throw new Error("WINEMAP Environment requires at least one topic module.");
  }

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
                <span>WINEMAP Environment</span>
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

        <TopicDirectory
          sectionLabel="WINEMAP Environment"
          heading="Explore Environment topics"
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
