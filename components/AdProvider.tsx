'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AdsContext = {
  enabled: boolean;
  client?: string;
  ready: boolean;
};

const AdsContext = createContext<AdsContext>({
  enabled: false,
  ready: false,
});

export const useAds = () => useContext(AdsContext);

export default function AdProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' && !!client;

  useEffect(() => {
    if (!enabled) return;

    // Attendre que la CMP définisse le consentement
    // La CMP doit appeler applyConsent() depuis lib/consent.ts
    window.__onConsentChange__ = (granted: boolean) => {
      if (!granted) return;

      // Vérifier si le script est déjà chargé
      if (document.querySelector('script[data-adsense]')) {
        setReady(true);
        return;
      }

      // Charger le script AdSense
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.async = true;
      script.setAttribute('crossorigin', 'anonymous');
      script.setAttribute('data-adsense', '1');
      script.onload = () => setReady(true);
      script.onerror = () => console.warn('AdSense script failed to load');
      
      document.head.appendChild(script);
    };

    // Si consent déjà accordé (reload après consent)
    if ((window as any).__CONSENT_GRANTED__ === true) {
      (window as any).__onConsentChange__(true);
    }
  }, [enabled, client]);

  return (
    <AdsContext.Provider value={{ enabled, client, ready }}>
      {children}
    </AdsContext.Provider>
  );
}

