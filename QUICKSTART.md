# 🚀 Démarrage Rapide - Quizflix V1

## Installation et Lancement (3 étapes)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

### 3. Ouvrir dans le navigateur

Visitez [http://localhost:3000/fr](http://localhost:3000/fr) pour la version française
ou [http://localhost:3000/en](http://localhost:3000/en) pour la version anglaise.

## ✅ Checklist de Fonctionnement

- [ ] La home affiche 3 cartes de quiz en FR
- [ ] Le sélecteur de langue fonctionne (FR ↔ EN)
- [ ] Cliquer sur un quiz charge la page de questions
- [ ] Répondre aux 10 questions et voir le score
- [ ] La page résultat affiche une médaille (🥇/🥈/🥉)
- [ ] Le bouton "Partager" fonctionne
- [ ] La navigation vers "Jeux Vidéo" fonctionne
- [ ] Les pages légales sont accessibles

## 🎯 URLs de Test

### Français
- Home : http://localhost:3000/fr
- Quiz Inception : http://localhost:3000/fr/quiz/inception
- Quiz Breaking Bad : http://localhost:3000/fr/quiz/breaking-bad
- Quiz Zelda BotW : http://localhost:3000/fr/quiz/zelda-botw
- Jeux Vidéo : http://localhost:3000/fr/jeux-video

### Anglais
- Home : http://localhost:3000/en
- Quiz The Matrix : http://localhost:3000/en/quiz/the-matrix
- Quiz Stranger Things : http://localhost:3000/en/quiz/stranger-things
- Quiz Elden Ring : http://localhost:3000/en/quiz/elden-ring
- Video Games : http://localhost:3000/en/games

## 🔧 Build Production

```bash
# Builder le site
npm run build

# Lancer en mode production
npm start
```

## 📱 Test Mobile

Le site est optimisé mobile-first. Pour tester :

1. Ouvrir Chrome DevTools (F12)
2. Activer le mode responsive (Ctrl+Shift+M)
3. Tester sur différents appareils (iPhone, iPad, Android)

## 🐛 Dépannage

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur de build
```bash
npm run build
# Vérifier les erreurs TypeScript
```

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
PORT=3001 npm run dev
```

## 📊 Structure des Données

Chaque quiz suit ce format dans `data/{locale}/{category}/*.json` :

```json
{
  "slug": "identifiant-unique",
  "title": "Titre du Quiz",
  "category": "movie" | "tv" | "game",
  "description": "Description courte du quiz",
  "difficulty": "easy" | "medium" | "hard",
  "questions": [
    {
      "question": "La question ?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "Explication (max 180 caractères)"
    }
  ]
}
```

## 🎨 Personnalisation Rapide

### Changer les couleurs
Éditer `tailwind.config.ts` :
```ts
colors: {
  accent: '#e50914',    // Votre couleur primaire
  secondary: '#22d3ee', // Votre couleur secondaire
}
```

### Changer le logo
Éditer `i18n/messages/fr.json` et `en.json` :
```json
{
  "header": {
    "logo": "VotreNom"
  }
}
```

### Ajouter un quiz
1. Copier un fichier existant dans `data/{locale}/{category}/`
2. Modifier le contenu
3. Le quiz apparaît automatiquement !

## 🚀 Prêt pour la Production

Avant de déployer :

1. ✅ Configurer `NEXT_PUBLIC_BASE_URL` dans les variables d'environnement
2. ✅ Tester le build : `npm run build`
3. ✅ Vérifier les performances : Lighthouse
4. ✅ Tester sur mobile
5. ✅ Vérifier l'accessibilité

## 📞 Besoin d'aide ?

Consultez le README.md complet pour plus d'informations !


