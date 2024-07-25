import "../styles/globals.scss";
import "../styles/global.css";
import { Suspense } from "react";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

import CookieConsent from "./components/CookieConsent";

export const metadata: Metadata = {
  title: "Winemap Europe by Eurac Research",
  description:
    "The Winemap provides a comprehensive overview of the 1,174 European wine regions which fall under the Protected Designation of Origin (PDO) label.",
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
        domain="winemap.eurac.edu"
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
