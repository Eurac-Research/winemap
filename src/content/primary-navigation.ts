import {
  Leaf,
  Map,
  Scale,
  ThermometerSun,
  type LucideIcon,
} from "lucide-react";

import type { StaticImageData } from "next/image";

type PrimaryNavigationImage = {
  src: string | StaticImageData;
  alt: string;
  position?: string;
  zoom?: number
};

export type PrimaryNavigationSection = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  accent: string;
  href: string;
  description: string;
  summary: string;
  image: PrimaryNavigationImage;
};

export const primaryNavigationSections: PrimaryNavigationSection[] = [
  {
    id: "adaptation",
    label: "WINEMAP Adaptation",
    title: "WINEMAP",
    subtitle: "Adaptation",
    Icon: Leaf,
    accent: "var(--section-adaptation-accent)",
    href: "/adaptation",
    description:
      "Discover ecosystem-based adaptation approaches and pilot implementation experiences that connect climate resilience with everyday vineyard management.",
    summary:
      "A practice-oriented entry point for vineyard managers, advisors, researchers, and local actors who want to understand how wine regions can respond to climate stress. This section brings together ecosystem-based adaptation strategies, pilot experiences, and implementation examples so users can move from general adaptation needs to concrete measures in the vineyard and surrounding landscape.",
    image: {
      src: "/images/vineyards/cinque_terre.JPG",
      alt: "Vineyards on hill",
      position: "50% 80%"
    }
  },
  {
    id: "environment",
    label: "WINEMAP Environment",
    title: "WINEMAP",
    subtitle: "Environment",
    Icon: ThermometerSun,
    accent: "var(--section-environment-accent)",
    href: "/environment",
    description:
      "Explore climate data, vulnerability assessments, and environmental indicators for wine regions across Europe.",
    summary:
      "The scientific and spatial evidence base of WINEMAP. This section is for users who need to explore climate indicators, environmental conditions, and vulnerability patterns across European wine regions. It helps researchers, planners, educators, and practitioners understand where pressures are emerging, how they differ by region, and which environmental factors matter for adaptation planning.",
    image: {
      src: "/images/vineyards/burgenland.jpg",
      alt: "Vineyard at sunset",
      position: "50% 60%"
    }
  },
  {
    id: "governance",
    label: "WINEMAP Governance",
    title: "WINEMAP",
    subtitle: "Governance",
    Icon: Scale,
    accent: "var(--section-governance-accent)",
    href: "/governance",
    description:
      "Navigate policy frameworks, participatory approaches, and educational resources to learn how viticulture can respond to environmental and social change.",
    summary:
      "A guide to the policy, institutional, and participatory side of climate adaptation in viticulture. This section is useful for decision-makers, public administrations, regional organizations, educators, and project teams who need to understand legal frameworks, protected designations, stakeholder processes, and learning resources that shape how wine regions can act.",
    image: {
      src: "/images/vineyard_sun.jpg",
      alt: "Vineyard at sunset",
      position: "50% 30%",
    },
  },
  {
    id: "maps",
    label: "WINEMAP Explorer",
    title: "WINEMAP",
    subtitle: "Explorer",
    Icon: Map,
    accent: "var(--section-maps-accent)",
    href: "/map-applications/environment-browser",
    description:
      "Analyze the spatial data behind WINEMAP, including climatic, topographic and enviromental data, in our interactive map tool.",
    summary:
      "A dedicated collection of interactive tools for exploring WINEMAP data directly on maps. This area is for users who want to browse spatial layers, compare regions, inspect PDO information, investigate vulnerability, or work with specific geospatial applications without first reading through the thematic sections. It is the fastest route from a question about place to an interactive map view.",
    image: {
      src: "/images/map_applications/environment_browser.png",
      alt: "Map of WINEMAP Explorer",
    },
  },
];

export type SecondaryNavigationSection = {
  label: string;
  href: string;
  category: string;
  footerLabel?: string;
};

export const secondaryNavigationSections: SecondaryNavigationSection[] = [
  { label: "The Project", href: "/about", category: "About" },
  { label: "The Team", href: "/about/team", category: "About" },
  { label: "FAQ", href: "/#faq", category: 'About' },
  {
    label: "Scientific Literature",
    href: "/literature",
    category: "Resources",
  },
  { label: "Glossary", href: "/about/glossary", category: "Resources" },
  {
    label: "Imprint",
    href: "/imprint-privacy",
    category: "Legal",
    footerLabel: "Imprint / Privacy Policy",
  },
];

export const secondaryNavigationGroups = Array.from(
  secondaryNavigationSections
    .reduce((groups, item) => {
      const group = groups.get(item.category);

      if (group) {
        group.items.push(item);
      } else {
        groups.set(item.category, {
          category: item.category,
          items: [item],
        });
      }

      return groups;
    }, new globalThis.Map<string, { category: string; items: SecondaryNavigationSection[] }>())
    .values(),
);
