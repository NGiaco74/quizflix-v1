'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import QuizCard from './QuizCard';
import FilterBar, { FilterOptions } from './FilterBar';
import SearchBar from './SearchBar';
import QuizDropdown from './QuizDropdown';
import { Quiz } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface HomePageProps {
  quizzes: Quiz[];
  locale: string;
}

export default function HomePage({ quizzes, locale }: HomePageProps) {
  const t = useTranslations('home');
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    difficulty: 'all',
    sortBy: 'recent',
  });
  
  const [franchiseFilter, setFranchiseFilter] = useState<string | null>(null);

  // Filtrer et trier les quiz
  const filteredQuizzes = useMemo(() => {
    let filtered = [...quizzes];

    // Filtre par franchise (depuis le dropdown)
    if (franchiseFilter) {
      filtered = filtered.filter((q) => q.title.startsWith(franchiseFilter));
    }

    // Filtre par catégorie
    if (filters.category !== 'all') {
      filtered = filtered.filter((q) => q.category === filters.category);
    }

    // Filtre par difficulté
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === filters.difficulty);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'recent':
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        case 'oldest':
          return (a.createdAt || '').localeCompare(b.createdAt || '');
        case 'difficulty':
          const diffOrder = { easy: 1, medium: 2, hard: 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case 'releaseYear':
          return (b.releaseYear || 0) - (a.releaseYear || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [quizzes, filters]);

  // Les 3 derniers quiz (avant filtrage)
  const latestQuizzes = useMemo(() => {
    return [...quizzes]
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
      .slice(0, 3);
  }, [quizzes]);

  // Les autres quiz (filtrés)
  const otherQuizzes = useMemo(() => {
    const latestSlugs = new Set(latestQuizzes.map((q) => q.slug));
    return filteredQuizzes.filter((q) => !latestSlugs.has(q.slug));
  }, [filteredQuizzes, latestQuizzes]);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 mb-8 px-2">
        <h1 className="text-2xl md:text-5xl font-bold text-balance break-words">
          {t('title')}
        </h1>
        <p className="text-sm md:text-xl text-white/70 max-w-2xl mx-auto text-balance break-words">
          {t('subtitle')}
        </p>
      </div>

      {/* Barre de recherche et menu déroulant */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="w-full md:flex-1 max-w-2xl">
          <SearchBar quizzes={quizzes} locale={locale} />
        </div>
        <QuizDropdown 
          quizzes={quizzes} 
          locale={locale}
          onSelectFranchise={(name, category) => {
            setFranchiseFilter(name);
            setFilters({ ...filters, category });
          }}
        />
      </div>

      {/* Filtre franchise actif */}
      {franchiseFilter && (
        <div className="flex items-center justify-center gap-3">
          <span className="text-white/70">Affichage :</span>
          <span className="bg-secondary/20 text-secondary px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
            {franchiseFilter}
            <button
              onClick={() => setFranchiseFilter(null)}
              className="hover:text-white transition-colors"
              aria-label="Retirer le filtre"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* Si franchise sélectionnée, afficher tous ses quiz */}
      {franchiseFilter ? (
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Quiz {franchiseFilter}
          </h2>

          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/50">Aucun quiz trouvé pour cette franchise.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.slug} quiz={quiz} locale={locale} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Derniers quiz */}
          {latestQuizzes.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="text-secondary" size={24} />
                <h2 className="text-2xl md:text-3xl font-bold">Derniers quizz</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestQuizzes.map((quiz) => (
                  <QuizCard key={quiz.slug} quiz={quiz} locale={locale} />
                ))}
              </div>
            </section>
          )}

          {/* Filtres et autres quiz */}
          {otherQuizzes.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Autres quizz</h2>
              
              <FilterBar onFilterChange={setFilters} activeFilters={filters} />

              {otherQuizzes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/50">Aucun quiz ne correspond à vos filtres.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {otherQuizzes.map((quiz) => (
                    <QuizCard key={quiz.slug} quiz={quiz} locale={locale} />
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}

      {quizzes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">Aucun quiz disponible pour le moment.</p>
        </div>
      )}
    </div>
  );
}

