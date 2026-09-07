import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "PDO Atlas",
  description:
    "Explore European Protected Designation of Origin wine regions and their geographic, production, and vulnerability data.",
  path: "/map-applications/pdo-atlas",
});

export default function PdoAtlasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
