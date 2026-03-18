"use client";

import { useState } from "react";
import Link from "next/link";
import { NotebookPen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  url: string;
}


const courses: Course[] = [
  {
    id: "1",
    title: "Green Infrastructure",
    url: "https://e-learning.eurac.edu/en/green-infrastructure/#/",
  },
  {
    id: "2",
    title: "Biodiversität Südtirol",
    url: "https://e-learning.eurac.edu/de/biodiversitaet/#/",
  },
  {
    id: "3",
    title: "Green Infrastructure in the Alps",
    url: "https://prezi.com/view/9IeDAfcov1EuoZk9yYhe/",
  },
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-32 max-w-6xl">
        {/* Page Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-16">
          <h1 className="text-4xl font-bold mb-8">Courses</h1>

          <p className="text-lg leading-relaxed mb-12">
            How do adaptation measures look in practice? This section gathers stories from vineyards
            where new and traditional approaches are being tested side by side. Through short films
            from pilot regions of the Interreg Alpine Space project RESPOnD, you can discover how
            winegrowers, researchers and communities are working with their landscapes to address
            climate challenges while preserving local traditions.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-8">Video case studies</h2>
        </article>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {courses.map((course) => (
            <Link href={course.url}>
              <div
                key={course.id}
                className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
              {/* Video Thumbnail */}
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <NotebookPen />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-all duration-300" />
                </div>

                {/* Caption */}
                <div className="p-4">
                  {/* <div className="text-xs text-white/40 mb-1">Box 2.{index + 1}</div> */}
                  <h3 className="font-semibold text-white mb-1 text-sm">{course.title}</h3>
                </div>
              </div>
          </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
