import "../styles/globals.scss";
import "../styles/global.css";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

import CookieConsent from "./components/CookieConsent";

export const metadata: Metadata = {
  title: "Winemap Europe by Eurac Research",
  description:
    "The Winemap provides a comprehensive overview of the 1,174 European wine regions which fall under the Protected Designation of Origin (PDO) label.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <PlausibleProvider
        domain="winemap.eurac.edu"
        trackLocalhost={false}
        enabled={true}
      />
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
