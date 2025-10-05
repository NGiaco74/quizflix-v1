# Instructions d'importation des workflows QuizzFlix

## 📁 Fichiers disponibles

Dans le dossier `C:\Users\n.giacometti\Documents\Perso\CursorProjects\Quizz\n8n-workflows`, vous trouverez :

1. **QuizzFlix-Planificateur-Hebdomadaire.json** - Workflow de planification hebdomadaire
2. **QuizzFlix-Generateur-Quotidien.json** - Workflow de génération quotidienne
3. **prompts/** - Dossier avec les prompts LLM
4. **schema/** - Dossier avec le schéma JSON de validation

## 🔄 Comment importer les workflows

### Méthode 1 : Import via l'interface n8n

1. **Ouvrir n8n** dans votre navigateur (http://localhost:5678)
2. **Cliquer sur le bouton "+"** en haut à gauche pour créer un nouveau workflow
3. **Cliquer sur "Import from file"** ou "Import from URL"
4. **Sélectionner le fichier JSON** correspondant :
   - `QuizzFlix-Planificateur-Hebdomadaire.json`
   - `QuizzFlix-Generateur-Quotidien.json`
5. **Cliquer sur "Import"**
6. **Sauvegarder** le workflow avec `Ctrl+S`

### Méthode 2 : Import via glisser-déposer

1. **Ouvrir n8n** dans votre navigateur
2. **Créer un nouveau workflow** (+)
3. **Glisser-déposer** le fichier JSON directement dans l'éditeur n8n
4. **Sauvegarder** le workflow

### Méthode 3 : Import via le menu

1. **Dans n8n**, aller dans le menu principal
2. **Sélectionner "Import"** ou "Workflows" > "Import"
3. **Choisir le fichier JSON**
4. **Confirmer l'importation**

## ⚙️ Configuration après import

### 1. Variables d'environnement
Ajouter ces variables dans les paramètres n8n :
```
TMDB_API_KEY=votre_clé_api_tmdb
OPENAI_API_KEY=votre_clé_api_openai
```

### 2. Configuration des nœuds
- **Vérifier les connexions** entre les nœuds
- **Configurer les credentials** OpenAI si nécessaire
- **Tester les expressions** dans les nœuds

### 3. Correction du prompt IA
Dans le workflow "Générateur Quotidien", nœud "Générer Quiz avec IA" :
- Ouvrir le nœud
- Dans le champ "Content" du message utilisateur
- Ajouter `=` au début de l'expression si ce n'est pas déjà fait

### 4. Activation des workflows
- **Basculer l'interrupteur** "Inactive" → "Active"
- **Sauvegarder** chaque workflow

## 🧪 Test des workflows

### Test du Planificateur Hebdomadaire
1. **Exécution manuelle** : Cliquer sur "Execute Workflow"
2. **Vérifier** que le fichier `/tmp/quizflix_data/quiz_plan.json` est créé
3. **Contrôler** le contenu du plan généré

### Test du Générateur Quotidien
1. **S'assurer** qu'un plan hebdomadaire existe
2. **Exécution manuelle** du workflow
3. **Vérifier** la génération des quizz dans `/tmp/quizflix_data/fr/`

## 🔧 Dépannage

### Erreurs courantes
- **"Plan hebdomadaire non trouvé"** : Exécuter d'abord le planificateur
- **Erreur OpenAI** : Vérifier la clé API et les credentials
- **Erreur TMDb** : Vérifier la clé API TMDb
- **Erreurs de validation** : Vérifier le format JSON généré

### Logs
- **Consulter les logs** n8n pour diagnostiquer les erreurs
- **Vérifier les exécutions** dans l'onglet "Executions"

## 📋 Checklist finale

- [ ] Workflows importés avec succès
- [ ] Variables d'environnement configurées
- [ ] Credentials OpenAI configurés
- [ ] Prompt IA corrigé (ajout du `=`)
- [ ] Workflows activés
- [ ] Tests d'exécution réussis
- [ ] Plan hebdomadaire généré
- [ ] Quizz générés correctement

## 🚀 Prochaines étapes

1. **Automatiser** la publication sur les réseaux sociaux
2. **Intégrer** avec Supabase/PostgreSQL
3. **Configurer** l'auto-publication des quizz
4. **Monitorer** les performances et ajuster selon les besoins

---

**Note** : Ces workflows génèrent 21 quizz par semaine (3 par jour × 7 jours) basés sur les tendances TMDb actuelles.
