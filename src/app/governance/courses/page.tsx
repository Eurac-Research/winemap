"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface Course {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Ecosystem based adaptation in Viticulture",
    url: "",
    thumbnail: "",
  },
  {
    id: "2",
    title: "Vitiforestry",
    url: "",
    thumbnail: "",
  },
  {
    id: "3",
    title: "Nature based Solutions in Vineyards",
    url: "",
    thumbnail: "",
  },
  {
    id: "4",
    title: "Green Infrastructure",
    url: "https://e-learning.eurac.edu/en/green-infrastructure/#/",
    thumbnail: "/course-thumbnails/green-infrastructure.png",
  },
  {
    id: "5",
    title: "Biodiversität Südtirol",
    url: "https://e-learning.eurac.edu/de/biodiversitaet/#/",
    thumbnail: "/course-thumbnails/biodiversitaet-suedtirol.png",
  }
];

export default function CoursesPage() {
  return (
    <div className="section-governance article-page">
      <div className="article-shell">
        <header className="article-header">
          <p className="article-eyebrow">
            <span className="section-icon">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
            </span>
            WINEMAP Governance
          </p>
          <h1 className="article-title">Courses</h1>
          <p className="article-lead">
            Learning resources and training materials related to sustainable
            landscape management, green infrastructure, and biodiversity.
          </p>
        </header>

        <section
          aria-label="Courses"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course) => (
            <Link
              key={course.id}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg border transition-all duration-300 border-[color:var(--border)] bg-[color:var(--surface-overlay)] hover:border-[color:var(--accent)] hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-video bg-[color:var(--accent-soft)]">
                {course.thumbnail ? (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 app-accent-text" />
                  </div>
                )}
                <div className="absolute inset-0 bg-[color:var(--accent)]/5 transition-all duration-300 group-hover:bg-[color:var(--accent)]/15" />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold app-text-color">
                  {course.title}
                </h3>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
