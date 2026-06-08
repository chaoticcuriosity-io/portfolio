import "./globals.css";

export const metadata = {
  title: "Don Balanzat — AI Enablement Leader & Builder",
  description:
    "I lead enterprise AI enablement and still ship the tools myself — agents, internal tooling, ML pipelines, and immersive systems. Currently AI Enablement Lead at Zillow.",
  metadataBase: new URL("https://donbalanzat.com"),
  openGraph: {
    title: "Don Balanzat — AI Enablement Leader & Builder",
    description:
      "Enterprise AI enablement, built by someone who actually builds. AI Enablement Lead at Zillow.",
    type: "website",
  },
  icons: { icon: "/images/cc-logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
