import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BadgeCategory from './BadgeCategory';
import { Quiz } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface QuizCardProps {
  quiz: Quiz;
  locale: string;
}

export default function QuizCard({ quiz, locale }: QuizCardProps) {
  const t = useTranslations('common');

  return (
    <Link 
      href={`/${locale}/quiz/${quiz.slug}`}
      className="card group block hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-balance mb-2 group-hover:text-secondary transition-colors">
              {quiz.title}
            </h3>
            <p className="text-sm text-white/70 line-clamp-2">
              {quiz.description}
            </p>
          </div>
          <BadgeCategory category={quiz.category} />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-sm text-white/60">
            {quiz.questions.length} questions
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
            {t('start')}
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}


