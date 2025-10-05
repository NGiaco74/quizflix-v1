export interface SearchRecord {
  query: string;
  found: boolean;
  timestamp: string;
  locale: string;
}

export interface SearchStats {
  query: string;
  count: number;
  lastSearched: string;
  found: boolean;
}

/**
 * Récupérer toutes les recherches
 */
export function getAllSearches(): SearchRecord[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const searches = localStorage.getItem('quiz_searches');
    return searches ? JSON.parse(searches) : [];
  } catch {
    return [];
  }
}

/**
 * Récupérer les recherches sans résultat (quiz manquants)
 */
export function getMissingQuizzes(locale?: string): SearchStats[] {
  const searches = getAllSearches();
  const filtered = locale
    ? searches.filter((s) => !s.found && s.locale === locale)
    : searches.filter((s) => !s.found);

  // Grouper par query et compter
  const stats = new Map<string, SearchStats>();
  
  filtered.forEach((search) => {
    const key = search.query.toLowerCase();
    if (stats.has(key)) {
      const stat = stats.get(key)!;
      stat.count += 1;
      if (search.timestamp > stat.lastSearched) {
        stat.lastSearched = search.timestamp;
      }
    } else {
      stats.set(key, {
        query: search.query,
        count: 1,
        lastSearched: search.timestamp,
        found: false,
      });
    }
  });

  // Trier par nombre de recherches décroissant
  return Array.from(stats.values()).sort((a, b) => b.count - a.count);
}

/**
 * Récupérer les recherches les plus populaires (avec résultat)
 */
export function getPopularSearches(locale?: string, limit = 10): SearchStats[] {
  const searches = getAllSearches();
  const filtered = locale
    ? searches.filter((s) => s.found && s.locale === locale)
    : searches.filter((s) => s.found);

  const stats = new Map<string, SearchStats>();
  
  filtered.forEach((search) => {
    const key = search.query.toLowerCase();
    if (stats.has(key)) {
      const stat = stats.get(key)!;
      stat.count += 1;
      if (search.timestamp > stat.lastSearched) {
        stat.lastSearched = search.timestamp;
      }
    } else {
      stats.set(key, {
        query: search.query,
        count: 1,
        lastSearched: search.timestamp,
        found: true,
      });
    }
  });

  return Array.from(stats.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Exporter les statistiques en CSV
 */
export function exportSearchStatsCSV(): string {
  const missing = getMissingQuizzes();
  const popular = getPopularSearches();

  let csv = 'Type,Query,Count,Last Searched\n';
  
  missing.forEach((stat) => {
    csv += `Missing,"${stat.query}",${stat.count},${stat.lastSearched}\n`;
  });
  
  popular.forEach((stat) => {
    csv += `Popular,"${stat.query}",${stat.count},${stat.lastSearched}\n`;
  });

  return csv;
}

/**
 * Télécharger les stats en CSV
 */
export function downloadSearchStats() {
  const csv = exportSearchStatsCSV();
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quiz-search-stats-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Effacer les statistiques
 */
export function clearSearchStats() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('quiz_searches');
  }
}

