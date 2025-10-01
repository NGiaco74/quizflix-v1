import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('header');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark/80 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-2">
          <Link 
            href={`/${locale}`} 
            className="text-xl md:text-2xl font-bold text-accent hover:text-accent/90 transition-colors flex-shrink-0"
          >
            {t('logo')}
          </Link>

          <nav className="flex items-center gap-3 md:gap-6 flex-shrink-0">
            <Link 
              href={`/${locale}`}
              className="text-sm font-medium hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-2 py-1"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href={`/${locale === 'fr' ? 'jeux-video' : 'games'}`}
              className="text-sm font-medium hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-2 py-1"
            >
              {t('nav.games')}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </nav>
        </div>
      </div>
    </header>
  );
}


