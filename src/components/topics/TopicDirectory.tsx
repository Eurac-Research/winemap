"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import styles from "@/styles/Home.module.css";

export type TopicDirectoryItem = {
  slug: string;
  title: string;
  description: string;
};

type TopicDirectoryProps = {
  sectionLabel: string;
  heading: string;
  topics: TopicDirectoryItem[];
  initialActiveSlug: string;
  children: ReactNode;
};

type TopicDirectoryContextValue = {
  activeSlug: string;
  sectionLabel: string;
};

const TopicDirectoryContext = createContext<TopicDirectoryContextValue | null>(
  null,
);

export function TopicDirectory({
  sectionLabel,
  heading,
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
        <Link href="/#winemap-overview" className={styles.landingBackLink}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to WINEMAP home
        </Link>
        <p className={styles.landingDiscoverHeading}>{heading}</p>

        <nav
          aria-label={`${sectionLabel} topics`}
          className={styles.topicDirectoryGrid}
        >
          {topics.map((topic) => {
            const isActive = topic.slug === activeSlug;
            const panelId = `${topic.slug}-topic-panel`;

            return (
              <button
                key={topic.slug}
                type="button"
                aria-pressed={isActive}
                aria-controls={panelId}
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

        <TopicDirectoryContext.Provider value={{ activeSlug, sectionLabel }}>
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
  const titleId = `${slug}-topic-title`;

  return (
    <section
      id={`${slug}-topic-panel`}
      hidden={!isActive}
      className={styles.topicPanel}
      aria-labelledby={titleId}
    >
      <header className={styles.topicPanelHeader}>
        <p className={styles.topicPanelEyebrow}>{context.sectionLabel}</p>
        <h2 id={titleId} className={styles.topicPanelTitle}>
          {title}
        </h2>
        <p className={styles.topicPanelDescription}>{description}</p>
      </header>
      <div className={styles.topicPanelContent}>{children}</div>
    </section>
  );
}
