import { Leaf, Scale, ThermometerSun } from "lucide-react";
import { ReactNode } from "react";

type MainArea = {
  id: string;
  title: ReactNode;
  titleText: string;
  description: string;
  icon: ReactNode;
  mainHref: string;
  categories: {
    label: string;
    href: string;
  }[];
  categoriesClassName?: string;
};

export const mainAreas: MainArea[] = [
  {
    id: "climate-environment",
    titleText: "Winemap Climate",
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
      { label: "Climate Indicators →", href: "/climate-environment/climate" },
      { label: "Vulnerability & Risks →", href: "/climate-environment/vulnerability" },
      { label: "Ecosystem Services →", href: "/climate-environment/ecosystem-services" },
    ],
  },
  {
    id: "adaptation",
    titleText: "Winemap Adaptation",
    title: (
      <>
        Winemap<br />Adaptation
      </>
    ),
    description:
      "Discover ecosystem-based adaptation strategies and pilot implementation experiences in wine regions.",
    icon: <Leaf className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />,
    mainHref: "/#adaptation",
    categoriesClassName: "space-y-1",
    categories: [
      { label: "EbA Strategies Catalogue →", href: "/adaptation/eba-strategies" },
      { label: "Pilot Experiences →", href: "/adaptation/pilot-experiences" },
      { label: "Spatial Analogues →", href: "/adaptation" },
    ],
  },
  {
    id: "governance",
    titleText: "Winemap Governance",
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
      { label: "EU Policy →", href: "/legal/eu-policy" },
      { label: "Participatory Approaches →", href: "/legal/participatory-approaches" },
      { label: "Courses →", href: "/legal/participatory-approaches" },
    ],
  },
];
