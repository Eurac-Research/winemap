import "../styles/globals.css";
import "../styles/global.css";

import { Suspense } from "react";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

import { siteUrl } from "@/lib/seo";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { ConditionalNavigation } from "@/components/ConditionalNavigation";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "WINEMAP | Eurac Research",
    template: "%s | WINEMAP",
  },
  description:
    "WINEMAP is an interactive platform for climate adaptation and resilient European vineyard landscapes by Eurac Research.",
  applicationName: "WINEMAP",
  openGraph: {
    type: "website",
    locale: "en",
    url: "/",
    siteName: "WINEMAP",
    title: "WINEMAP | Eurac Research",
    description:
      "An interactive platform for climate adaptation and resilient European vineyard landscapes.",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "OdAWzIPNr_gquodYDcLJpB5xjGfw0mJ1Mowe5Do9k6U",
  },
};
/**
 * RootLayout component that sets up the basic HTML structure for the application.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered RootLayout component.
 *
 * @component
 *
 * @example
 * return (
 *   <RootLayout>
 *     <YourComponent />
 *   </RootLayout>
 * );
 *
 * @remarks
 * This component includes the PlausibleProvider for analytics and uses Suspense for lazy loading.
 * It also includes a CookieConsent component wrapped in Suspense.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PlausibleProvider
        domain="winemap.eurac.edu"
        trackLocalhost={false}
        enabled={true}
      />
      <body className="">
        <ConditionalNavigation />
        <div className="">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <CookieConsent />
          </Suspense>
        </div>
        <ConditionalFooter />
      </body>
    </html>
  );
}
