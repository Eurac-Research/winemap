import { ReactNode } from "react";
import { BookOpen, Leaf, Scale, ThermometerSun } from "lucide-react";

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
    description: string;
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
        Winemap
        <br />
        Climate
      </>
    ),
    description:
      "Explore climate data, vulnerability assessments, and environmental indicators for wine regions across Europe.",
    icon: (
      <ThermometerSun
        className="w-12 h-12 text-[color:var(--accent-strong)]"
        aria-hidden="true"
      />
    ),
    mainHref: "/#climate-environment",
    categories: [
      {
        label: "Environment Browser ->",
        href: "/map-applications/environment-browser",
        description:
          "Explore climate, topographic, ecosystem service, and ecosystem condition layers in one map application.",
      },
      {
        label: "Vulnerability Explorer ->",
        href: "/map-applications/vulnerability-explorer",
        description:
          "Discover how vulnerable European wine regions are to climate change and investigate the dimensions that shape their vulnerability.",
      },
      {
        label: "Indicator Definitions ->",
        href: "/about/definitions",
        description:
          "Browse the definitions, methods, data sources, and references for all indicators used in the map applications.",
      },
    ],
  },
  {
    id: "adaptation",
    titleText: "Winemap Adaptation",
    showOnLanding: true,
    title: (
      <>
        Winemap
        <br />
        Adaptation
      </>
    ),
    description:
      "Discover ecosystem-based adaptation strategies and pilot implementation experiences for viticulture.",
    icon: (
      <Leaf
        className="w-12 h-12 text-[color:var(--accent-strong)]"
        aria-hidden="true"
      />
    ),
    mainHref: "/#adaptation",
    categoriesClassName: "space-y-1",
    categories: [
      {
        label: "EbA Strategies Catalogue →",
        href: "/adaptation/eba-strategies",
        description:
          "The Catalogue of EbA strategies brings together approaches that harness biodiversity and ecosystem functions to mitigate risks.",
      },
      {
        label: "Pilot Experiences →",
        href: "/adaptation/pilot-experiences",
        description:
          "Through short films from pilot regions, you can discover how winegrowers, researchers and communities are working with their landscapes to address climate challenges while preserving local traditions.",
      },
      {
        label: "Spatial Analogues →",
        href: "/adaptation",
        description:
          "This section includes an interactive tool to select and visualize spatial analogues for individual European wine regions.",
      },
    ],
  },
  {
    id: "governance",
    titleText: "Winemap Governance",
    showOnLanding: true,
    title: (
      <>
        Winemap
        <br />
        Governance
      </>
    ),
    description:
      "Navigate legal frameworks, regulations, and geographic indications for wine production in Europe.",
    icon: (
      <Scale
        className="w-12 h-12 text-[color:var(--accent-strong)]"
        aria-hidden="true"
      />
    ),
    mainHref: "/#governance",
    categoriesClassName: "space-y-1",
    categories: [
      {
        label: "EU Policy",
        href: "/legal/eu-policy",
        description:
          "Discover the legal system behind high-quality European wine regions and how these regulations influence their climate resilience.",
      },
      {
        label: "Participatory Approaches",
        href: "/legal/participatory-approaches",
        description:
          "Get information about participatory approaches in scientific research and how they can be used to generate innovative solutions for the future sustainability of viticulture.",
      },
      {
        label: "Courses",
        href: "/legal/courses",
        description:
          "Improve your knowledge on viticulture, climate change and ecosystem-based adaptation in a series of interactive courses.",
      },
    ],
  },
  {
    id: "about",
    titleText: "About",
    showOnLanding: false,
    title: "About Winemap",
    description:
      "Learn about the data and the research projects behind Winemap.",
    icon: (
      <BookOpen
        className="w-12 h-12 text-[color:var(--accent-strong)]"
        aria-hidden="true"
      />
    ),
    mainHref: "/about",
    categories: [
      {
        label: "Research Projects",
        href: "/about#projects",
        description:
          "Learn more about the research projects behind the Winemap.",
      },
      {
        label: "The Institute",
        href: "/about#institute",
        description: "Discover the scientific institute behind the Winemap.",
      },
      {
        label: "The Team",
        href: "/team",
        description: "Get to know the people behind the Winemap.",
      },
      {
        label: "Scientific Literature",
        href: "/literature",
        description: "Explore the publications behind the Winemap.",
      },
      {
        label: "Indicator Definitions",
        href: "/about/definitions",
        description:
          "Browse the glossary of indicator definitions, methods, and references.",
      },
      {
        label: "Glossary",
        href: "/about/glossary",
        description:
          "Look up scientific and technical terms used throughout the application.",
      },
    ],
  },
];
