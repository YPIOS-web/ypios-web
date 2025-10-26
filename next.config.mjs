// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // > 1MB sinon Next refuse la requête (pièces jointes, etc.)
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;