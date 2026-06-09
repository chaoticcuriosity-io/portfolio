import "./globals.css";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";

export const metadata = {
  title: "Don Balanzat — Physicist · Engineer · Builder",
  description:
    "A decade making hard technology usable — across physics, space, immersive reality, robotics, and AI. AI Enablement Lead at Zillow; founder of Chaotic Curiosity.",
  metadataBase: new URL("https://donbalanzat.com"),
  openGraph: {
    title: "Don Balanzat — Physicist · Engineer · Builder",
    description: "Physics · Space · XR · Robotics · AI. AI Enablement Lead at Zillow.",
    type: "website",
    images: ["/media/space/space__don-blue-moon.jpg"],
  },
  icons: { icon: "/media/cc-logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="cosmos" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
