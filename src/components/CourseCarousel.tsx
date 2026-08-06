"use client";

import { useRef } from "react";
import { courses } from "@/content/courses";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CourseCard from "@/components/CourseCard";

export default function CourseCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);

  const moveCarousel = (direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = viewport.querySelectorAll<HTMLElement>("[data-course-card]");
    const cardWidth = cards[1]?.offsetLeft - cards[0]?.offsetLeft;
    if (!cardWidth) return;

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    const nextScrollLeft =
      direction === -1
        ? Math.max(0, viewport.scrollLeft - cardWidth)
        : Math.min(maxScrollLeft, viewport.scrollLeft + cardWidth);

    viewport.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  };

  return (
    <section
      id="courses"
      aria-labelledby="courses-title"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="courses-title"
          className="text-4xl font-semibold leading-tight app-text-color sm:text-5xl"
        >
          Courses
        </h2>
        <p className="mt-3 app-lead">
          Improve your knowledge on viticulture, climate change, and
          ecosystem-based adaptation in a series of interactive courses.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-overlay)] app-text-color transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:h-12 sm:w-12"
          aria-label="Show previous course"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div
          ref={viewportRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Courses carousel"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              data-course-card
              className="w-[min(18rem,calc(100vw-7rem))] shrink-0 snap-start sm:w-72 lg:w-80"
            >
              <CourseCard
                course={course}
                imageSizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, calc(100vw - 7rem)"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => moveCarousel(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-overlay)] app-text-color transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:h-12 sm:w-12"
          aria-label="Show next course"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
