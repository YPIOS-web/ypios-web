// app/layout.tsx
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "YPIOS Énergie",
    template: "%s — YPIOS Énergie",
  },
  description:
    "YPIOS Énergie — ventilation, climatisation, plomberie, GTC/GTB : études, installation, mise en service et maintenance.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

// Déplace themeColor ici pour supprimer l’avertissement Next
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-slate-50 antialiased">
        <TopNav /> {/* bandeau transparent partout */}
        {children}
      </body>
    </html>
  );
}