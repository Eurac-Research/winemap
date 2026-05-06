'use client';

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MainAreaCard from "@/components/winemap-sections/MainAreaCard";

type CarouselItem = {
  href: string;
  label: string;
  description: string;
};

type MainAreaCarouselProps = {
  items: CarouselItem[];
};

function cleanLabel(label: string) {
  return label.replace(/\s*[^A-Za-z0-9]+$/u, "");
}

function imageLabel(title: string) {
  return `${title.toUpperCase()} / FEATURE`;
}

export default function MainAreaCarousel({ items }: MainAreaCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "prev" | "next") => {
    if (!scrollerRef.current) return;
    const width = scrollerRef.current.clientWidth;
    scrollerRef.current.scrollBy({
      left: direction === "next" ? width * 0.82 : -width * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByAmount("prev")}
        className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white text-[color:var(--accent-strong)] shadow-[0_12px_24px_rgba(15,39,66,0.12)] transition hover:bg-[color:var(--page-bg)] lg:inline-flex"
        aria-label="Show previous adaptation page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const title = cleanLabel(item.label);
          return (
            <div
              key={item.href}
              className="w-[74vw] min-w-[74vw] max-w-[20rem] sm:w-[21rem] sm:min-w-[21rem]"
            >
              <MainAreaCard
                href={item.href}
                title={title}
                description={item.description}
                imageLabel={imageLabel(title)}
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount("next")}
        className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white text-[color:var(--accent-strong)] shadow-[0_12px_24px_rgba(15,39,66,0.12)] transition hover:bg-[color:var(--page-bg)] lg:inline-flex"
        aria-label="Show next adaptation page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
