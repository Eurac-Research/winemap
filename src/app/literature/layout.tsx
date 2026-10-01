import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Scientific Publications",
  description:
    "Browse scientific publications and references on climate adaptation, environmental change, and resilient European vineyard landscapes.",
  path: "/literature",
});

export default function LiteratureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
