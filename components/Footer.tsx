import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  return (
    <footer className="mt-auto border-t border-white/10 bg-dark/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
          <p>{t('allRights')}</p>
          <div className="flex gap-6">
            <Link 
              href={`/${locale}/legal/privacy`}
              className="hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-2 py-1"
            >
              {t('privacy')}
            </Link>
            <Link 
              href={`/${locale}/legal/cookies`}
              className="hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-2 py-1"
            >
              {t('cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


