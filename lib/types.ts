export type QuizCategory = 'movie' | 'tv' | 'game';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string; // Max 180 characters
}

export interface Quiz {
  slug: string;
  title: string;
  category: QuizCategory;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  imageUrl?: string;
  createdAt?: string; // Date de création du quiz (ISO format)
  releaseYear?: number; // Année de sortie du film/série/jeu
  popularity?: number; // Score de popularité (1-10)
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  medal: 'gold' | 'silver' | 'bronze' | null;
}


