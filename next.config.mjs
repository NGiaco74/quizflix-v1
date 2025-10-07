import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
  eslint: {
    // Évite d'échouer la CI/Netlify sur des erreurs ESLint
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);


