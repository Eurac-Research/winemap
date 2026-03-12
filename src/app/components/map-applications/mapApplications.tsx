import { Map as MapIcon } from "lucide-react";
import { ReactNode } from "react";

type MapApplication = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export const mapApplications: MapApplication[] = [
  {
    title: "European PDO Atlas",
    description:
      "Placeholder description for a map application. Replace with real content.",
    href: "/map-applications/pdo-explorer",
    icon: <MapIcon className="w-5 h-5 text-white" aria-hidden="true" />,
  },
  {
    title: "Climate Explorer",
    description:
      "Placeholder description for a map application. Replace with real content.",
    href: "/",
    icon: <MapIcon className="w-5 h-5 text-white" aria-hidden="true" />,
  },
  {
    title: "Vulnerability Explorer",
    description:
      "Placeholder description for a map application. Replace with real content.",
    href: "/adaptation",
    icon: <MapIcon className="w-5 h-5 text-white" aria-hidden="true" />,
  },
  {
    title: "Spatial Analogues Tool",
    description:
      "Placeholder description for a map application. Replace with real content.",
    href: "/",
    icon: <MapIcon className="w-5 h-5 text-white" aria-hidden="true" />,
  },
];
