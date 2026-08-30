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
      { src: "/icon.png?v=3.0.3", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.png?v=3.0.3", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png?v=3.0.3", sizes: "180x180", type: "image/png" },
      { src: "/favicon-64.png?v=3.0.3", sizes: "64x64", type: "image/png" },
      { src: "/favicon-32.png?v=3.0.3", sizes: "32x32", type: "image/png" },
      { src: "/favicon-16.png?v=3.0.3", sizes: "16x16", type: "image/png" },
    ],
  };
}
