# 🧪 TEST DIRECT CHATGPT/CLAUDE - Stranger Things

## 📋 PROMPT À COPIER-COLLER

```
Génère 3 quiz en français sur la série Stranger Things avec 3 niveaux de difficulté (facile, moyen, difficile).

Chaque quiz doit avoir :
- Un titre unique
- Une description courte
- Exactement 10 questions
- 4 options par question
- L'index de la bonne réponse (0 à 3)
- Une explication courte (max 180 caractères)

Format JSON strict requis :

{
  "quizzes": [
    {
      "title": "Stranger Things - Découvre Hawkins",
      "category": "tv",
      "description": "Teste tes connaissances de base sur Stranger Things. Parfait pour les nouveaux fans !",
      "difficulty": "easy",
      "questions": [
        {
          "question": "Dans quelle ville fictive se déroule Stranger Things ?",
          "options": ["Hawkins, Indiana", "Riverside, Indiana", "Salem, Massachusetts", "Derry, Maine"],
          "correctAnswer": 0,
          "explanation": "Hawkins est la petite ville de l'Indiana où se déroulent tous les événements surnaturels."
        }
        // ... 9 autres questions faciles
      ]
    },
    {
      "title": "Stranger Things - Les Mystères de l'Upside Down",
      "category": "tv",
      "description": "Plonge dans les secrets de Hawkins. Pour les vrais fans de la série !",
      "difficulty": "medium",
      "questions": [
        // 10 questions moyennes
      ]
    },
    {
      "title": "Stranger Things - Expert du Monde à l'Envers",
      "category": "tv",
      "description": "Seuls les vrais experts survivront à ce quiz ! Détails pointus et références cachées.",
      "difficulty": "hard",
      "questions": [
        // 10 questions difficiles
      ]
    }
  ]
}

Règles :
- Quiz 1 (easy) : acteurs, lieux, dates, faits évidents
- Quiz 2 (medium) : intrigue, personnages secondaires, citations, objets
- Quiz 3 (hard) : easter eggs, production, détails subtils, références années 80
- Pas de spoilers majeurs
- Varier l'ordre de la bonne réponse
- Explications <= 180 caractères

Réponds UNIQUEMENT en JSON valide.
```

---

## ✅ APRÈS LA GÉNÉRATION

1. **Copier le JSON** généré
2. **Valider** sur https://jsonlint.com
3. **Séparer** les 3 quiz en 3 fichiers :
   - `stranger-things-decouvre-hawkins.json`
   - `stranger-things-mysteres-upside-down.json`
   - `stranger-things-expert-monde-envers.json`
4. **Ajouter le champ "slug"** dans chaque fichier :
   ```json
   {
     "slug": "stranger-things-decouvre-hawkins",
     "title": "Stranger Things - Découvre Hawkins",
     ...
   }
   ```
5. **Placer** dans `data/fr/tv/`

---

## 🔧 SCRIPT RAPIDE POUR SÉPARER

```javascript
// Node.js script : split-quizzes.js
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('quizzes.json', 'utf-8'));

const slugs = [
  'stranger-things-decouvre-hawkins',
  'stranger-things-mysteres-upside-down',
  'stranger-things-expert-monde-envers'
];

data.quizzes.forEach((quiz, index) => {
  quiz.slug = slugs[index];
  fs.writeFileSync(
    `data/fr/tv/${slugs[index]}.json`,
    JSON.stringify(quiz, null, 2)
  );
  console.log(`✅ ${slugs[index]}.json créé`);
});
```

**Usage :**
```bash
node split-quizzes.js
```

---

## 📊 VÉRIFICATION MANUELLE

Checklist par quiz :
- [ ] Champ "slug" ajouté
- [ ] Exactement 10 questions
- [ ] 4 options par question
- [ ] correctAnswer entre 0 et 3
- [ ] Explications <= 180 caractères
- [ ] Pas de doublons entre quiz
- [ ] Difficulté cohérente avec les questions

---

**🎯 Prêt ? Copiez le prompt ci-dessus dans ChatGPT ou Claude et générez vos quiz !**

