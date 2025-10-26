// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YPIOS Énergie",
    short_name: "YPIOS",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "maskable any" },
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-16.png", sizes: "16x16", type: "image/png" }
    ],
  };
}