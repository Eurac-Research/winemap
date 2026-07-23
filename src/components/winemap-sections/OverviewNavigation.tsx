"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import { Leaf, Map, Scale, ThermometerSun } from "lucide-react";

const overviewItems = [
  {
    id: "adaptation",
    title: "WINEMAP Adaptation",
    Icon: Leaf,
    accent: "var(--section-adaptation-accent)",
    arcOffset: "md:-translate-x-5",
    summary:
      "A practice-oriented entry point for vineyard managers, advisors, researchers, and local actors who want to understand how wine regions can respond to climate stress. This section brings together ecosystem-based adaptation strategies, pilot experiences, and implementation examples so users can move from general adaptation needs to concrete measures in the vineyard and surrounding landscape.",
  },
  {
    id: "environment",
    title: "WINEMAP Environment",
    Icon: ThermometerSun,
    accent: "var(--section-environment-accent)",
    arcOffset: "md:translate-x-2",
    summary:
      "The scientific and spatial evidence base of WINEMAP. This section is for users who need to explore climate indicators, environmental conditions, and vulnerability patterns across European wine regions. It helps researchers, planners, educators, and practitioners understand where pressures are emerging, how they differ by region, and which environmental factors matter for adaptation planning.",
  },
  {
    id: "governance",
    title: "WINEMAP Governance",
    Icon: Scale,
    accent: "var(--section-governance-accent)",
    arcOffset: "md:translate-x-2",
    summary:
      "A guide to the policy, institutional, and participatory side of climate adaptation in viticulture. This section is useful for decision-makers, public administrations, regional organizations, educators, and project teams who need to understand legal frameworks, protected designations, stakeholder processes, and learning resources that shape how wine regions can act.",
  },
  {
    id: "map-applications",
    title: "Map Applications",
    Icon: Map,
    accent: "var(--accent)",
    arcOffset: "md:-translate-x-5",
    summary:
      "A dedicated collection of interactive tools for exploring WINEMAP data directly on maps. This area is for users who want to browse spatial layers, compare regions, inspect PDO information, investigate vulnerability, or work with specific geospatial applications without first reading through the thematic sections. It is the fastest route from a question about place to an interactive map view.",
  },
];

export default function OverviewNavigation() {
  const itemRefs = useRef(new globalThis.Map<string, HTMLAnchorElement>());
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-overview-id");
          if (!id) return;

          setVisibleItems((currentItems) => {
            const isVisible = currentItems.includes(id);
            if (isVisible === entry.isIntersecting) return currentItems;

            return entry.isIntersecting
              ? [...currentItems, id]
              : currentItems.filter((itemId) => itemId !== id);
          });
        });
      },
      { threshold: 0.6 },
    );

    itemRefs.current.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleOverviewLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="WINEMAP structure overview"
      className="mt-8 grid grid-cols-2 items-start justify-items-center gap-x-3 gap-y-8 sm:mt-10 sm:grid-cols-4 sm:gap-x-5 md:mt-0 md:h-[30rem] md:grid-cols-1 md:grid-rows-4 md:content-center md:justify-items-start md:gap-0 xl:h-[34rem]"
    >
      {overviewItems.map(
        ({ id, title, Icon, accent, arcOffset, summary }, index) => (
          <Link
            key={id}
            href={`#${id}`}
            ref={(element) => {
              if (element) {
                itemRefs.current.set(id, element);
              } else {
                itemRefs.current.delete(id);
              }
            }}
            data-overview-id={id}
            onClick={(event) => handleOverviewLinkClick(event, id)}
            className={`group relative flex w-full max-w-36 flex-col items-center gap-3 text-center transition-all duration-500 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--overview-accent)] motion-reduce:transform-none motion-reduce:transition-none md:max-w-none md:justify-self-start ${arcOffset} ${visibleItems.includes(id) ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={
              {
                "--overview-accent": accent,
                transitionDelay: visibleItems.includes(id)
                  ? `${index * 160}ms`
                  : "0ms",
              } as CSSProperties
            }
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--overview-accent)]/35 bg-white/80 text-[color:var(--overview-accent)] shadow-[0_10px_28px_rgba(21,20,18,0.1)] transition duration-200 group-hover:scale-110 group-hover:border-[color:var(--overview-accent)] group-hover:bg-[color:var(--overview-accent)]/10">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold leading-snug app-text-color">
              {title}
            </span>
            <span className="pointer-events-none absolute z-30 hidden w-[22rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-left text-sm leading-6 text-[color:var(--app-text-color)] opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.2)] transition group-hover:opacity-100 group-focus-visible:opacity-100 md:right-[calc(100%+1.25rem)] md:top-1/2 md:-translate-y-1/2 md:block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--overview-accent)]">
                {title}
              </span>
              {summary}
            </span>
          </Link>
        ),
      )}
    </nav>
  );
}
