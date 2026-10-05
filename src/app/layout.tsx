import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { BRAND, PLACEHOLDER_NOTICE } from "@/lib/config";
import { DevBanner } from "@/components/layout/DevBanner";
import { CustomCursor } from "@/components/effects/CustomCursor";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-metal="gold"
      className={`${bodoniModa.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body style={{ ["--banner-offset" as string]: "24px" }}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <DevBanner message={PLACEHOLDER_NOTICE} />
        <div id="main-content">
          {children}
        </div>
        <CustomCursor />
      </body>
    </html>
  );
}
