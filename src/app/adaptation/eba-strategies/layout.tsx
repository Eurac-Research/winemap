import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "EbA Strategies Catalogue",
  description:
    "Explore ecosystem-based adaptation strategies for resilient vineyard landscapes, including benefits, challenges, and practical factsheets.",
  path: "/adaptation/eba-strategies",
});

export default function EbaStrategiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
