import "../styles/globals.scss";
import PlausibleProvider from "next-plausible";

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

      <body>{children}</body>
    </html>
  );
}
