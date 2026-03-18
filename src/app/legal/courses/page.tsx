"use client";

import Link from "next/link";
import { NotebookPen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Green Infrastructure",
    url: "https://e-learning.eurac.edu/en/green-infrastructure/#/",
    thumbnail: "/course-thumbnails/green-infrastructure.png",
  },
  {
    id: "2",
    title: "Biodiversität Südtirol",
    url: "https://e-learning.eurac.edu/de/biodiversitaet/#/",
    thumbnail: "/course-thumbnails/biodiversitaet-suedtirol.png",
  },
  {
    id: "3",
    title: "Green Infrastructure in the Alps",
    url: "https://prezi.com/view/9IeDAfcov1EuoZk9yYhe/",
    thumbnail: "/course-thumbnails/green-infrastructure-alps.png",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-32 max-w-6xl">
        {/* Page Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-16">
          <h1 className="text-4xl font-bold mb-8">Courses</h1>
        </article>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] transition-all duration-300 hover:border-white/30"
            >
              {/* Course Thumbnail */}
              <div className="relative aspect-video bg-black">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />) : ( 
                  <div className="absolute inset-0 flex items-center justify-center">
                    <NotebookPen className="h-10 w-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/35" />
              </div>

              {/* Caption */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white">{course.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
