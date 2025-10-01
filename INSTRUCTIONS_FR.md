# 🎬 Quizflix V1 - Instructions de Démarrage

Bienvenue dans votre nouveau projet Quizflix V1 ! Ce guide vous aidera à démarrer en 5 minutes.

---

## ⚡ Démarrage Ultra-Rapide

### Étape 1 : Installation des Dépendances
```bash
npm install
```
⏱️ Durée : 1-2 minutes

### Étape 2 : Lancer le Serveur
```bash
npm run dev
```
⏱️ Le serveur démarre en quelques secondes

### Étape 3 : Ouvrir dans le Navigateur
Visitez : **http://localhost:3000/fr**

🎉 **C'est tout ! Votre site est en ligne localement.**

---

## 🎯 Que Faire Maintenant ?

### Test Rapide (5 minutes)

1. **Page d'accueil**
   - Vous verrez 3 cartes de quiz
   - Cliquez sur "Inception - Le rêve dans le rêve"

2. **Jouer au quiz**
   - 10 questions vous seront posées
   - Cliquez sur une réponse
   - Lisez l'explication
   - Cliquez sur "Question suivante"

3. **Voir votre score**
   - Après la question 10, vous verrez votre résultat
   - Une médaille si vous avez ≥50%
   - Testez le bouton "Partager"

4. **Changer de langue**
   - Cliquez sur "EN" en haut à droite
   - L'interface passe en anglais
   - Les quiz changent aussi

5. **Page Jeux Vidéo**
   - Cliquez sur "Jeux Vidéo" dans le menu
   - Vous verrez uniquement les quiz de jeux

---

## 📁 Structure du Projet (Simplifié)

```
Quizz/
├── app/                    # Pages Next.js
│   ├── [locale]/          # Pages multilingues
│   │   ├── page.tsx       # 🏠 HOME
│   │   ├── quiz/[slug]/   # 🎮 PAGE QUIZ
│   │   └── result/[slug]/ # 🏆 PAGE RÉSULTAT
│   └── api/og/            # Images Open Graph
├── components/             # Composants React
│   ├── Quiz.tsx           # 🎯 Composant principal du quiz
│   ├── Header.tsx         # En-tête
│   └── ...
├── data/                   # 📊 DONNÉES DES QUIZ
│   ├── fr/                # Quiz français
│   │   ├── movie/         # Films
│   │   ├── tv/            # Séries
│   │   └── game/          # Jeux vidéo
│   └── en/                # Quiz anglais
├── i18n/messages/         # Traductions
│   ├── fr.json            # Français
│   └── en.json            # Anglais
└── lib/                   # Fonctions utilitaires
```

---

## ➕ Ajouter un Nouveau Quiz (3 minutes)

### Méthode Simple : Copier-Coller

1. **Copier un quiz existant**
   ```bash
   # Exemple : copier Inception
   cp data/fr/movie/inception.json data/fr/movie/mon-quiz.json
   ```

2. **Éditer le fichier**
   Ouvrir `data/fr/movie/mon-quiz.json` et modifier :
   ```json
   {
     "slug": "mon-quiz",              ← Identifiant unique
     "title": "Mon Nouveau Quiz",     ← Titre affiché
     "category": "movie",             ← movie, tv ou game
     "description": "Description",     ← Description courte
     "difficulty": "medium",           ← easy, medium ou hard
     "questions": [
       {
         "question": "Ma question ?",
         "options": ["A", "B", "C", "D"],
         "correctAnswer": 0,           ← Index 0-3
         "explanation": "Explication"  ← Max 180 caractères
       }
     ]
   }
   ```

3. **Sauvegarder et rafraîchir**
   Le quiz apparaît automatiquement sur la home !

### ⚠️ Règles Importantes

- ✅ Le `slug` doit être unique (kebab-case : "mon-quiz-cool")
- ✅ Exactement 10 questions par quiz
- ✅ Exactement 4 options par question
- ✅ `correctAnswer` est un index (0, 1, 2 ou 3)
- ✅ Explication ≤ 180 caractères

---

## 🌍 Traduction en Anglais

Pour ajouter la version anglaise de votre quiz :

1. Copier vers le dossier anglais
   ```bash
   cp data/fr/movie/mon-quiz.json data/en/movie/my-quiz.json
   ```

2. Traduire le contenu
   - `slug` : "my-quiz"
   - `title` : "My New Quiz"
   - `description` : traduction
   - Toutes les questions et options

3. Le quiz anglais apparaîtra automatiquement en mode EN

---

## 🎨 Personnalisation du Style

### Changer les Couleurs

Éditer `tailwind.config.ts` :

```typescript
colors: {
  dark: '#0b0b0d',      // ← Fond principal (noir)
  light: '#ffffff',     // ← Texte (blanc)
  accent: '#e50914',    // ← Couleur primaire (rouge Netflix)
  secondary: '#22d3ee', // ← Couleur secondaire (cyan)
}
```

