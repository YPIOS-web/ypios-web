import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YPIOS",
    short_name: "YPIOS",
    description: "Climatisation, ventilation, plomberie & GTB en Île-de-France.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0D1B3D",
    lang: "fr",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  };
}
