import Image from "next/image";
import { Leaf } from "lucide-react";

import { TopicDirectory } from "@/components/adaptation/TopicDirectory";
import { adaptationTopics } from "@/app/adaptation/topics.generated";
import styles from "@/styles/Home.module.css";

type AdaptationPageProps = {
  searchParams: Promise<{ topic?: string | string[] }>;
};

export default async function AdaptationPage({
  searchParams,
}: AdaptationPageProps) {
  const { topic } = await searchParams;
  const requestedTopic = typeof topic === "string" ? topic : undefined;
  const activeTopic = adaptationTopics.find(
    (candidate) => candidate.slug === requestedTopic,
  );
  const activeSlug = activeTopic?.slug ?? adaptationTopics[0]?.slug;

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
                WINEMAP Adaptation explores how vineyard management can become
                more resilient, multifunctional, and sustainable as climate
                conditions change.
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

        <TopicDirectory topics={adaptationTopics} activeSlug={activeSlug} />
      </article>
    </main>
  );
}
