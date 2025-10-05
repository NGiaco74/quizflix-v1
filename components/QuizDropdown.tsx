'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Film, Tv, Gamepad2 } from 'lucide-react';
import { Quiz, QuizCategory } from '@/lib/types';

interface QuizDropdownProps {
  quizzes: Quiz[];
  locale: string;
  onSelectFranchise: (franchise: string, category: QuizCategory) => void;
}

interface Franchise {
  name: string;
  category: QuizCategory;
  quizCount: number;
  releaseYear?: number;
}

export default function QuizDropdown({ quizzes, locale, onSelectFranchise }: QuizDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extraire les franchises uniques
  const franchises = useMemo(() => {
    const franchiseMap = new Map<string, Franchise>();

    quizzes.forEach((quiz) => {
      // Extraire le nom de la franchise (avant le " - ")
      const franchiseName = quiz.title.split(' - ')[0].trim();
      const key = `${franchiseName}-${quiz.category}`;

      if (franchiseMap.has(key)) {
        const franchise = franchiseMap.get(key)!;
        franchise.quizCount += 1;
      } else {
        franchiseMap.set(key, {
          name: franchiseName,
          category: quiz.category,
          quizCount: 1,
          releaseYear: quiz.releaseYear,
        });
      }
    });

    return Array.from(franchiseMap.values());
  }, [quizzes]);

  // Organiser par catégorie
  const franchisesByCategory = useMemo(() => ({
    movie: franchises.filter((f) => f.category === 'movie'),
    tv: franchises.filter((f) => f.category === 'tv'),
    game: franchises.filter((f) => f.category === 'game'),
  }), [franchises]);

  // Fermer si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectFranchise = (franchise: Franchise) => {
    onSelectFranchise(franchise.name, franchise.category);
    setIsOpen(false);
  };

  const getCategoryIcon = (category: QuizCategory) => {
    switch (category) {
      case 'movie':
        return <Film size={16} />;
      case 'tv':
        return <Tv size={16} />;
      case 'game':
        return <Gamepad2 size={16} />;
    }
  };

  const getCategoryLabel = (category: QuizCategory) => {
    switch (category) {
      case 'movie':
        return 'Films';
      case 'tv':
        return 'Séries TV';
      case 'game':
        return 'Jeux Vidéo';
    }
  };

  const totalQuizzes = franchises.reduce((sum, f) => sum + f.quizCount, 0);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 min-w-[200px]"
      >
        <span className="flex-1 text-left">Tous les quiz ({totalQuizzes})</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 bg-dark border border-white/20 rounded-xl shadow-2xl max-h-[500px] overflow-y-auto">
          {(['movie', 'tv', 'game'] as QuizCategory[]).map((category) => {
            const categoryFranchises = franchisesByCategory[category];
            if (categoryFranchises.length === 0) return null;

            return (
              <div key={category} className="border-b border-white/10 last:border-0">
                {/* En-tête catégorie */}
                <div className="px-4 py-3 bg-white/5 sticky top-0 flex items-center gap-2 font-semibold">
                  {getCategoryIcon(category)}
                  <span>{getCategoryLabel(category)}</span>
                  <span className="ml-auto text-sm text-white/50">
                    {categoryFranchises.length}
                  </span>
                </div>

                {/* Liste des franchises */}
                <ul>
                  {categoryFranchises.map((franchise, index) => (
                    <li key={`${franchise.name}-${index}`}>
                      <button
                        onClick={() => handleSelectFranchise(franchise)}
                        className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white group-hover:text-secondary transition-colors">
                              {franchise.name}
                            </p>
                            {franchise.releaseYear && (
                              <p className="text-xs text-white/40 mt-0.5">
                                {franchise.releaseYear}
                              </p>
                            )}
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary flex-shrink-0">
                            {franchise.quizCount} quiz
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {franchises.length === 0 && (
            <div className="px-4 py-8 text-center text-white/50">
              Aucun quiz disponible
            </div>
          )}
        </div>
      )}
    </div>
  );
}
