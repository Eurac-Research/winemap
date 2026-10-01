import type { MetadataRoute } from "next";
import { ebaStrategies } from "@/content/eba/catalogue";

import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/about",
  "/about/definitions",
  "/about/glossary",
  "/about/team",
  "/adaptation",
  "/adaptation/eba-strategies",
  "/environment",
  "/governance",
  "/governance/courses",
  "/imprint-privacy",
  "/literature",
  "/map-applications/environment-browser",
  "/map-applications/pdo-atlas",
  "/map-applications/vulnerability-explorer",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...ebaStrategies.map((strategy) => ({
      url: new URL(
        `/adaptation/eba-strategies/${strategy.slug}`,
        siteUrl,
      ).toString(),
    })),
  ];
}
