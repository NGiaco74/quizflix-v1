import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizzflix - Quiz Interactifs',
  description: 'Découvrez des quiz amusants sur les films, séries et jeux vidéo',
  keywords: 'quiz, films, séries, jeux vidéo, divertissement',
  authors: [{ name: 'Quizzflix' }],
  openGraph: {
    title: 'Quizzflix - Quiz Interactifs',
    description: 'Découvrez des quiz amusants sur les films, séries et jeux vidéo',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quizzflix - Quiz Interactifs',
    description: 'Découvrez des quiz amusants sur les films, séries et jeux vidéo',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-dark" style={{ backgroundColor: '#1a1a1a' }}>
      <body className={`${inter.className} min-h-screen flex flex-col bg-dark text-light antialiased`} style={{ backgroundColor: '#1a1a1a' }}>{children}</body>
    </html>
  );
}