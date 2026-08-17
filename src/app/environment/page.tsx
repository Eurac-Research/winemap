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
                Understanding environmental change in vineyards
              </h1>

              <p className={styles.landingIntro}>
                Winegrowing is closely tied to its environment. Climate,
                water, soils, vegetation, and the wider landscape all
                shape how vines grow and the character of the wines they
                produce.
              </p>
              <p className={styles.landingIntro}>
                These conditions are changing across Europe. Rising
                temperatures, changing rainfall patterns, droughts, and other
                extremes are already affecting vineyards and their ecological
                conditions.
              </p>
              <p className={styles.landingIntro}>
                By bringing together climate
                information and scenarios with data on ecosystem services 
                and ecological conditions, WINEMAP Environment 
                helps you explore the environmental factors
                that matter for winegrowing and potentially shape its future.
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
