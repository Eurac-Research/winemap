import { BookOpen, Leaf, Scale, ThermometerSun } from "lucide-react";
import { ReactNode } from "react";

type MainArea = {
  id: string;
  title: ReactNode;
  titleText: string;
  showOnLanding: boolean;
  description: string;
  icon: ReactNode;
  mainHref: string;
  categories: {
    label: string;
    href: string;
    description?: string;
  }[];
  categoriesClassName?: string;
};

export const mainAreas: MainArea[] = [
  {
    id: "climate-environment",
    titleText: "Winemap Climate",
    showOnLanding: true,
    title: (
      <>
        Winemap<br />Climate
      </>
    ),
    description:
      "Explore climate data, vulnerability assessments, and environmental indicators for wine regions across Europe.",
    icon: <ThermometerSun className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />,
    mainHref: "/#climate-environment",
    categories: [
      { label: "Climate Indicators →", href: "/climate-environment/climate", description: "Learn more about bioclimatic indicators, their use in the field of viticulture and investigate their historical and future spatial distribution over Europe"},
      { label: "Vulnerability & Risks →", href: "/climate-environment/vulnerability", description: "Discover how vulnerable European wine regions are to climate change and investiate the central dimension that shape their vulnerability" },
      { label: "Ecosystem Services →", href: "/climate-environment/ecosystem-services", description: "Dive deeper into the multiple regulating, provisioning, and cultural benefits that viticulture provides for landscapes and communities." },
    ],
  },
  {
    id: "adaptation",
    titleText: "Winemap Adaptation",
    showOnLanding: true,
    title: (
      <>
        Winemap<br />Adaptation
      </>
    ),
    description:
      "Discover ecosystem-based adaptation strategies and pilot implementation experiences for viticulture.",
    icon: <Leaf className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />,
    mainHref: "/#adaptation",
    categoriesClassName: "space-y-1",
    categories: [
      { label: "EbA Strategies Catalogue →", href: "/adaptation/eba-strategies", description: "The Catalogue of EbA strategies brings together approaches that harness biodiversity and ecosystem functions to mitigate risks." },
      { label: "Pilot Experiences →", href: "/adaptation/pilot-experiences", description: "Through short films from pilot regions, you can discover how winegrowers, researchers and communities are working with their landscapes to address climate challenges while preserving local traditions." },
      { label: "Spatial Analogues →", href: "/adaptation", description: "This section includes an interactive tool to select and visualize spatial analogues for individual European wine regions." },
    ],
  },
  {
    id: "governance",
    titleText: "Winemap Governance",
    showOnLanding: true,
    title: (
      <>
        Winemap<br />Governance
      </>
    ),
    description:
      "Navigate legal frameworks, regulations, and geographic indications for wine production in Europe.",
    icon: <Scale className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />,
    mainHref: "/#governance",
    categoriesClassName: "space-y-1",
    categories: [
      { label: "EU Policy →", href: "/legal/eu-policy", description: "Discover the legal system behind high-quality European wine regions and how these regulations influence their climate resilience." },
      { label: "Participatory Approaches →", href: "/legal/participatory-approaches", description: "Get information about participatory approaches in scientific research and how they can be used to generate innovative solutions for the future sustainability of viticulture." },
      { label: "Courses →", href: "/legal/participatory-approaches", description: "Improve your knowledge on viticulture, climate change and ecosystem-based adaptation in a series of interactive courses." },
    ],
  },
  {
    id: "about",
    titleText: "About",
    showOnLanding: false,
    title: "About Winemap",
    description: "Learn about the data and the research projects behind Winemap.",
    icon: <BookOpen className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />,
    mainHref: "/about",
    categories: [
      {
        label: "Research Projects →",
        href: "/about#projects",
        description: "Learn more about the research projects behind Winemap.",
      },
      {
        label: "The Institute →",
        href: "/about#institute",
        description: "Discover the scientific institute behind Winemap.",
      },
      {
        label: "The Team →",
        href: "/team",
        description: "Get to know the people behind the Winemap project.",
      },
      {
        label: "Scientific Literature →",
        href: "/literature",
        description: "Explore the publications behind the Winemap project.",
      },
    ],
  },
];
