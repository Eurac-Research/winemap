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
