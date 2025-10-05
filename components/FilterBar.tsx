'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { QuizCategory } from '@/lib/types';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  activeFilters: FilterOptions;
}

export interface FilterOptions {
  category: QuizCategory | 'all';
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  sortBy: 'recent' | 'oldest' | 'difficulty' | 'releaseYear';
}

export default function FilterBar({ onFilterChange, activeFilters }: FilterBarProps) {
  const t = useTranslations('home');
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category: QuizCategory | 'all') => {
    onFilterChange({ ...activeFilters, category });
  };

  const handleDifficultyChange = (difficulty: FilterOptions['difficulty']) => {
    onFilterChange({ ...activeFilters, difficulty });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ ...activeFilters, sortBy });
  };

  const resetFilters = () => {
    onFilterChange({
      category: 'all',
      difficulty: 'all',
      sortBy: 'recent',
    });
  };

  const hasActiveFilters = 
    activeFilters.category !== 'all' || 
    activeFilters.difficulty !== 'all' || 
    activeFilters.sortBy !== 'recent';

  return (
    <div className="space-y-4">
      {/* Toggle button mobile */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors md:hidden"
      >
        <Filter size={18} />
        Filtres
        {hasActiveFilters && (
          <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
            Actifs
          </span>
        )}
      </button>

      {/* Filters */}
      <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="flex flex-wrap gap-4 items-start">
          {/* Categories */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Catégorie
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'movie', 'tv', 'game'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeFilters.category === cat
                      ? 'bg-secondary text-dark'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Difficulté
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => handleDifficultyChange(diff)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeFilters.difficulty === diff
                      ? 'bg-accent text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {diff === 'all' ? 'Tous' : diff === 'easy' ? 'Facile' : diff === 'medium' ? 'Moyen' : 'Difficile'}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Trier par
            </label>
            <select
              value={activeFilters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="recent" className="bg-dark">Plus récents</option>
              <option value="oldest" className="bg-dark">Plus anciens</option>
              <option value="difficulty" className="bg-dark">Difficulté</option>
              <option value="releaseYear" className="bg-dark">Année de sortie</option>
            </select>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <X size={16} />
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

