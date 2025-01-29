import "../styles/globals.scss";
import "../styles/global.css";
import { Suspense } from "react";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

import CookieConsent from "./components/CookieConsent";

export const metadata: Metadata = {
  title: "Winemap Climate by Eurac Research",
  description:
    "The Winemap Climate presents an overview of the climate change vulnerability of European Protected Designation of Origin (PDO) wine regions and is based on the integrated vulnerability index that was developed in the study 'Climate resilience of European wine regions'. ",
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
        domain="winemap.eurac.edu,www.eurac.edu"
        trackLocalhost={false}
        enabled={true}
      />
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <CookieConsent />
        </Suspense>
      </body>
    </html>
  );
}
