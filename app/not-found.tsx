import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="min-h-screen flex items-center justify-center bg-dark text-light">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-6xl font-bold text-accent">404</h1>
          <h2 className="text-2xl font-semibold">Page non trouvée</h2>
          <p className="text-white/70 max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="pt-4">
            <Link 
              href="/fr"
              className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}


