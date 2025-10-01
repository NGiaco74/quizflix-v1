import { Film, Tv, Gamepad2 } from 'lucide-react';
import { QuizCategory } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface BadgeCategoryProps {
  category: QuizCategory;
}

export default function BadgeCategory({ category }: BadgeCategoryProps) {
  const t = useTranslations('category');

  const config = {
    movie: {
      icon: Film,
      label: t('movie'),
      className: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    },
    tv: {
      icon: Tv,
      label: t('tv'),
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    },
    game: {
      icon: Gamepad2,
      label: t('game'),
      className: 'bg-green-500/20 text-green-300 border-green-500/50',
    },
  };

  const { icon: Icon, label, className } = config[category];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${className}`}>
      <Icon size={14} />
      {label}
    </span>
  );
}


