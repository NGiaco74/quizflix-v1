import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { QuizResult } from '@/lib/types';
import { RotateCcw, Home } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface ResultCardProps {
  result: QuizResult;
  quizTitle: string;
  quizSlug: string;
  locale: string;
}

export default function ResultCard({ result, quizTitle, quizSlug, locale }: ResultCardProps) {
  const t = useTranslations('result');

  const getMedalEmoji = () => {
    if (!result.medal) return null;
    const medals = { gold: '🥇', silver: '🥈', bronze: '🥉' };
    return medals[result.medal];
  };

  const getResultMessage = () => {
    if (result.percentage >= 90) return t('excellent');
    if (result.percentage >= 70) return t('good');
    return t('canDoBetter');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card text-center">
        {result.medal && (
          <div className="mb-6">
            <div className="text-8xl mb-4 animate-bounce">
              {getMedalEmoji()}
            </div>
            <p className="text-xl font-semibold text-secondary">
              {t(`medal.${result.medal}`)}
            </p>
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{getResultMessage()}</h1>
        
        <div className="mb-8">
          <p className="text-6xl font-bold text-accent mb-2">
            {result.score}/{result.total}
          </p>
          <p className="text-xl text-white/70">
            {result.percentage}% {t('score', { score: result.score, total: result.total })}
          </p>
        </div>

        <div className="mb-8">
          <ShareButtons 
            title={quizTitle}
            score={result.score}
            total={result.total}
            locale={locale}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href={`/${locale}/quiz/${quizSlug}`}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            {t('replay')}
          </Link>
          <Link 
            href={`/${locale}`}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}


