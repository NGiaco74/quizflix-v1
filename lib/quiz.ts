import { Locale } from './i18n';
import { Quiz, QuizResult } from './types';
import fs from 'fs';
import path from 'path';

/**
 * Get all quizzes for a locale
 */
export function getAllQuizzes(locale: Locale): Quiz[] {
  const dataDir = path.join(process.cwd(), 'data', locale);
  const categories = ['movie', 'tv', 'game'];
  const quizzes: Quiz[] = [];

  for (const category of categories) {
    const categoryDir = path.join(dataDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((file) => file.endsWith('.json'));
    
    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const quiz: Quiz = JSON.parse(content);
      quizzes.push(quiz);
    }
  }

  return quizzes;
}

/**
 * Get a single quiz by slug
 */
export function getQuizBySlug(locale: Locale, slug: string): Quiz | null {
  const quizzes = getAllQuizzes(locale);
  return quizzes.find((q) => q.slug === slug) || null;
}

/**
 * Get quizzes by category
 */
export function getQuizzesByCategory(locale: Locale, category: string): Quiz[] {
  const quizzes = getAllQuizzes(locale);
  return quizzes.filter((q) => q.category === category);
}

/**
 * Calculate quiz result
 */
export function calculateResult(score: number, total: number): QuizResult {
  const percentage = Math.round((score / total) * 100);
  
  let medal: 'gold' | 'silver' | 'bronze' | null = null;
  if (percentage >= 90) medal = 'gold';
  else if (percentage >= 70) medal = 'silver';
  else if (percentage >= 50) medal = 'bronze';

  return {
    score,
    total,
    percentage,
    medal,
  };
}


