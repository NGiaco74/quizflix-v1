/** @type {import('next').NextConfig} */
const nextConfig = {
  // Utiliser le runtime Next.js (SSR/ISR) géré par Netlify Runtime
  images: {
    formats: ['image/webp'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;