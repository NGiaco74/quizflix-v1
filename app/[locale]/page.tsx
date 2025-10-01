import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getAllQuizzes } from '@/lib/quiz';
import { generateSEO } from '@/lib/seo';
import QuizCard from '@/components/QuizCard';
import type { Locale } from '@/lib/i18n';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return generateSEO({
    title: t('title'),
    description: t('description'),
    locale,
  });
}

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = useTranslations('home');
  const quizzes = getAllQuizzes(locale);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 mb-8 px-2">
        <h1 className="text-2xl md:text-5xl font-bold text-balance break-words">
          {t('title')}
        </h1>
        <p className="text-sm md:text-xl text-white/70 max-w-2xl mx-auto text-balance break-words">
          {t('subtitle')}
        </p>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/50">No quizzes available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}


