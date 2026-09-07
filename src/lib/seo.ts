import type { Metadata } from "next";

export const siteUrl = new URL("https://winemap.eurac.edu");

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

/**
 * Creates consistent, crawlable metadata for public WINEMAP pages.
 * Keep page content server-rendered where possible; this helper also works
 * from a server route layout when a page itself is a Client Component.
 */
export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: "WINEMAP",
      images: ["/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}
