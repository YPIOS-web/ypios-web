import type { MetadataRoute } from "next";
import { detailedProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ypios.fr";

  const routes = [
    ["/", 1, "2026-09-08"],
    ["/services/climatisation", 0.9, "2026-09-11"],
    ["/services/ventilation", 0.9, "2026-09-11"],
    ["/services/plomberie", 0.9, "2026-09-11"],
    ["/services/gtc-gtb", 0.9, "2026-09-11"],
    ["/services/maintenance-cvc", 0.9, "2026-09-12"],
    ["/realisations", 0.8, "2026-09-11"],
    ["/contact", 0.8, "2026-09-08"],
    ["/mentions-legales", 0.3, "2026-09-08"],
    ["/politique-confidentialite", 0.3, "2026-09-08"],
    ["/cookies", 0.3, "2026-09-08"],
  ] as const;

  const staticRoutes: MetadataRoute.Sitemap = routes.map(([path, priority, lastModified]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(`${lastModified}T00:00:00.000Z`),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = detailedProjects.map((project) => ({
    url: `${baseUrl}/realisations/${project.slug}`,
    lastModified: new Date(`${project.details.lastModified}T00:00:00.000Z`),
    changeFrequency: "yearly",
    priority: 0.7,
    images: project.images.map((image) => `${baseUrl}${image.src}`),
  }));

  return [...staticRoutes, ...projectRoutes];
}
