import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { AdaptationTopic } from "@/app/adaptation/topics.generated";
import styles from "@/styles/Home.module.css";

type TopicDirectoryProps = {
  topics: AdaptationTopic[];
  activeSlug: string;
};

export function TopicDirectory({ topics, activeSlug }: TopicDirectoryProps) {
  const activeTopic =
    topics.find((topic) => topic.slug === activeSlug) ?? topics[0];

  if (!activeTopic) {
    return null;
  }

  const ActiveTopic = activeTopic.Component;

  return (
    <section
      className={`${styles.landingSection} ${styles.landingSectionBorderY}`}
    >
      <div className={styles.landingDiscoverShell}>
        <p className={styles.landingDiscoverHeading}>
          Explore Adaptation topics
        </p>

        <nav
          aria-label="Adaptation topics"
          className={styles.topicDirectoryGrid}
        >
          {topics.map((topic) => {
            const isActive = topic.slug === activeTopic.slug;

            return (
              <Link
                key={topic.slug}
                href={`/adaptation?topic=${encodeURIComponent(topic.slug)}`}
                aria-current={isActive ? "page" : undefined}
                className={`${styles.topicDirectoryCard} ${
                  isActive ? styles.topicDirectoryCardActive : ""
                }`}
              >
                <div className={styles.topicDirectoryCardTopline}>
                  <span>{isActive ? "Viewing" : "Explore"}</span>
                  <ArrowRight
                    className={styles.topicDirectoryArrow}
                    aria-hidden="true"
                  />
                </div>
                <h2 className={styles.topicDirectoryTitle}>{topic.title}</h2>
                <p className={styles.topicDirectoryDescription}>
                  {topic.description}
                </p>
              </Link>
            );
          })}
        </nav>

        <section
          className={styles.topicPanel}
          aria-labelledby="active-topic-title"
        >
          <header className={styles.topicPanelHeader}>
            <p className={styles.topicPanelEyebrow}>WINEMAP Adaptation</p>
            <h2 id="active-topic-title" className={styles.topicPanelTitle}>
              {activeTopic.title}
            </h2>
            <p className={styles.topicPanelDescription}>
              {activeTopic.description}
            </p>
          </header>
          <div className={styles.topicPanelContent}>
            <ActiveTopic />
          </div>
        </section>
      </div>
    </section>
  );
}
