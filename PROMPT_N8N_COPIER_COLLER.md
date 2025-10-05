# 🎯 PROMPT N8N - STRANGER THINGS (3 QUIZ)

## 📋 À COPIER DANS LE NŒUD OPENAI

### **System Prompt** (Message Système)

```
Tu es un générateur de quiz expert sur les séries TV pour un public francophone. Tu produis des quiz de qualité avec différents niveaux de difficulté. Chaque quiz doit comporter exactement 10 questions, 4 choix, 1 bonne réponse et une explication courte (max 180 caractères) sans spoiler majeur. Tu réponds UNIQUEMENT en JSON valide, sans texte avant ou après.

Niveaux de difficulté :
- Facile (easy) : Questions sur les éléments visuels évidents, noms des acteurs principaux, lieux, dates, faits généraux
- Moyen (medium) : Questions sur l'intrigue, personnages secondaires, citations, relations, événements clés
- Difficile (hard) : Questions sur les détails subtils, easter eggs, références cachées, métadonnées de production

Format JSON requis :
{
  "quizzes": [
    {
      "title": "string",
      "category": "tv",
      "description": "string",
      "difficulty": "easy|medium|hard",
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": 0-3,
          "explanation": "string (max 180 caractères)"
        }
      ]
    }
  ]
}
```

---

### **User Prompt** (Message Utilisateur)

```
Génère 3 quiz complets sur la série **Stranger Things** en français avec les caractéristiques suivantes :

**Quiz 1 - Facile :**
- Titre : "Stranger Things - Découvre Hawkins"
- Difficulté : easy
- Description : "Teste tes connaissances de base sur Stranger Things. Parfait pour les nouveaux fans !"
- 10 questions sur : acteurs principaux, ville de Hawkins, Eleven, nourriture préférée, lieux emblématiques, année des saisons, personnages principaux, monstres connus

**Quiz 2 - Moyen :**
- Titre : "Stranger Things - Les Mystères de l'Upside Down"
- Difficulté : medium
- Description : "Plonge dans les secrets de Hawkins. Pour les vrais fans de la série !"
- 10 questions sur : Hawkins Lab, le Mind Flayer, relations entre personnages, citations mémorables, événements clés par saison, personnages secondaires, objets importants, rôle de Dungeons & Dragons

**Quiz 3 - Difficile :**
- Titre : "Stranger Things - Expert du Monde à l'Envers"
- Difficulté : hard
- Description : "Seuls les vrais experts survivront à ce quiz ! Détails pointus et références cachées."
- 10 questions sur : easter eggs, références années 80, détails de production (Duffer Brothers), signification des noms, petits détails visuels, musique spécifique, numéros d'épisodes, théories confirmées, caméos

**Règles strictes :**
- Exactement 10 questions par quiz (30 questions au total)
- Pas de spoilers majeurs de fin de saison
- Explications <= 180 caractères
- Questions variées et intéressantes
- Éviter les questions trop similaires entre les 3 quiz
- Index correctAnswer entre 0 et 3
- Mélanger l'ordre de la bonne réponse (pas toujours en premier)

Réponds UNIQUEMENT avec le JSON valide contenant les 3 quiz. Pas de texte avant ou après.
```

---

## 🔧 **CONFIGURATION N8N**

### **Nœud OpenAI Chat**

| Paramètre | Valeur |
|-----------|--------|
| **Resource** | Message |
| **Operation** | Create |
| **Model** | gpt-4 ou gpt-4-turbo (recommandé) |
| **Temperature** | 0.7 |
| **Max Tokens** | 4000 |
| **System Message** | Copier le System Prompt ci-dessus |
| **User Message** | Copier le User Prompt ci-dessus |
| **Response Format** | JSON Object (si disponible) |

---

## 📤 **POST-TRAITEMENT**

### **Nœud "Split In Batches" OU "Item Lists"**

Après la génération, vous devrez :

1. **Parser le JSON** (nœud JSON)
   ```javascript
   // Expression n8n
   {{ JSON.parse($json.choices[0].message.content) }}
   ```

2. **Split les 3 quiz** (nœud Split In Batches ou Item Lists)
   ```javascript
   // Accéder au tableau quizzes
   {{ $json.quizzes }}
   ```

3. **Ajouter le slug** (nœud Set)
   ```javascript
   // Quiz 1
   slug: "stranger-things-decouvre-hawkins"
   
   // Quiz 2
   slug: "stranger-things-mysteres-upside-down"
   
   // Quiz 3
   slug: "stranger-things-expert-monde-envers"
   ```

4. **Sauvegarder** dans les fichiers correspondants :
   - `data/fr/tv/stranger-things-decouvre-hawkins.json`
   - `data/fr/tv/stranger-things-mysteres-upside-down.json`
   - `data/fr/tv/stranger-things-expert-monde-envers.json`

---

## ✅ **VALIDATION**

Après génération, vérifier :

- [ ] 3 quiz générés
- [ ] Chaque quiz a exactement 10 questions
- [ ] Chaque question a 4 options
- [ ] correctAnswer est entre 0 et 3
- [ ] Explications <= 180 caractères
- [ ] Pas de texte avant/après le JSON
- [ ] Format valide selon le schema

---

## 🎯 **EXEMPLE DE SORTIE ATTENDUE**

```json
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
        // ... 9 autres questions
      ]
    },
    {
      "title": "Stranger Things - Les Mystères de l'Upside Down",
      "category": "tv",
      "description": "Plonge dans les secrets de Hawkins. Pour les vrais fans de la série !",
      "difficulty": "medium",
      "questions": [
        // 10 questions medium
      ]
    },
    {
      "title": "Stranger Things - Expert du Monde à l'Envers",
      "category": "tv",
      "description": "Seuls les vrais experts survivront à ce quiz ! Détails pointus et références cachées.",
      "difficulty": "hard",
      "questions": [
        // 10 questions hard
      ]
    }
  ]
}
```

---

## 🚀 **WORKFLOW N8N COMPLET**

```
┌─────────────────┐
│  Manual Trigger │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  OpenAI Chat    │  ← Copier les prompts ici
│  (GPT-4)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  JSON Parse     │  ← Parser la réponse
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Split Quizzes  │  ← Séparer les 3 quiz
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Add Slug       │  ← Ajouter slug unique
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Write File     │  ← Sauvegarder JSON
└─────────────────┘
```

---

## 💡 **CONSEILS**

1. **Si le JSON est tronqué** : Augmenter Max Tokens à 6000
2. **Si erreurs de format** : Vérifier que Response Format = JSON Object
3. **Si questions répétitives** : Augmenter Temperature à 0.8-0.9
4. **Si trop facile/difficile** : Ajuster les exemples dans le prompt

---

## 📞 **BESOIN D'AIDE ?**

Consultez :
- `n8n-workflows/README.md` - Guide complet
- `n8n-workflows/QuizzFlix-AI-Architecture-README.md` - Architecture
- `n8n-workflows/schema/quiz-json-schema.json` - Schema de validation

---

**🎉 Prêt à générer vos 3 quiz Stranger Things ! Copiez-collez les prompts dans n8n et lancez !**

