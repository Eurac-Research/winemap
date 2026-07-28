"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import styles from "@/styles/Home.module.css";

export type TopicDirectoryItem = {
  slug: string;
  title: string;
  description: string;
};

type TopicDirectoryProps = {
  topics: TopicDirectoryItem[];
  initialActiveSlug: string;
  children: ReactNode;
};

type TopicDirectoryContextValue = {
  activeSlug: string;
};

const TopicDirectoryContext = createContext<TopicDirectoryContextValue | null>(
  null,
);

export function TopicDirectory({
  topics,
  initialActiveSlug,
  children,
}: TopicDirectoryProps) {
  const [activeSlug, setActiveSlug] = useState(initialActiveSlug);

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
            const isActive = topic.slug === activeSlug;

            return (
              <button
                key={topic.slug}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveSlug(topic.slug)}
                className={`${styles.topicDirectoryCard} ${
                  isActive ? styles.topicDirectoryCardActive : ""
                }`}
              >
                <span className={styles.topicDirectoryCardTopline}>
                  <span>{isActive ? "Viewing" : "Explore"}</span>
                  <ArrowRight
                    className={styles.topicDirectoryArrow}
                    aria-hidden="true"
                  />
                </span>
                <span className={styles.topicDirectoryTitle}>
                  {topic.title}
                </span>
                <span className={styles.topicDirectoryDescription}>
                  {topic.description}
                </span>
              </button>
            );
          })}
        </nav>

        <TopicDirectoryContext.Provider value={{ activeSlug }}>
          {children}
        </TopicDirectoryContext.Provider>
      </div>
    </section>
  );
}

type TopicPanelProps = {
  slug: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function TopicPanel({
  slug,
  title,
  description,
  children,
}: TopicPanelProps) {
  const context = useContext(TopicDirectoryContext);

  if (!context) {
    throw new Error("TopicPanel must be rendered inside TopicDirectory.");
  }

  const isActive = context.activeSlug === slug;

  return (
    <section
      hidden={!isActive}
      className={styles.topicPanel}
      aria-labelledby={`${slug}-topic-title`}
    >
      <header className={styles.topicPanelHeader}>
        <p className={styles.topicPanelEyebrow}>WINEMAP Adaptation</p>
        <h2 id={`${slug}-topic-title`} className={styles.topicPanelTitle}>
          {title}
        </h2>
        <p className={styles.topicPanelDescription}>{description}</p>
      </header>
      <div className={styles.topicPanelContent}>{children}</div>
    </section>
  );
}
