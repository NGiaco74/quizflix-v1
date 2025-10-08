import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { getQuizzesByCategory } from '@/lib/quiz';
import { generateSEO } from '@/lib/seo';
import QuizCard from '@/components/QuizCard';
import type { Locale } from '@/lib/i18n';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  if (locale !== 'en') {
    return {};
  }

  const t = await getTranslations({ locale: 'en', namespace: 'gamesPage' });
  
  return generateSEO({
    title: t('title'),
    description: t('description'),
    locale: 'en',
    path: '/games',
  });
}

export default function GamesPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  
  if (locale !== 'en') {
    redirect(`/${locale}/jeux-video`);
  }

  const t = useTranslations('gamesPage');
  const quizzes = getQuizzesByCategory('en', 'game');

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          {t('title')}
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto text-balance">
          {t('description')}
        </p>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/50">No quizzes available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} locale="en" />
          ))}
        </div>
      )}
    </div>
  );
}


