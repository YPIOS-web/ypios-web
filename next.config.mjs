/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // mets '25mb' si tu joins de gros PDF
    },
  },
};

export default nextConfig;