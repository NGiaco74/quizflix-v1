import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAllQuizzes, getQuizBySlug, calculateResult } from '@/lib/quiz';
import { generateSEO } from '@/lib/seo';
import ResultCard from '@/components/ResultCard';
import type { Locale } from '@/lib/i18n';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of ['fr', 'en'] as const) {
    const quizzes = getAllQuizzes(locale);
    for (const quiz of quizzes) {
      params.push({ locale, slug: quiz.slug });
    }
  }
  
  return params;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ 
  params: { locale, slug },
  searchParams,
}: { 
  params: { locale: Locale; slug: string };
  searchParams: { score?: string };
}) {
  const quiz = getQuizBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: 'result' });
  
  if (!quiz) {
    return {};
  }

  const score = searchParams.score ? parseInt(searchParams.score, 10) : 0;
  const ogImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og?title=${encodeURIComponent(quiz.title)}&score=${score}&total=${quiz.questions.length}`;

  return generateSEO({
    title: `${t('title')} - ${quiz.title}`,
    description: quiz.description,
    locale,
    path: `/result/${slug}`,
    ogImage: ogImageUrl,
  });
}

export default function ResultPage({ 
  params: { locale, slug },
  searchParams,
}: { 
  params: { locale: Locale; slug: string };
  searchParams: { score?: string };
}) {
  const quiz = getQuizBySlug(locale, slug);

  if (!quiz) {
    notFound();
  }

  const score = searchParams.score ? parseInt(searchParams.score, 10) : 0;
  const result = calculateResult(score, quiz.questions.length);

  return (
    <div className="py-8">
      <ResultCard 
        result={result}
        quizTitle={quiz.title}
        quizSlug={quiz.slug}
        locale={locale}
      />
    </div>
  );
}


