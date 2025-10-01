# 🤝 Guide de Contribution - Quizflix V1

Merci de votre intérêt pour contribuer à Quizflix !

## 🎯 Types de Contributions

### 1. 📝 Ajouter des Quiz

C'est la contribution la plus simple et la plus utile !

**Étapes :**
1. Créer un fichier JSON dans `data/{locale}/{category}/`
2. Suivre le format existant (voir les exemples)
3. Respecter les règles :
   - 10 questions par quiz
   - 4 options par question
   - Explications <= 180 caractères
   - Pas de spoilers majeurs
   - Slug unique (kebab-case)

**Exemple de quiz :**
```json
{
  "slug": "mon-nouveau-quiz",
  "title": "Titre Accrocheur",
  "category": "movie|tv|game",
  "description": "Description engageante du quiz",
  "difficulty": "easy|medium|hard",
  "questions": [
    {
      "question": "Question intéressante ?",
      "options": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
      "correctAnswer": 0,
      "explanation": "Explication concise et informative"
    }
  ]
}
```

### 2. 🐛 Corriger des Bugs

1. Vérifier qu'une issue n'existe pas déjà
2. Créer une issue décrivant le bug
3. Fork le repo et créer une branche : `fix/description-du-bug`
4. Corriger le bug
5. Tester localement
6. Soumettre une PR

### 3. ✨ Ajouter des Fonctionnalités

1. Créer une issue pour discuter de la fonctionnalité
2. Attendre validation avant de commencer
3. Fork et créer une branche : `feature/nom-fonctionnalite`
4. Développer la fonctionnalité
5. Respecter le style de code existant
6. Tester
7. Soumettre une PR

### 4. 🌍 Ajouter une Langue

1. Ajouter le code locale dans `lib/i18n.ts`
2. Créer `i18n/messages/{locale}.json`
3. Traduire tous les textes
4. Créer `data/{locale}/` avec des quiz
5. Mettre à jour les routes (middleware, sitemaps)

## 📋 Checklist PR

Avant de soumettre une Pull Request :

- [ ] Le code compile sans erreur : `npm run build`
- [ ] Pas d'erreurs ESLint : `npm run lint`
- [ ] Les types TypeScript sont corrects
- [ ] Le site fonctionne en local : `npm run dev`
- [ ] Les changements sont testés manuellement
- [ ] Le README est mis à jour si nécessaire
- [ ] Les commits sont clairs et descriptifs

## 🎨 Standards de Code

### TypeScript
```typescript
// ✅ Bon
interface QuizProps {
  quiz: Quiz;
  locale: string;
}

// ❌ Éviter
const props: any = {};
```

### Composants React
```typescript
// ✅ Bon : Types explicites
export default function MyComponent({ data }: { data: string }) {
  return <div>{data}</div>;
}

// ❌ Éviter : Props non typées
export default function MyComponent({ data }) {
  return <div>{data}</div>;
}
```

### Styling
```typescript
// ✅ Bon : Classes Tailwind
<button className="btn-primary">

// ❌ Éviter : Styles inline
<button style={{ background: 'red' }}>
```

## 📝 Messages de Commit

Format : `type(scope): description`

**Types :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, pas de changement de code
- `refactor`: Refactoring
- `test`: Ajout de tests
- `chore`: Tâches de maintenance

**Exemples :**
```
feat(quiz): ajouter quiz Matrix en français
fix(i18n): corriger traduction anglaise
docs(readme): améliorer instructions installation
```

## 🔍 Processus de Review

1. Soumission de la PR
2. Review automatique (lint, build)
3. Review par un mainteneur
4. Corrections si nécessaires
5. Merge

## ❓ Questions ?

N'hésitez pas à :
- Ouvrir une issue pour poser une question
- Consulter les issues existantes
- Lire le README.md et QUICKSTART.md

## 📜 Code de Conduite

Soyez respectueux et constructif dans vos interactions. Ce projet vise à créer une communauté accueillante pour tous.

---

**Merci de contribuer à Quizflix ! 🎉**


