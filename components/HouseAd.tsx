'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';

interface HouseAdProps {
  type: 'top' | 'mid' | 'sticky';
}

export default function HouseAd({ type }: HouseAdProps) {
  const params = useParams();
  const locale = params?.locale as string || 'fr';
  
  const heights = {
    top: 100,
    mid: 300,
    sticky: 60,
  };

  const messages = {
    fr: {
      top: 'Découvre nos meilleurs quizz',
      mid: 'Teste tes connaissances sur tes films préférés',
      sticky: 'Plus de quizz',
    },
    en: {
      top: 'Discover our best quizzes',
      mid: 'Test your knowledge about your favorite movies',
      sticky: 'More quizzes',
    },
  };

  const text = messages[locale as 'fr' | 'en']?.[type] || messages.fr[type];
  const minHeight = heights[type];

  if (type === 'sticky') {
    return (
      <Link href={`/${locale}`}>
        <div
          style={{ minHeight }}
          className="ad-skeleton flex items-center justify-center gap-2 rounded-xl text-sm font-medium text-white/90 bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 hover:border-accent/50 transition-colors cursor-pointer px-4"
        >
          <Sparkles size={16} />
          <span>{text}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${locale}`}>
      <div
        style={{ minHeight }}
        className="ad-skeleton flex flex-col items-center justify-center gap-3 rounded-xl text-center bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-secondary/50 transition-all cursor-pointer p-6"
      >
        <Sparkles size={32} className="text-secondary" />
        <p className="text-lg font-semibold text-white">{text}</p>
        <p className="text-sm text-white/60">Clique pour explorer</p>
      </div>
    </Link>
  );
}

