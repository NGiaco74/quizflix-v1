# 🎬 Quizflix V1 - Frontend Only

Une plateforme de quiz interactive sur les films, séries TV et jeux vidéo. Version 1 purement frontend avec données JSON locales.

## ✨ Fonctionnalités

- ✅ **Quiz interactifs** : 10 questions par quiz avec feedback immédiat
- 🌍 **Multilingue** : Interface FR/EN avec next-intl
- 📱 **Mobile-first** : Design responsive et moderne
- 🏆 **Système de médailles** : Or, Argent, Bronze selon le score
- 🔗 **Partage social** : Web Share API + fallbacks
- 🎨 **UI moderne** : Tailwind CSS avec design sombre
- ♿ **Accessible** : Contrastes AA, navigation clavier
- 🚀 **Performant** : Next.js 14 App Router, génération statique
- 🎯 **SEO optimisé** : Open Graph, sitemaps, hreflang

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **i18n** : next-intl
- **Icons** : lucide-react
- **OG Images** : @vercel/og

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build

# Démarrer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
├── app/
│   ├── [locale]/          # Routes i18n (FR/EN)
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Home
│   │   ├── quiz/[slug]/
│   │   ├── result/[slug]/
│   │   ├── jeux-video/    # Page jeux FR
│   │   ├── games/         # Page jeux EN
│   │   └── legal/
│   ├── api/
│   │   └── og/            # Open Graph images
│   ├── sitemap*.xml/
│   └── robots.txt/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Quiz.tsx           # Composant quiz interactif
│   ├── ResultCard.tsx
│   └── ...
├── data/
│   ├── fr/                # Données FR
│   │   ├── movie/
│   │   ├── tv/
│   │   └── game/
│   └── en/                # Données EN
│       ├── movie/
│       ├── tv/
│       └── game/
├── i18n/
│   └── messages/
│       ├── fr.json
│       └── en.json
├── lib/
│   ├── i18n.ts            # Config i18n
│   ├── quiz.ts            # Utilitaires quiz
│   ├── seo.ts             # Helpers SEO
│   └── types.ts
└── styles/
    └── globals.css
```

## 🎮 Ajouter un Quiz

1. Créer un fichier JSON dans `data/{locale}/{category}/`
2. Suivre le format suivant :

```json
{
  "slug": "mon-quiz",
  "title": "Titre du Quiz",
  "category": "movie|tv|game",
  "description": "Description courte",
  "difficulty": "easy|medium|hard",
  "questions": [
    {
      "question": "Ma question ?",
      "options": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
      "correctAnswer": 0,
      "explanation": "Explication courte (max 180 caractères)"
    }
  ]
}
```

3. Le quiz apparaîtra automatiquement sur la home !

## 🌐 i18n

Le site supporte FR (par défaut) et EN. Pour ajouter une langue :

1. Ajouter le code locale dans `lib/i18n.ts`
2. Créer `i18n/messages/{locale}.json`
3. Créer le dossier `data/{locale}/`
4. Mettre à jour `middleware.ts` et les sitemaps

## 🎨 Personnalisation

### Couleurs

Modifier dans `tailwind.config.ts` :

```ts
colors: {
  dark: '#0b0b0d',      // Fond principal
  light: '#ffffff',     // Texte
  accent: '#e50914',    // Rouge principal
  secondary: '#22d3ee', // Cyan secondaire
}
```

### Styles

Modifier `styles/globals.css` pour les composants globaux (boutons, cartes, etc.)

## 🚀 Déploiement

### Vercel (recommandé pour Next.js)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Netlify (alternative gratuite)

```bash
# Voir le guide complet
# NETLIFY_QUICKSTART.md ou DEPLOY_NETLIFY.md

# Méthode rapide :
# 1. Créer un dépôt GitHub
# 2. Pusher le code
# 3. Connecter sur app.netlify.com
```

### Autres plateformes

Le projet est un site statique Next.js. Compatible avec :
- Netlify ✅
- Vercel ✅
- Cloudflare Pages
- AWS Amplify
- Tout hébergement static/SSG

## 📊 Performance

- ✅ Génération statique (SSG)
- ✅ Préfetch automatique des liens
- ✅ Images optimisées
- ✅ CSS minimal (Tailwind JIT)
- ✅ Pas de JavaScript côté serveur en production

## ♿ Accessibilité

- Contrastes WCAG AA
- Navigation clavier complète
- Boutons >= 44px (mobile touch)
- Labels explicites
- Rôles ARIA appropriés

## 📝 License

MIT - Projet démo V1

## 🤝 Contribution

Ce projet est une V1 frontend-only. Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, ouvrir une issue sur GitHub.

---

**Fait avec ❤️ et Next.js 14**


