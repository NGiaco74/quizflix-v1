# 🚀 Guide de Déploiement Netlify - Quizflix V1

## 📋 **Méthodes de Déploiement**

Trois méthodes possibles :
1. **Test local** avec `netlify dev` (pas de déploiement)
2. **Déploiement CLI** direct (sans GitHub)
3. **Déploiement GitHub** + Netlify (recommandé)

---

## 🧪 **MÉTHODE 1 : Test Local avec Netlify CLI**

### Prérequis
- Node.js installé
- Projet fonctionnel (`npm run dev` OK)

### Installation

```bash
# Installer Netlify CLI globalement
npm install -g netlify-cli

# Vérifier l'installation
netlify --version
```

### Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit"
```

### Tester avec Netlify Dev

```bash
# Lancer le serveur Netlify local
netlify dev
```

Le site sera accessible sur **http://localhost:8888**

✅ **Avantages** :
- Simule l'environnement Netlify
- Test des redirections
- Test des variables d'environnement
- Pas besoin de compte au début

---

## 🚀 **MÉTHODE 2 : Déploiement CLI Direct**

### Étape 1 : Se Connecter

```bash
netlify login
```

Une page de navigateur s'ouvre pour authentification.

### Étape 2 : Initialiser le Site

```bash
netlify init
```

Répondre aux questions :
```
? What would you like to do?
  → Create & configure a new site

? Team:
  → Choisir votre équipe (ou "Your Name's team")

? Site name (optional):
  → quizflix-v1 (ou laisser vide pour nom auto)

? Your build command (hugo build/yarn run build/etc):
  → npm run build

? Directory to deploy (blank for current dir):
  → .next
```

### Étape 3 : Builder

```bash
npm run build
```

### Étape 4 : Déployer en Test

```bash
# Déploiement de test (draft deploy)
netlify deploy

# Quand demandé :
? Publish directory: .next
```

Vous recevrez une URL de preview : `https://[random-id]--quizflix-v1.netlify.app`

### Étape 5 : Déployer en Production

Si le test est OK :

```bash
netlify deploy --prod
```

Votre site sera en ligne ! 🎉

---

## 🌟 **MÉTHODE 3 : Via GitHub (Recommandé)**

Cette méthode offre le CI/CD automatique (déploiement à chaque push).

### Étape 1 : Préparer Git

```bash
# Dans le dossier Quizz

# Initialiser git
git init

# Créer un .gitignore (déjà présent dans votre projet)

# Premier commit
git add .
git commit -m "Initial commit - Quizflix V1"

# Créer la branche main
git branch -M main
```

### Étape 2 : Créer le Dépôt GitHub

1. **Aller sur GitHub** : https://github.com
2. **Cliquer** sur le bouton **"New"** (ou icône +)
3. **Configurer** :
   - Repository name : `quizflix-v1`
   - Description : "Plateforme de quiz films, séries et jeux vidéo"
   - Visibilité : Public ou Private (au choix)
   - ❌ **NE PAS** cocher "Add a README file"
   - ❌ **NE PAS** ajouter .gitignore
   - ❌ **NE PAS** ajouter de licence
4. **Cliquer** "Create repository"

### Étape 3 : Lier et Pusher

GitHub affiche les commandes à exécuter :

```bash
# Ajouter le remote (remplacer VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/quizflix-v1.git

# Pusher le code
git push -u origin main
```

Si demandé, entrer vos identifiants GitHub.

### Étape 4 : Connecter à Netlify

1. **Aller sur Netlify** : https://app.netlify.com
2. **Se connecter** (ou créer un compte gratuit)
3. **Cliquer** "Add new site" → "Import an existing project"
4. **Choisir** "Deploy with GitHub"
5. **Autoriser** Netlify à accéder à GitHub
6. **Sélectionner** le dépôt `quizflix-v1`
7. **Configurer** le build :

```
Branch to deploy: main
Build command: npm run build
Publish directory: .next
```

8. **Variables d'environnement** (optionnel) :
   - Cliquer "Show advanced"
   - Ajouter : `NEXT_PUBLIC_BASE_URL` = `https://votre-site.netlify.app`

9. **Cliquer** "Deploy site"

### Étape 5 : Attendre le Déploiement

Netlify va :
- ✅ Cloner votre dépôt
- ✅ Installer les dépendances (`npm install`)
- ✅ Builder le projet (`npm run build`)
- ✅ Déployer le site
- ✅ Générer une URL : `https://[random-name].netlify.app`

⏱️ Durée : ~2-3 minutes

### Étape 6 : Personnaliser le Nom de Domaine

1. **Dans Netlify**, aller sur votre site
2. **Cliquer** "Site settings"
3. **Cliquer** "Change site name"
4. **Entrer** : `quizflix-v1` (ou autre nom disponible)
5. **Sauvegarder**

Votre site sera accessible sur : `https://quizflix-v1.netlify.app`

---

## 🔧 **Configuration Avancée**

