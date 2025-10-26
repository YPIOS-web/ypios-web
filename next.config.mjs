/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: {
        default: "10mb",            // au lieu de 1mb
        "app/contact/page": "10mb", // explicite pour la page
      },
    },
  },
};

export default nextConfig;