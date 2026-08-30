import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://www.ypios.fr";
const RAW_GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_ID = RAW_GA_ID && /^G-[A-Z0-9]+$/i.test(RAW_GA_ID) ? RAW_GA_ID : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "YPIOS | Climatisation, ventilation, plomberie & GTB",
    template: "%s | YPIOS",
  },
  description:
    "YPIOS accompagne les bâtiments tertiaires, industriels et résidentiels en climatisation, ventilation, plomberie et GTB : études, travaux, maintenance et dépannage en Île-de-France.",
  applicationName: "YPIOS",
  alternates: { canonical: "/" },
  authors: [{ name: "YPIOS", url: SITE_URL }],
  creator: "YPIOS",
  publisher: "YPIOS",
  category: "CVC, plomberie et gestion technique du bâtiment",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "YPIOS",
    title: "YPIOS | Climatisation, ventilation, plomberie & GTB",
    description:
      "Études, travaux, maintenance et dépannage CVC, plomberie et GTB en Île-de-France.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "YPIOS | Climatisation, ventilation, plomberie & GTB",
    description: "Études, travaux, maintenance et dépannage CVC, plomberie et GTB en Île-de-France.",
  },
  icons: {
    icon: [
      { url: "/favicon-64.png?v=3.0.3", sizes: "64x64", type: "image/png" },
      { url: "/favicon-32.png?v=3.0.3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png?v=3.0.3", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png?v=3.0.3", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0D1B3D",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <a
          href="#contenu"
          className="sr-only z-[100] rounded bg-white px-4 py-2 text-[#0D1B3D] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <JsonLd />
        <CookieBanner />
        <AnalyticsConsent gaId={GA_ID} />
      </body>
    </html>
  );
}
