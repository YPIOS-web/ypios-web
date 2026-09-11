import type { MetadataRoute } from "next";

const LAST_CONTENT_UPDATE = new Date("2026-09-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ypios.fr";

  const routes = [
    ["/", 1],
    ["/services/climatisation", 0.9],
    ["/services/ventilation", 0.9],
    ["/services/plomberie", 0.9],
    ["/services/gtc-gtb", 0.9],
    ["/realisations", 0.8],
    ["/contact", 0.8],
    ["/mentions-legales", 0.3],
    ["/politique-confidentialite", 0.3],
    ["/cookies", 0.3],
  ] as const;

  return routes.map(([path, priority]) => ({
    url: `${baseUrl}${path}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority,
  }));
}
