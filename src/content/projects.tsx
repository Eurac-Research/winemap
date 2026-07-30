import { ReactNode } from "react";

import RespondLogo from "@/components/ui/RespondLogo";

export type Project = {
  name: string;
  slug: string;
  link?: string;
  logo?: ReactNode;
  /** A path relative to the `public` directory, e.g. `/images/projects/agata.png`. */
  logoImage?: string;
  description: string;
};

export const projects: Project[] = [
  {
    name: "RESPoND",
    slug: "respond",
    link: "https://www.alpine-space.eu/project/respond/",
    logo: <RespondLogo width={200} />,
    description:
      "The RESPOnD project aims to co-design ecosystem-based adaptation solutions with wine practitioners and decision-makers to increase the climate resilience of alpine wine orchards",
  },
  {
    name: "Agata",
    slug: "agata",
    description:
      "The AGATA (Accessible ecoloGicAl daTA for resilient Viticulture) project aims to develop spatially explicit indicators that describe key ecological conditions and ecosystem services provided by vineyard landscapes across the Alpine region, with the goal of strengthening their ecological resilience and long-term sustainability.",
  },
  {
    name: "KULTIVAS",
    slug: "kultivas",
    link: "https://kultivas.eu/",
    logoImage: "/logos/kultivas_logo.png",
    description:
      "KULTIVAS is a modern big-data application that uses high resolution climatic and remote sensing data combined with machine learning to enable data-based decision making in agriculture and forestry.",
  },
  {
    name: "REBECKA",
    slug: "rebecka",
    link: "https://www.eurac.edu/en/projects/rebecka",
    logoImage: "/logos/rebecka_logo.png",
    description:
      "The REBECKA project aims to develop a land-suitability model for viticulture based on historical harvest data, grape quality assessments and climatic models.",
  },
  {
    name: "ClimSmart",
    slug: "clim-smart",
    link: "https://fusiongrant.info/de/fusion-grant/archiv/climsmart-climate-smart-agriculture-entscheidungshilfen-fuer-die-suedtiroler-landwirtschaft-zur-anpassung-an-den-klimawandel",
    description:
      "The ClimSmart Project combines high-resolution climate data and modern analytical methods to identify targeted adaptation strategies for mountain agriculture.",
  },
];
