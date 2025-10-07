import { notFound } from 'next/navigation';
import { getAllQuizzes, getQuizBySlug } from '@/lib/quiz';
import { generateSEO } from '@/lib/seo';
import Quiz from '@/components/Quiz';
import BadgeCategory from '@/components/BadgeCategory';
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

export async function generateMetadata({ 
  params: { locale, slug } 
}: { 
  params: { locale: Locale; slug: string } 
}) {
  const quiz = getQuizBySlug(locale, slug);
  
  if (!quiz) {
    return {};
  }

  return generateSEO({
    title: `${quiz.title} - Quizzflix`,
    description: quiz.description,
    locale,
    path: `/quiz/${slug}`,
  });
}

export default function QuizPage({ 
  params: { locale, slug } 
}: { 
  params: { locale: Locale; slug: string } 
}) {
  const quiz = getQuizBySlug(locale, slug);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <BadgeCategory category={quiz.category} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-balance">
          {quiz.title}
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          {quiz.description}
        </p>
      </div>

      <Quiz quiz={quiz} locale={locale} />
    </div>
  );
}


