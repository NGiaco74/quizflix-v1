/**
 * Frequency Capping pour Sticky Ads
 * Limite l'affichage des pubs sticky (ex: 1 fois par 90s)
 */

const STORAGE_KEY = 'qfx_sticky_ts';

/**
 * Vérifier si on peut afficher le sticky ad
 */
export function canShowSticky(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (!lastShown) return true;

    const windowMs = Number(process.env.NEXT_PUBLIC_ADS_STICKY_FREQ_SECONDS || '90') * 1000;
    const elapsed = Date.now() - Number(lastShown);

    return elapsed > windowMs;
  } catch {
    return true;
  }
}

/**
 * Marquer qu'un sticky ad a été affiché
 */
export function markStickyShown(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignore errors (private browsing, etc.)
  }
}

/**
 * Réinitialiser le compteur (pour tests)
 */
export function resetStickyTimer(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

