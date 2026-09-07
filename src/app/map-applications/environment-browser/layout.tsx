import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Environment Browser",
  description:
    "Explore climate and environmental indicators for European vineyard landscapes with WINEMAP's interactive Environment Browser.",
  path: "/map-applications/environment-browser",
});

export default function EnvironmentBrowserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