### Changer le Logo

Éditer `i18n/messages/fr.json` et `en.json` :

```json
{
  "header": {
    "logo": "Quizflix"  // ← Changez ici
  }
}
```

---

## 📱 Tester sur Mobile

### Option 1 : DevTools
1. F12 pour ouvrir les DevTools
2. Ctrl+Shift+M pour mode responsive
3. Choisir un appareil (iPhone, iPad, etc.)

### Option 2 : Réseau Local
1. Trouver votre IP locale (ex: 192.168.1.10)
2. Ouvrir sur mobile : `http://192.168.1.10:3000/fr`

---

## 🚀 Builder pour la Production

### Tester le Build

```bash
npm run build
```

Cela va :
- Compiler TypeScript
- Générer les pages statiques
- Optimiser les assets
- Créer le dossier `.next/`

### Lancer en Mode Production

```bash
npm start
```

Le site sera accessible sur http://localhost:3000

---

## 🌐 Déploiement

### Vercel (Recommandé, Gratuit)

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Installer Vercel CLI :
   ```bash
   npm i -g vercel
   ```
3. Déployer :
   ```bash
   vercel
   ```
4. Suivre les instructions
5. Votre site sera en ligne en 2 minutes !

### Autres Options
- **Netlify** : Glisser-déposer le dossier `.next/`
- **GitHub Pages** : Export statique possible
- **Cloudflare Pages** : Support Next.js
- **Votre serveur** : `npm run build` puis upload

---

## 🐛 Problèmes Courants

### ❌ Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Port 3000 déjà utilisé
```bash
# Utiliser un autre port
PORT=3001 npm run dev
```

### ❌ Erreurs TypeScript
```bash
# Vérifier les erreurs
npm run build
```

### ❌ Page blanche
1. Vérifier la console du navigateur (F12)
2. Vérifier les erreurs dans le terminal
3. Relancer `npm run dev`

---

## 📚 Documentation Complète

- **README.md** : Documentation technique complète
- **QUICKSTART.md** : Guide de démarrage rapide (EN)
- **CONTRIBUTING.md** : Guide de contribution
- **PROJECT_SUMMARY.md** : Résumé du projet

---

## 💡 Astuces & Conseils

### Pour les Débutants

1. **Commencez par ajouter des quiz**
   - C'est la façon la plus simple de personnaliser le site
   - Copiez un quiz existant et modifiez-le

2. **Testez chaque changement**
   - Le serveur se recharge automatiquement
   - Rafraîchissez le navigateur (Ctrl+R)

3. **Lisez les messages d'erreur**
   - Les erreurs TypeScript sont utiles
   - Elles vous guident vers le problème

### Pour les Développeurs

1. **Respectez les types TypeScript**
   - Types définis dans `lib/types.ts`
   - Évitez `any`

2. **Utilisez les composants existants**
   - Réutilisez `QuizCard`, `BadgeCategory`, etc.
   - Créez de nouveaux composants si nécessaire

3. **Testez en production locale**
   - `npm run build` avant de déployer
   - Vérifiez les performances

---

## 📊 Statistiques

Votre projet contient :
- ✅ **57 fichiers** créés
- ✅ **6 quiz** prêts (3 FR + 3 EN)
- ✅ **60 questions** au total
- ✅ **9 composants** React
- ✅ **13 pages** Next.js
- ✅ **2 langues** (FR/EN)

---

## 🎯 Prochaines Étapes Suggérées

### Court Terme (1-2 heures)
1. ✅ Installer et tester le projet
2. ✅ Ajouter 2-3 quiz de votre choix
3. ✅ Personnaliser les couleurs
4. ✅ Changer le nom/logo

### Moyen Terme (1 jour)
1. ✅ Ajouter 10+ quiz
2. ✅ Créer des images pour les cartes
3. ✅ Optimiser les métadonnées SEO
4. ✅ Déployer sur Vercel

### Long Terme (1 semaine+)
1. ✅ Ajouter d'autres langues (ES, DE, IT...)
2. ✅ Système de favoris (LocalStorage)
3. ✅ Statistiques personnelles
4. ✅ Mode PWA (installable)
5. ✅ Partage sur réseaux sociaux

---

## 💬 Besoin d'Aide ?

1. **Lisez la documentation** : README.md contient tout
2. **Consultez les exemples** : Les quiz existants sont des modèles
3. **Testez en local** : `npm run dev` pour voir vos changements
4. **Ouvrez une issue** : Si vous trouvez un bug

---

## 🎉 Félicitations !

Vous avez maintenant un site de quiz complet, moderne et performant ! 

**Commande pour démarrer :**
```bash
npm install && npm run dev
```

**Puis visitez :** http://localhost:3000/fr

---

**Bon développement et amusez-vous bien ! 🚀**


