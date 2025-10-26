// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Augmente la limite des Server Actions (par ex. 10 Mo)
  serverActions: {
    bodySizeLimit: 10 * 1024 * 1024, // 10 MB
    // allowedOrigins: ['https://ypios.fr', 'https://www.ypios.fr'], // optionnel
  },

  // (le reste de ta config ici si besoin)
};

export default nextConfig;