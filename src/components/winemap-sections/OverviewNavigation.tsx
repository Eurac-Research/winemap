"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { primaryNavigationSections } from "@/content/primary-navigation";
import { ArrowRight } from "lucide-react";

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
      className="mx-auto mt-8 grid max-w-4xl gap-2 sm:mt-10 md:grid-cols-2"
    >
      {primaryNavigationSections.map(
        (
          { id, title, subtitle, Icon, accent, href, description, summary },
          index,
        ) => (
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
            className={`relative flex flex-col border border-[color:var(--border)] bg-white/75 transition-all duration-500 ease-out hover:z-10 focus-within:z-10 focus-within:border-[color:var(--overview-accent)]/60 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 ${visibleItems.includes(id) ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={
              {
                "--overview-accent": accent,
                transitionDelay: visibleItems.includes(id)
                  ? `${index * 50}ms`
                  : "0ms",
              } as CSSProperties
            }
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="mt-2 text-2xl font-semibold leading-tight app-text-color">
                  {title}
                </h3>
                <h2 className="mt-1 text-1xl font-semibold leading-tight text-[color:var(--overview-accent)]">
                  {subtitle}
                </h2>
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
                  className="pointer-events-none absolute right-0 top-[calc(100%+1rem)] z-50 hidden w-[min(22rem,calc(100vw-3rem))] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-left text-sm leading-6 text-[color:var(--app-text-color)] opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.2)] transition group-hover/icon:block group-hover/icon:opacity-100 group-focus/icon:block group-focus/icon:opacity-100"
                >
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--overview-accent)]">
                    {title} {subtitle}
                  </span>
                  {summary}
                </span>
              </span>
            </div>

            <p className="mt-2 max-w-md text-base leading-relaxed app-muted">
              {description}
            </p>

            <Link
              href={href}
              className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-base font-medium text-[color:var(--overview-accent)] transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--overview-accent)]"
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
