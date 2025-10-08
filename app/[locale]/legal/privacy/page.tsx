import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  
  return generateSEO({
    title: t('title'),
    description: t('content'),
    locale,
    path: '/legal/privacy',
  });
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('legal.privacy');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
        <div className="prose prose-invert">
          <p className="text-white/80 leading-relaxed">{t('content')}</p>
        </div>
      </div>
    </div>
  );
}


