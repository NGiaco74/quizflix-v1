'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Quiz as QuizType } from '@/lib/types';
import ProgressBar from './ProgressBar';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizProps {
  quiz: QuizType;
  locale: string;
}

export default function Quiz({ quiz, locale }: QuizProps) {
  const t = useTranslations('quiz');
  const router = useRouter();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    const isCorrect = index === question.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    setAnswers((prev) => [...prev, index]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Navigate to result page with score in URL
      router.push(`/${locale}/result/${quiz.slug}?score=${score + (selectedAnswer === question.correctAnswer ? 1 : 0)}`);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <ProgressBar current={currentQuestion + 1} total={quiz.questions.length} />
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-balance">
          {question.question}
        </h2>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            let buttonClass = 'quiz-button';
            if (showCorrect) buttonClass += ' correct';
            if (showIncorrect) buttonClass += ' incorrect';
            if (showFeedback) buttonClass += ' disabled';

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={buttonClass}
              >
                <span className="flex items-center justify-between gap-4">
                  <span>{option}</span>
                  {showCorrect && <CheckCircle2 size={20} />}
                  {showIncorrect && <XCircle size={20} />}
                </span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-xl">
            <p className="text-sm font-medium mb-1 text-secondary">
              {t('explanation')}
            </p>
            <p className="text-sm text-white/80">
              {question.explanation}
            </p>
          </div>
        )}

        {showFeedback && (
          <button
            onClick={handleNext}
            className="btn-primary w-full"
          >
            {isLastQuestion ? t('finish') : t('next')}
          </button>
        )}
      </div>
    </div>
  );
}


