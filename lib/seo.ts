import { Locale } from './i18n';

export interface SEOProps {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
  ogImage?: string;
}

export function generateSEO({
  title,
  description,
  locale,
  path = '',
  ogImage,
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/${locale}${path}`;
  const ogImageUrl = ogImage || `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${baseUrl}/fr${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Quizflix',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export function generateHreflangLinks(path: string = '') {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return [
    { rel: 'alternate', hreflang: 'fr', href: `${baseUrl}/fr${path}` },
    { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en${path}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/fr${path}` },
  ];
}


