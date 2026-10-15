export type Course = {
  id: string;
  title: string;
  languages?: string[];
  url?: string;
  thumbnail?: string;
};

export const courses: Course[] = [
  {
    id: "green-infrastructure",
    title: "Green Infrastructure",
    languages: ["EN"],
    url: "https://e-learning.eurac.edu/en/green-infrastructure/#/",
    thumbnail: "/course-thumbnails/green-infrastructure.png",
  },
  {
    id: "biodiversitaet-suedtirol",
    title: "Biodiversität Südtirol",
    languages: ["DE"],
    url: "https://e-learning.eurac.edu/de/biodiversitaet/#/",
    thumbnail: "/course-thumbnails/biodiversitaet-suedtirol.png",
  },
  {
    id: "nbs-alpine-viticulture",
    title: "Nature-based Solutions for Alpine Viticulture",
    languages: ["EN"],
    url: "https://e-learning.eurac.edu/en/nature-based-solutions-for-alpine-viticulture/",
    thumbnail: "/course-thumbnails/nbs-alpine-viticulture.png",
  },
  {
    id: "vitiforestry",
    title: "Vitiforestry",
  },
];
