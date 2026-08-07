export type Course = {
  id: string;
  title: string;
  url?: string;
  thumbnail?: string;
};

export const courses: Course[] = [
  {
    id: "green-infrastructure",
    title: "Green Infrastructure",
    url: "https://e-learning.eurac.edu/en/green-infrastructure/#/",
    thumbnail: "/course-thumbnails/green-infrastructure.png",
  },
  {
    id: "biodiversitaet-suedtirol",
    title: "Biodiversität Südtirol",
    url: "https://e-learning.eurac.edu/de/biodiversitaet/#/",
    thumbnail: "/course-thumbnails/biodiversitaet-suedtirol.png",
  },
  {
    id: "ecosystem-based-adaptation-in-viticulture",
    title: "Ecosystem based adaptation in Viticulture",
  },
  {
    id: "vitiforestry",
    title: "Vitiforestry",
  },
  {
    id: "nature-based-solutions-in-vineyards",
    title: "Nature based Solutions in Vineyards",
  },
];
