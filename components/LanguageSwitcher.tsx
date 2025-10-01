'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = currentLocale === 'fr' ? 'en' : 'fr';
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    
    // Handle special paths
    if (pathname.includes('/jeux-video') && newLocale === 'en') {
      router.push(`/${newLocale}/games`);
    } else if (pathname.includes('/games') && newLocale === 'fr') {
      router.push(`/${newLocale}/jeux-video`);
    } else {
      router.push(newPath);
    }
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50"
      aria-label={`Switch to ${currentLocale === 'fr' ? 'English' : 'Français'}`}
    >
      <Globe size={18} />
      <span className="uppercase">{currentLocale === 'fr' ? 'EN' : 'FR'}</span>
    </button>
  );
}


