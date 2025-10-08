import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllQuizzes } from '@/lib/quiz';
import { generateSEO } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';
import HomePage from '@/components/HomePage';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return generateSEO({
    title: t('title'),
    description: t('description'),
    locale,
  });
}

export default function HomePageWrapper({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const quizzes = getAllQuizzes(locale);

  return <HomePage quizzes={quizzes} locale={locale} />;
}
