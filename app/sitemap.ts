import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ypios.fr";

  const routes = [
    ["/", 1, "2026-09-08"],
    ["/services/climatisation", 0.9, "2026-09-11"],
    ["/services/ventilation", 0.9, "2026-09-11"],
    ["/services/plomberie", 0.9, "2026-09-11"],
    ["/services/gtc-gtb", 0.9, "2026-09-11"],
    ["/realisations", 0.8, "2026-09-11"],
    ["/contact", 0.8, "2026-09-08"],
    ["/mentions-legales", 0.3, "2026-09-08"],
    ["/politique-confidentialite", 0.3, "2026-09-08"],
    ["/cookies", 0.3, "2026-09-08"],
  ] as const;

  return routes.map(([path, priority, lastModified]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(`${lastModified}T00:00:00.000Z`),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority,
  }));
}
