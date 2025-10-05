# Workflows n8n QuizzFlix

Ce dossier contient les workflows n8n pour automatiser la génération de quizz QuizzFlix.

## Workflows créés

### 1. QuizzFlix - Planificateur Hebdomadaire (ID: xYelmmsiOyFAkz1n)
- **Déclencheur** : Chaque lundi à 06:00 (Europe/Paris)
- **Fonction** : Génère un plan de 7 sujets basé sur les tendances TMDb
- **Sortie** : Fichier JSON avec les sujets de la semaine

### 2. QuizzFlix - Générateur Quotidien (ID: emED9Hgobx9c3k81)
- **Déclencheur** : 3 fois par jour à 06:05, 12:05 et 18:05 (Europe/Paris)
- **Fonction** : Génère 3 quizz par jour (facile, moyen, difficile)
- **Sortie** : Fichiers JSON des quizz + images OG + posts sociaux

## Configuration requise

### Variables d'environnement n8n
```bash
TMDB_API_KEY=votre_clé_api_tmdb
OPENAI_API_KEY=votre_clé_api_openai
```

### Correction nécessaire
Le workflow "Générateur Quotidien" a une erreur d'expression dans le nœud "Générer Quiz avec IA". 

**Correction manuelle :**
1. Ouvrir le workflow dans n8n
2. Sélectionner le nœud "Générer Quiz avec IA"
3. Dans le champ "Content" du message utilisateur, ajouter un `=` au début :
   ```
   =Sujet: {{ $json.title }} (ID: {{ $json.id }}, type: {{ $json.media_type }}). Niveau: {{ $json.difficulty }}. Langue: fr. Génère un quizz conforme aux exigences : {{ $json.target_questions }} questions, 4 choix, 1 réponse correcte, une explication courte (<=180 caractères), sans spoiler majeur. Mélange les difficultés selon le niveau demandé. Réponds uniquement en JSON valide selon le schéma QuizzFlix.
   ```

## Structure des fichiers

```
n8n-workflows/
├── prompts/
│   ├── quiz-generation-system.txt    # Prompt système pour l'IA
│   └── quiz-generation-user.txt      # Template du prompt utilisateur
├── schema/
│   └── quiz-json-schema.json         # Schéma JSON pour validation
└── README.md                         # Ce fichier
```

## Utilisation

1. **Activer le planificateur hebdomadaire** : Le workflow se déclenchera automatiquement chaque lundi
2. **Activer le générateur quotidien** : Le workflow se déclenchera 3 fois par jour
3. **Surveiller les logs** : Les workflows loggent leurs progrès dans la console n8n

## Données générées

- **Plan hebdomadaire** : `/tmp/quizflix_data/quiz_plan.json`
- **Quizz** : `/tmp/quizflix_data/fr/{category}/{slug}.json`
- **Images OG** : Générées via l'API `/api/og` de QuizzFlix
- **Posts sociaux** : Prépares pour publication automatique

## Prochaines étapes

1. Corriger l'erreur d'expression mentionnée ci-dessus
2. Configurer les variables d'environnement
3. Tester les workflows avec des exécutions manuelles
4. Activer les workflows pour l'automatisation complète
5. Intégrer avec Supabase/PostgreSQL pour la persistance
6. Configurer l'auto-publication sur les réseaux sociaux
