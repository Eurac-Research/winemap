import Image from "next/image";
import { Leaf } from "lucide-react";

import {
  TopicDirectory,
  TopicPanel,
} from "@/components/adaptation/TopicDirectory";
import { adaptationTopics } from "@/app/adaptation/topics.generated";
import styles from "@/styles/Home.module.css";

export default function AdaptationPage() {
  const activeSlug = adaptationTopics[0]?.slug;

  if (!activeSlug) {
    throw new Error("WINEMAP Adaptation requires at least one topic module.");
  }

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
                effects of climate change. Rising temperatures, shifting
                precipitation patterns, and more frequent extreme events are
                reshaping the conditions under which grapes are grown.
              </p>
              <p className={styles.landingIntro}>
                While these changes pose significant challenges, they also open
                new opportunities to rethink how vineyards are managed and how
                they can become more resilient and sustainable in the future.
              </p>
              <p className={styles.landingIntro}>
                WINEMAP Adaptation explores how vineyard management can become
                more resilient, multifunctional, and sustainable.
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

        <TopicDirectory
          topics={adaptationTopics.map(({ slug, title, description }) => ({
            slug,
            title,
            description,
          }))}
          initialActiveSlug={activeSlug}
        >
          {adaptationTopics.map((topic) => {
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
