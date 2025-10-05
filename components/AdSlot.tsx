'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAds } from './AdProvider';
import { canShowSticky, markStickyShown } from '@/lib/fcap';
import HouseAd from './HouseAd';

interface AdSlotProps {
  id: string;
  type: 'top' | 'mid' | 'sticky';
  className?: string;
  style?: React.CSSProperties;
  slotId?: string;
}

const HEIGHTS = {
  top: 100,
  mid: 300,
  sticky: 60,
};

export default function AdSlot({ id, type, className = '', style, slotId }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useAds();
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isSticky = type === 'sticky';
  const reservedHeight = HEIGHTS[type];

  // Lazy loading avec IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Vérifier frequency cap pour sticky
    if (isSticky && !canShowSticky()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '400px 0px', // Charger 400px avant d'être visible
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isSticky]);

  // Charger l'annonce quand visible + consentement + ready
  useEffect(() => {
    if (!inView || !enabled || !ready || loaded) return;

    try {
      // @ts-ignore
      window.adsbygoogle = window.adsbygoogle || [];
      (window as any).adsbygoogle.push({});
      setLoaded(true);

      if (isSticky) {
        markStickyShown();
      }
    } catch (error) {
      console.warn('AdSense push failed:', error);
    }
  }, [inView, enabled, ready, loaded, isSticky]);

  const containerStyle: React.CSSProperties = {
    minHeight: reservedHeight,
    ...style,
  };

  if (isSticky) {
    containerStyle.position = 'sticky';
    containerStyle.bottom = 0;
    containerStyle.zIndex = 30;
  }

  return (
    <div
      ref={ref}
      id={id}
      className={`ad-box ${className}`}
      style={containerStyle}
    >
      {enabled && ready ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot={slotId || '0000000000'}
          data-full-width-responsive="true"
        />
      ) : (
        <HouseAd type={type} />
      )}
    </div>
  );
}

