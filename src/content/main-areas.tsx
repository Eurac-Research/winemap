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
    titleText: "WINEMAP Environment",
    showOnLanding: true,
    title: (
      <>
        WINEMAP
        <br />
        <em>Environment</em>
      </>
    ),
    description:
      "Explore climate data, vulnerability assessments, and environmental indicators for wine regions across Europe.",
    icon: (
      <ThermometerSun
        className="w-12 h-12 app-accent-text"
        aria-hidden="true"
      />
    ),
    mainHref: "/climate-environment",
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
    ],
  },
  {
    id: "adaptation",
    titleText: "WINEMAP Adaptation",
    showOnLanding: true,
    title: (
      <>
        WINEMAP
        <br />
        <em>Adaptation</em>
      </>
    ),
    description:
      "Discover ecosystem-based adaptation strategies and pilot implementation experiences for viticulture.",
    icon: <Leaf className="w-12 h-12 app-accent-text" aria-hidden="true" />,
    mainHref: "/adaptation",
    categoriesClassName: "space-y-1",
    categories: [
      {
        label: "EbA Strategies Repository ->",
        href: "/adaptation/eba-strategies",
        description:
          "A collection of EbA strategies that brings together approaches that harness biodiversity and ecosystem functions to mitigate risks.",
      },
      {
        label: "Pilot Experiences ->",
        href: "/adaptation/pilot-experiences",
        description:
          "Through short films from pilot regions, you can discover how winegrowers, researchers and communities are working with their landscapes to address climate challenges while preserving local traditions.",
      },
      {
        label: "Spatial Analogues ->",
        href: "",
        description:
          "This section includes an interactive tool to select and visualize spatial analogues for individual European wine regions.",
      },
    ],
  },
  {
    id: "governance",
    titleText: "WINEMAP Governance",
    showOnLanding: true,
    title: (
      <>
        WINEMAP
        <br />
        <em>Governance</em>
      </>
    ),
    description:
      "Navigate legal frameworks, regulations, and geographic indications for wine production in Europe.",
    icon: <Scale className="w-12 h-12 app-accent-text" aria-hidden="true" />,
    mainHref: "/governance",
    categoriesClassName: "space-y-1",
    categories: [
      {
        label: "European PDO Atlas ->",
        href: "/map-applications/pdo-atlas",
        description:
          "Discover detailed geospatial and regulatory information about European Wine PDO regions in the form of an interactive map.",
      },
      {
        label: "Participatory Approaches",
        href: "/governance/participatory-approaches",
        description:
          "Get information about participatory approaches in scientific research and how they can be used to generate innovative solutions for the future sustainability of viticulture.",
      },
      {
        label: "Courses",
        href: "/governance/courses",
        description:
          "Improve your knowledge on viticulture, climate change and ecosystem-based adaptation in a series of interactive courses.",
      },
    ],
  },
  {
    id: "about",
    titleText: "About",
    showOnLanding: false,
    title: "About WINEMAP",
    description:
      "Learn about the data and the research projects behind WINEMAP.",
    icon: <BookOpen className="w-12 h-12 app-accent-text" aria-hidden="true" />,
    mainHref: "/about",
    categories: [
      {
        label: "About the WINEMAP",
        href: "/about",
        description:
          "Learn more about the research projects and the scientific institute behind the WINEMAP.",
      },
      {
        label: "Our Team",
        href: "/about/team",
        description: "Learn more about the team behind the WINEMAP.",
      },
      {
        label: "Our Institute",
        href: "/about#institute",
        description:
          "Learn more about the scientific institute behind the WINEMAP.",
      },
    ],
  },
  {
    id: "resources",
    titleText: "Resources",
    showOnLanding: false,
    title: "Resources",
    description:
      "Look at scientific articles related to the WINEMAP and the glossary.",
    icon: <BookOpen className="w-12 h-12 app-accent-text" aria-hidden="true" />,
    mainHref: "/",
    categories: [
      {
        label: "Courses",
        href: "/governance/courses",
        description:
          "Access learning material on viticulture, climate change, governance, and ecosystem-based adaptation.",
      },
      {
        label: "Scientific Literature",
        href: "/literature",
        description: "Explore the publications behind the WINEMAP.",
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
