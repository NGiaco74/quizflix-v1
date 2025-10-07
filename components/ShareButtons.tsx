'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Share2, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  score: number;
  total: number;
  locale: string;
}

export default function ShareButtons({ title, score, total, locale: _locale }: ShareButtonsProps) {
  const t = useTranslations('share');
  const [copied, setCopied] = useState(false);

  const shareText = t('text', { score, total, title });
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Quizzflix`,
          text: shareText,
          url: shareUrl,
        });
    } catch {
      console.log('Share cancelled');
    }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={handleShare}
        className="btn-secondary flex items-center justify-center gap-2"
      >
        <Share2 size={18} />
        {t('text', { score, total, title: '' }).split(' ')[0]}
      </button>

      <button
        onClick={handleCopyLink}
        className="btn-secondary flex items-center justify-center gap-2"
        disabled={copied}
      >
        {copied ? (
          <>
            <Check size={18} />
            {t('copied')}
          </>
        ) : (
          <>
            <Share2 size={18} />
            {t('copyLink')}
          </>
        )}
      </button>
    </div>
  );
}


