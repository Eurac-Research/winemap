import { courses } from "@/content/courses";
import { GraduationCap } from "lucide-react";

import CourseCard from "@/components/CourseCard";

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
            <CourseCard
              key={course.id}
              course={course}
              imageSizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ))}
        </section>
      </div>
    </div>
  );
}
