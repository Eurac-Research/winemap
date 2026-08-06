import Image from "next/image";
import type { Course } from "@/content/courses";
import { GraduationCap } from "lucide-react";

type CourseCardProps = {
  course: Course;
  imageSizes: string;
};

export default function CourseCard({ course, imageSizes }: CourseCardProps) {
  const isAvailable = Boolean(course.url);
  const className = `group relative block overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-overlay)] transition-all duration-300 ${
    isAvailable
      ? "hover:border-[color:var(--accent)] hover:shadow-[var(--shadow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
      : "cursor-default"
  }`;

  const content = (
    <>
      <div className="relative aspect-video bg-[color:var(--accent-soft)]">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
            sizes={imageSizes}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="h-10 w-10 app-accent-text" />
          </div>
        )}
        <div
          className={`absolute inset-0 bg-[color:var(--accent)]/5 transition-all duration-300 ${
            isAvailable ? "group-hover:bg-[color:var(--accent)]/15" : ""
          }`}
        />
      </div>

      <div className="flex min-h-24 flex-col p-4">
        <h3 className="text-sm font-semibold app-text-color">{course.title}</h3>
        {!isAvailable ? (
          <span className="mt-auto pt-3 text-xs font-semibold uppercase tracking-[0.12em] app-accent-text">
            Coming soon
          </span>
        ) : null}
      </div>
    </>
  );

  return isAvailable ? (
    <a
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  ) : (
    <article className={className} aria-label={`${course.title}, coming soon`}>
      {content}
    </article>
  );
}
