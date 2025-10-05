/**
 * Google Consent Mode v2
 * Gestion du consentement RGPD pour AdSense
 */

declare global {
  interface Window {
    dataLayer: any[];
    __CONSENT_GRANTED__?: boolean;
    __onConsentChange__?: (granted: boolean) => void;
  }
}

/**
 * Initialiser les defaults (denied) pour Consent Mode v2
 */
export function initConsentDefaults() {
  if (typeof window === 'undefined') return;
  
  if (!window.dataLayer) window.dataLayer = [];
  
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }

  // Default: tout denied (RGPD compliant)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
}

/**
 * Appliquer le consentement (appelé par la CMP)
 */
export function applyConsent(granted: boolean) {
  if (typeof window === 'undefined') return;
  
  if (!window.dataLayer) window.dataLayer = [];
  
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }

  const value = granted ? 'granted' : 'denied';
  
  gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });

  window.__CONSENT_GRANTED__ = granted;

  // Notifier AdProvider
  if (typeof window.__onConsentChange__ === 'function') {
    window.__onConsentChange__(granted);
  }
}

