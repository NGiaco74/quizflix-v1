'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Quiz } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  quizzes: Quiz[];
  locale: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ quizzes, locale, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filtrer les quiz selon la recherche
  const filteredQuizzes = query.trim().length > 0
    ? quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(query.toLowerCase()) ||
        quiz.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Fermer les résultats si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gérer la navigation au clavier
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredQuizzes.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredQuizzes[selectedIndex]) {
        await handleSelectQuiz(filteredQuizzes[selectedIndex]);
      } else if (query.trim()) {
        // Recherche sans résultat : tracker
        await trackSearch(query.trim(), false);
        onSearch?.(query.trim());
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setQuery('');
    }
  };

  // Tracker les recherches (localStorage + serveur)
  const trackSearch = async (searchQuery: string, found: boolean) => {
    try {
      // 1. Enregistrer en localStorage (backup)
      const searches = JSON.parse(localStorage.getItem('quiz_searches') || '[]');
      searches.push({
        query: searchQuery,
        found,
        timestamp: new Date().toISOString(),
        locale,
      });
      // Garder seulement les 100 dernières recherches
      if (searches.length > 100) searches.shift();
      localStorage.setItem('quiz_searches', JSON.stringify(searches));

      // 2. Enregistrer sur le serveur (pour n8n)
      await fetch('/api/stats/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, found })
      });
    } catch (error) {
      console.error('Error tracking search:', error);
    }
  };

  const handleSelectQuiz = async (quiz: Quiz) => {
    await trackSearch(query.trim(), true);
    router.push(`/${locale}/quiz/${quiz.slug}`);
    setQuery('');
    setShowResults(false);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowResults(true);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowResults(true)}
          placeholder="Rechercher un quiz (ex: Harry Potter, Star Wars, Mario...)"
          className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            aria-label="Effacer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Résultats */}
      {showResults && query.trim() && (
        <div className="absolute z-50 w-full mt-2 bg-dark border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
          {filteredQuizzes.length > 0 ? (
            <ul>
              {filteredQuizzes.map((quiz, index) => (
                <li key={quiz.slug}>
                  <button
                    onClick={() => handleSelectQuiz(quiz)}
                    className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-0 ${
                      index === selectedIndex ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{quiz.title}</p>
                        <p className="text-sm text-white/60 truncate mt-1">{quiz.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                        quiz.difficulty === 'easy'
                          ? 'bg-green-500/20 text-green-300'
                          : quiz.difficulty === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {quiz.difficulty === 'easy' ? 'Facile' : quiz.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-white/70 mb-2">Aucun quiz trouvé pour "{query}"</p>
              <p className="text-sm text-white/50">
                Votre recherche a été enregistrée. Nous pourrions créer ce quiz bientôt ! 🎯
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

