"use client";

import Image from "next/image";

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
          if (!entry.isIntersecting) return;

          setVisibleItems((currentItems) => {
            if (currentItems.includes(id)) return currentItems;
            return [...currentItems, id];
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    itemRefs.current.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="WINEMAP structure overview"
      className="mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 md:grid-cols-2"
    >
      {primaryNavigationSections.map(
        (
          { id, title, subtitle, Icon, accent, href, description, summary, image },
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
            className={`relative flex flex-col rounded-3xl border-2 border-black bg-white transition-all duration-500 ease-out hover:z-10 focus-within:z-10 focus-within:border-[color:var(--overview-accent)]/60 motion-reduce:transform-none motion-reduce:transition-none ${visibleItems.includes(id) ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={
              {
                "--overview-accent": accent,
                transitionDelay: visibleItems.includes(id)
                  ? `${index * 50}ms`
                  : "0ms",
              } as CSSProperties
            }
          >
            <div className="flex flex-1 flex-col px-5 pt-5 sm:px-7 sm:pt-5">
              <div className="flex items-start justify-between gap-4 sm:gap-5">
                <div>
                  <h3 className="mt-1 text-sm font-semibold leading-tight app-muted sm:text-md">
                    {title}
                  </h3>
                  <h2 className="text-2xl font-semibold leading-tight text-[color:var(--overview-accent)] sm:text-3xl">
                    {subtitle}
                  </h2>
                </div>

                <span className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--overview-accent)]/35 bg-white/90 shadow-md text-[color:var(--overview-accent)] sm:mt-0 sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
                </span>
              </div>

              <p className="mt-1 mb-3 max-w-md text-base leading-relaxed app-muted sm:mt-2">
                {description}
              </p>

              <Link
                href={href}
                aria-describedby={`overview-tooltip-${id}`}
                className="group/link relative z-10 mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-[color:var(--overview-accent)] px-2 py-1 text-base font-medium text-white transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-md active:translate-y-0 active:brightness-100 active:shadow-sm focus-visible:-translate-y-0.5 focus-visible:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--overview-accent)]"
              >
                <span>Discover more</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span
                  id={`overview-tooltip-${id}`}
                  role="tooltip"
                  className="pointer-events-none absolute right-0 top-[calc(100%+1rem)] z-50 w-[min(22rem,calc(100vw-3rem))] border border-[color:var(--border)] bg-[color:var(--background)] p-5 text-left text-sm font-normal leading-6 app-muted opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.2)] transition-opacity duration-150 group-hover/link:opacity-100 group-focus/link:opacity-100"
                >
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--overview-accent)]">
                    {title} {subtitle}
                  </span>
                  {summary}
                </span>
              </Link>
            </div>

            {/* <figure className="relative h-20 sm:h-24">
              <Image
                src="/images/vineyard_sun.jpg"
                alt="Vineyard at sunset"
                fill
                sizes="(min-width: 768px) 32rem, 100vw"
                className="object-cover object-center [clip-path:polygon(0_30%,100%_0,100%_100%,0_100%)]"
              />
            </figure> */}
            <figure className="relative z-0 h-26 overflow-hidden rounded-b-[22px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 32rem, 100vw"
                className="object-cover"
                style={{ objectPosition: image.position ?? "50% 50%", transform: `scale(${image.zoom ?? 1})` }}
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 top-0 h-8 w-full"
              >
                <path
                  d="M0 0H100V7C72 18 30 2 0 13Z"
                  fill="white"
                />
              </svg>
            </figure>
          </article>
        ),
      )}
    </nav>
  );
}