### Variables d'Environnement

Dans Netlify dashboard :
1. Site settings → Environment variables
2. Add a variable :
   - Key : `NEXT_PUBLIC_BASE_URL`
   - Value : `https://quizflix-v1.netlify.app`

### Domaine Personnalisé (Optionnel)

Si vous avez un domaine (ex: `quizflix.com`) :
1. Site settings → Domain management
2. Add custom domain
3. Suivre les instructions DNS

---

## 🎯 **Déploiement Automatique (CI/CD)**

Avec la méthode GitHub, chaque push déclenche un déploiement :

```bash
# Faire des modifications dans votre code
# Par exemple, ajouter un nouveau quiz

# Commiter
git add .
git commit -m "Ajout quiz Harry Potter"

# Pusher
git push

# Netlify déploie automatiquement ! 🎉
```

Vous recevrez une notification par email quand c'est en ligne.

---

## 📊 **Commandes Netlify CLI Utiles**

```bash
# Voir le statut du site
netlify status

# Ouvrir le site en ligne
netlify open

# Ouvrir le dashboard Netlify
netlify open:admin

# Voir les logs de déploiement
netlify watch

# Lister vos sites
netlify sites:list

# Lier un dépôt existant
netlify link
```

---

## ✅ **Checklist de Déploiement**

### Avant de déployer

- [ ] `npm install` fonctionne
- [ ] `npm run dev` fonctionne
- [ ] `npm run build` fonctionne sans erreur
- [ ] Tests manuels passés
- [ ] Fichier `netlify.toml` créé
- [ ] Git initialisé et committé

### Pour GitHub + Netlify

- [ ] Compte GitHub créé
- [ ] Dépôt GitHub créé
- [ ] Code pushé sur GitHub
- [ ] Compte Netlify créé
- [ ] Site connecté à GitHub
- [ ] Build settings configurés
- [ ] Premier déploiement réussi

### Après déploiement

- [ ] Site accessible en ligne
- [ ] Toutes les pages fonctionnent
- [ ] Quiz jouables
- [ ] Changement de langue OK
- [ ] Images OG générées
- [ ] SEO vérifié (robots.txt, sitemap)

---

## 🐛 **Dépannage**

### ❌ Build Failed

**Erreur** : "Build script returned non-zero exit code"

**Solution** :
```bash
# Tester le build localement
npm run build

# Vérifier les erreurs TypeScript
npm run lint

# Corriger les erreurs
# Commiter et pusher
```

### ❌ Page 404 sur les routes

**Problème** : Les routes `/fr/quiz/...` donnent 404

**Solution** : Vérifier que `netlify.toml` contient :
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### ❌ Variables d'environnement manquantes

**Problème** : `NEXT_PUBLIC_BASE_URL` non définie

**Solution** :
1. Netlify dashboard → Site settings
2. Environment variables → Add variable
3. Redéployer le site

### ❌ Erreur "Function not found"

**Problème** : Next.js a besoin de `@netlify/plugin-nextjs`

**Solution** : Vérifier `netlify.toml` :
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 📱 **Tester le Site Déployé**

Une fois en ligne, tester :

1. **Pages principales** :
   - ✅ https://votre-site.netlify.app/fr
   - ✅ https://votre-site.netlify.app/en
   - ✅ https://votre-site.netlify.app/fr/jeux-video

2. **Quiz** :
   - ✅ Jouer à un quiz complet
   - ✅ Voir le résultat

3. **SEO** :
   - ✅ https://votre-site.netlify.app/robots.txt
   - ✅ https://votre-site.netlify.app/sitemap.xml

4. **OG Images** :
   - ✅ https://votre-site.netlify.app/api/og?title=Test

5. **Mobile** :
   - ✅ Tester sur smartphone réel

---

## 🚀 **Workflow Recommandé**

```bash
# 1. Développement local
npm run dev

# 2. Tester localement avec Netlify
netlify dev

# 3. Faire vos modifications
# ... éditer les fichiers ...

# 4. Commiter
git add .
git commit -m "Description des changements"

# 5. Pusher (déclenche le déploiement)
git push

# 6. Attendre le déploiement (2-3 min)

# 7. Vérifier en ligne
netlify open
```

---

## 🎉 **Félicitations !**

Une fois déployé, votre site sera :
- ✅ Accessible 24/7
- ✅ HTTPS automatique
- ✅ CDN mondial Netlify
- ✅ CI/CD automatique (si GitHub)
- ✅ Gratuit (100 GB/mois)

**URL de partage** : `https://quizflix-v1.netlify.app`

---

## 📞 **Ressources**

- **Netlify Docs** : https://docs.netlify.com
- **Next.js on Netlify** : https://docs.netlify.com/integrations/frameworks/next-js/
- **Netlify CLI** : https://cli.netlify.com

---

**Besoin d'aide ?** Consultez la documentation Netlify ou ouvrez une issue sur GitHub !

