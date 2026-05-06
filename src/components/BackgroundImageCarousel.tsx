'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export type BackgroundCarouselItem = {
  title: string;
  description: string;
  href: string;
  backgroundImage: string;
  backgroundAlt?: string;
  backgroundPosition?: string;
  eyebrow?: string;
  ctaLabel?: string;
};

type BackgroundImageCarouselProps = {
  items: BackgroundCarouselItem[];
  ariaLabel: string;
  className?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export default function BackgroundImageCarousel({
  items,
  ariaLabel,
  className = "",
  viewAllHref,
  viewAllLabel = "View all",
}: BackgroundImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  if (!activeItem) {
    return null;
  }

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <section
      className={`relative isolate min-h-[34rem] overflow-hidden border-y border-[color:var(--border-soft)] text-white sm:min-h-[39rem] lg:min-h-[44rem] ${className}`}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <Image
          key={item.title}
          src={item.backgroundImage}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ease-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: item.backgroundPosition ?? "center" }}
          aria-hidden="true"
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,27,0.78)_0%,rgba(8,17,27,0.54)_36%,rgba(8,17,27,0.2)_72%,rgba(8,17,27,0.08)_100%)]" />
      <div className="absolute inset-0 bg-black/15" />

      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="absolute right-4 top-6 z-20 inline-flex items-center justify-center bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)] sm:right-8 lg:right-12"
        >
          {viewAllLabel}
        </Link>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-7xl items-center px-4 py-16 sm:min-h-[39rem] sm:px-6 lg:min-h-[44rem] lg:px-8">
        <div className="grid h-[28rem] w-full max-w-3xl grid-cols-[2.5rem_minmax(0,1fr)] gap-5 sm:h-[30rem] sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-7 lg:h-[31rem]">
          <div className="flex h-full flex-col items-center pt-1">
            <div className="min-h-0 w-px flex-1 bg-[color:var(--primary)]" />
            <button
              type="button"
              onClick={showNext}
              className="mt-5 inline-flex h-9 w-9 flex-none items-center justify-center text-[color:var(--primary)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="Show next carousel slide"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </div>

          <div className="flex h-full min-w-0 flex-col pt-14 sm:pt-20">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              {activeItem.eyebrow ?? "Featured"}
            </p>
            <h2 className="mt-3 max-w-[15ch] text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {activeItem.title}
            </h2>
            <p className="mt-7 max-w-md text-base font-medium leading-8 text-white/92 sm:text-lg">
              {activeItem.description}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
              <div className="flex items-center gap-2" aria-label="Carousel slides">
                {items.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-[color:var(--primary)]"
                        : "w-2.5 bg-white/55 hover:bg-white"
                    }`}
                    aria-label={`Show ${item.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>

              <Link
                href={activeItem.href}
                className="inline-flex items-center gap-2 text-base font-semibold text-[color:var(--primary)] transition hover:gap-3 hover:text-white"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current">
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span>{activeItem.ctaLabel ?? "Read more"}</span>
              </Link>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
