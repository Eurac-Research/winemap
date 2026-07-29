"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Map, Scale, ThermometerSun } from "lucide-react";

const overviewItems = [
  {
    id: "adaptation",
    title: "WINEMAP Adaptation",
    Icon: Leaf,
    accent: "var(--section-adaptation-accent)",
    href: "/adaptation",
    description:
      "Discover ecosystem-based adaptation strategies and pilot implementation experiences for viticulture.",
    summary:
      "A practice-oriented entry point for vineyard managers, advisors, researchers, and local actors who want to understand how wine regions can respond to climate stress. This section brings together ecosystem-based adaptation strategies, pilot experiences, and implementation examples so users can move from general adaptation needs to concrete measures in the vineyard and surrounding landscape.",
  },
  {
    id: "environment",
    title: "WINEMAP Environment",
    Icon: ThermometerSun,
    accent: "var(--section-environment-accent)",
    href: "/environment",
    description:
      "Explore climate data, vulnerability assessments, and environmental indicators for wine regions across Europe.",
    summary:
      "The scientific and spatial evidence base of WINEMAP. This section is for users who need to explore climate indicators, environmental conditions, and vulnerability patterns across European wine regions. It helps researchers, planners, educators, and practitioners understand where pressures are emerging, how they differ by region, and which environmental factors matter for adaptation planning.",
  },
  {
    id: "governance",
    title: "WINEMAP Governance",
    Icon: Scale,
    accent: "var(--section-governance-accent)",
    href: "/governance",
    description:
      "Navigate legal frameworks, regulations, and geographic indications for wine production in Europe.",
    summary:
      "A guide to the policy, institutional, and participatory side of climate adaptation in viticulture. This section is useful for decision-makers, public administrations, regional organizations, educators, and project teams who need to understand legal frameworks, protected designations, stakeholder processes, and learning resources that shape how wine regions can act.",
  },
  {
    id: "map-applications",
    title: "Map Applications",
    Icon: Map,
    accent: "var(--accent)",
    href: "#map-applications",
    description:
      "Work directly with WINEMAP's interactive tools to explore spatial layers, regions, and vulnerability patterns.",
    summary:
      "A dedicated collection of interactive tools for exploring WINEMAP data directly on maps. This area is for users who want to browse spatial layers, compare regions, inspect PDO information, investigate vulnerability, or work with specific geospatial applications without first reading through the thematic sections. It is the fastest route from a question about place to an interactive map view.",
  },
];

export default function OverviewNavigation() {
  const itemRefs = useRef(new globalThis.Map<string, HTMLElement>());
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

  return (
    <nav
      aria-label="WINEMAP structure overview"
      className="mx-auto mt-8 grid max-w-5xl gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2"
    >
      {overviewItems.map(
        ({ id, title, Icon, accent, href, description, summary }, index) => (
          <article
            key={id}
            ref={(element) => {
              if (element) {
                itemRefs.current.set(id, element);
              } else {
                itemRefs.current.delete(id);
              }
            }}
            data-overview-id={id}
            className={`relative flex flex-col border border-[color:var(--border)] bg-white/75 p-6 shadow-[0_14px_38px_rgba(21,20,18,0.07)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[color:var(--overview-accent)]/60 hover:shadow-[0_22px_48px_rgba(21,20,18,0.13)] focus-within:border-[color:var(--overview-accent)]/60 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 ${visibleItems.includes(id) ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={
              {
                "--overview-accent": accent,
                transitionDelay: visibleItems.includes(id)
                  ? `${index * 160}ms`
                  : "0ms",
              } as CSSProperties
            }
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--overview-accent)]">
                  Explore
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight app-text-color">
                  {title}
                </h3>
              </div>

              <span
                tabIndex={0}
                aria-describedby={`overview-tooltip-${id}`}
                aria-label={`More information about ${title}`}
                className="group/icon relative inline-flex h-16 w-16 shrink-0 cursor-help items-center justify-center rounded-full border border-[color:var(--overview-accent)]/35 bg-white/90 text-[color:var(--overview-accent)] shadow-[0_10px_28px_rgba(21,20,18,0.1)] transition duration-200 hover:scale-110 hover:border-[color:var(--overview-accent)] hover:bg-[color:var(--overview-accent)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--overview-accent)]"
              >
                <Icon className="h-8 w-8" aria-hidden="true" />
                <span
                  id={`overview-tooltip-${id}`}
                  role="tooltip"
                  className="pointer-events-none absolute right-0 top-[calc(100%+1rem)] z-30 hidden w-[min(22rem,calc(100vw-3rem))] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-left text-sm leading-6 text-[color:var(--app-text-color)] opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.2)] transition group-hover/icon:block group-hover/icon:opacity-100 group-focus/icon:block group-focus/icon:opacity-100"
                >
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--overview-accent)]">
                    {title}
                  </span>
                  {summary}
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-md text-base leading-relaxed app-muted">
              {description}
            </p>

            <Link
              href={href}
              className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-base font-medium text-[color:var(--overview-accent)] transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--overview-accent)]"
            >
              <span>Discover more</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ),
      )}
    </nav>
  );
}
