/**
 * Stockage serveur des statistiques de recherche
 * Utilise un fichier JSON local (peut être remplacé par une DB plus tard)
 */

import fs from 'fs';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'data', 'search-stats.json');

export interface SearchStat {
  query: string;
  count: number;
  found: boolean;
  lastSearched: string;
}

export interface StatsData {
  searches: SearchStat[];
  lastUpdated: string;
}

/**
 * Initialise le fichier de stats s'il n'existe pas
 */
function initStatsFile() {
  const dataDir = path.join(process.cwd(), 'data');
  
  // Créer le dossier data s'il n'existe pas
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Créer le fichier s'il n'existe pas
  if (!fs.existsSync(STATS_FILE)) {
    const initialData: StatsData = {
      searches: [],
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(STATS_FILE, JSON.stringify(initialData, null, 2));
  }
}

/**
 * Lit les statistiques depuis le fichier
 */
export function readStats(): StatsData {
  initStatsFile();
  
  try {
    const fileContent = fs.readFileSync(STATS_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading stats file:', error);
    return {
      searches: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Écrit les statistiques dans le fichier
 */
export function writeStats(data: StatsData): void {
  initStatsFile();
  
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing stats file:', error);
  }
}

/**
 * Ajoute ou met à jour une recherche
 */
export function recordSearch(query: string, found: boolean): void {
  const stats = readStats();
  
  const existingSearch = stats.searches.find(
    s => s.query.toLowerCase() === query.toLowerCase()
  );

  if (existingSearch) {
    existingSearch.count += 1;
    existingSearch.lastSearched = new Date().toISOString();
    existingSearch.found = found; // Mettre à jour le statut
  } else {
    stats.searches.push({
      query,
      count: 1,
      found,
      lastSearched: new Date().toISOString()
    });
  }

  stats.lastUpdated = new Date().toISOString();
  writeStats(stats);
}

/**
 * Génère le résumé des statistiques
 */
export function getStatsSummary() {
  const stats = readStats();
  
  const foundSearches = stats.searches.filter(s => s.found);
  const unfoundSearches = stats.searches.filter(s => !s.found);
  
  const totalSearches = stats.searches.reduce((sum, s) => sum + s.count, 0);
  const foundSearchesCount = foundSearches.reduce((sum, s) => sum + s.count, 0);
  const unfoundSearchesCount = unfoundSearches.reduce((sum, s) => sum + s.count, 0);

  const topUnfoundQueries = unfoundSearches
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(s => ({ query: s.query, count: s.count }));

  const topFoundQueries = foundSearches
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(s => ({ query: s.query, count: s.count }));

  return {
    searches: stats.searches,
    summary: {
      totalSearches,
      foundSearches: foundSearchesCount,
      unfoundSearches: unfoundSearchesCount,
      topUnfoundQueries,
      topFoundQueries
    },
    generatedAt: new Date().toISOString(),
    version: '1.0.0'
  };
}
