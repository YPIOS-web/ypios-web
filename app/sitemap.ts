// app/sitemap.ts
import type { MetadataRoute } from "next";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths = [
    "/",                 // Accueil
    "/realisations",
    "/contact",
    "/mentions-legales",
    "/services/ventilation",
    "/services/plomberie",
    "/services/climatisation",
    "/services/gtc-gtb",
  ];

  return paths.map((p) => ({
    url: `${site}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}