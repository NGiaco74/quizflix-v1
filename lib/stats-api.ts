/**
 * API pour récupérer les statistiques de recherche
 * Utilisé par n8n pour analyser les demandes de quiz
 */

export interface SearchStat {
  query: string;
  count: number;
  found: boolean;
  lastSearched: string;
}

export interface StatsSummary {
  totalSearches: number;
  foundSearches: number;
  unfoundSearches: number;
  topUnfoundQueries: Array<{ query: string; count: number }>;
  topFoundQueries: Array<{ query: string; count: number }>;
}

export interface StatsResponse {
  searches: SearchStat[];
  summary: StatsSummary;
  generatedAt: string;
  version: string;
}

/**
 * Récupère les statistiques depuis l'API
 * @param baseUrl URL de base de l'application
 * @returns Statistiques de recherche
 */
export async function fetchStats(baseUrl: string = ''): Promise<StatsResponse> {
  const response = await fetch(`${baseUrl}/api/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store' // Toujours récupérer les données fraîches
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Récupère les requêtes non trouvées (priorités pour création de quiz)
 * @param baseUrl URL de base de l'application
 * @param limit Nombre maximum de requêtes à retourner (défaut: 10)
 * @returns Liste des requêtes prioritaires
 */
export async function getUnfoundQueries(
  baseUrl: string = '', 
  limit: number = 10
): Promise<Array<{ query: string; count: number }>> {
  const stats = await fetchStats(baseUrl);
  return stats.summary.topUnfoundQueries.slice(0, limit);
}

/**
 * Vérifie si une requête spécifique est souvent recherchée
 * @param query Requête à vérifier
 * @param baseUrl URL de base de l'application
 * @param minCount Nombre minimum de recherches pour considérer comme prioritaire
 * @returns True si la requête est prioritaire
 */
export async function isQueryPriority(
  query: string, 
  baseUrl: string = '', 
  minCount: number = 5
): Promise<boolean> {
  const stats = await fetchStats(baseUrl);
  const searchStat = stats.searches.find(s => 
    s.query.toLowerCase() === query.toLowerCase()
  );
  
  return searchStat ? searchStat.count >= minCount && !searchStat.found : false;
}
