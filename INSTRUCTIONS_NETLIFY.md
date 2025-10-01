# 🌐 Instructions Netlify - Étape par Étape

## ✅ Prérequis

Avant de commencer, assurez-vous que :
- [x] Git est initialisé (déjà fait ✓)
- [x] Code pushé sur GitHub
- [x] Vous pouvez voir votre dépôt sur `https://github.com/VOTRE-USERNAME/quizflix-v1`

---

## 🚀 ÉTAPE 1 : Créer un Compte Netlify (2 minutes)

### Si vous n'avez pas encore de compte :

1. **Aller sur** : https://app.netlify.com/signup
2. **Cliquer** sur "GitHub" (recommandé pour l'intégration)
3. **Autoriser** Netlify à accéder à GitHub
4. **Compte créé** automatiquement !

### Si vous avez déjà un compte :

1. **Aller sur** : https://app.netlify.com
2. **Se connecter** avec GitHub

---

## 📦 ÉTAPE 2 : Importer le Projet (3 minutes)

### 1. Ajouter un Nouveau Site

Sur le dashboard Netlify, cliquer sur :

**"Add new site"** → **"Import an existing project"**

### 2. Choisir GitHub

Cliquer sur **"Deploy with GitHub"**

### 3. Autoriser Netlify (première fois seulement)

Si c'est votre première fois :
- Une fenêtre GitHub s'ouvre
- **Autoriser** Netlify à accéder à vos dépôts
- Vous pouvez choisir :
  - **All repositories** (tous les dépôts)
  - **Only select repositories** → sélectionner `quizflix-v1`

### 4. Sélectionner le Dépôt

Dans la liste, cliquer sur **`quizflix-v1`**

---

## ⚙️ ÉTAPE 3 : Configurer le Build (1 minute)

Netlify va afficher un formulaire. Remplissez exactement comme ceci :

### Configuration du Site :

```
Branch to deploy
┌─────────────────────────┐
│ main                    │  ← Laisser "main"
└─────────────────────────┘

Build command
┌─────────────────────────┐
│ npm run build           │  ← IMPORTANT : Taper exactement ceci
└─────────────────────────┘

Publish directory
┌─────────────────────────┐
│ .next                   │  ← IMPORTANT : Taper ".next"
└─────────────────────────┘
```

### Variables d'Environnement (Optionnel mais Recommandé) :

Cliquer sur **"Show advanced"** puis **"New variable"** :

```
Key: NEXT_PUBLIC_BASE_URL
Value: https://votre-site.netlify.app
```

⚠️ Vous mettrez l'URL finale après le déploiement.

### Déployer !

Cliquer sur le gros bouton vert **"Deploy [nom-du-site]"**

---

## ⏳ ÉTAPE 4 : Attendre le Déploiement (2-3 minutes)

Netlify va maintenant :

1. **Cloner** votre dépôt GitHub
2. **Installer** les dépendances (`npm install`)
3. **Builder** le projet (`npm run build`)
4. **Déployer** le site

Vous verrez un écran avec les logs en temps réel :

```
Building site
├─ Cloning repository
├─ Installing dependencies
│  ├─ npm install (45s)
├─ Building site
│  ├─ npm run build (90s)
└─ Deploying site
   └─ Site is live! ✓
```

### En cas de succès :

Vous verrez : **"Site is live"** avec un lien vers votre site ! 🎉

URL temporaire : `https://[random-id].netlify.app`

### En cas d'erreur :

- Consulter les logs pour voir l'erreur
- Voir la section "Dépannage" ci-dessous

---

## 🎨 ÉTAPE 5 : Personnaliser l'URL (1 minute)

### Changer le Nom du Site :

1. Sur la page de votre site, cliquer **"Site settings"**
2. Dans la section "Site information", cliquer **"Change site name"**
3. Entrer : `quizflix-v1` (ou un autre nom disponible)
4. Cliquer **"Save"**

Votre nouvelle URL : **`https://quizflix-v1.netlify.app`** ✨

---

## ✅ ÉTAPE 6 : Vérifier le Site en Ligne (2 minutes)

### Tests à Effectuer :

1. **Ouvrir le site** : https://quizflix-v1.netlify.app
2. **Tester la home FR** : /fr
3. **Tester la home EN** : /en
4. **Jouer à un quiz complet**
5. **Changer de langue**
6. **Vérifier le résultat avec médaille**

### URLs à Tester :

```
✓ https://quizflix-v1.netlify.app/fr
✓ https://quizflix-v1.netlify.app/en
✓ https://quizflix-v1.netlify.app/fr/quiz/inception
✓ https://quizflix-v1.netlify.app/en/quiz/the-matrix
✓ https://quizflix-v1.netlify.app/robots.txt
✓ https://quizflix-v1.netlify.app/sitemap.xml
```

---

## 🔄 ÉTAPE 7 : Mettre à Jour la Variable d'Environnement

Maintenant que vous connaissez l'URL finale :

1. **Aller sur** Netlify Dashboard → Votre site
2. **Cliquer** "Site settings" → "Environment variables"
3. **Modifier** `NEXT_PUBLIC_BASE_URL`
4. **Valeur** : `https://quizflix-v1.netlify.app`
5. **Sauvegarder**
6. **Redéployer** : Cliquer "Deploys" → "Trigger deploy" → "Deploy site"

---

## 🎉 FÉLICITATIONS ! Votre Site est en Ligne !

### Informations du Site :

```
🌐 URL : https://quizflix-v1.netlify.app
📱 HTTPS : Activé automatiquement
🚀 CDN : Mondial (Netlify)
💾 Bande passante : 100 GB/mois (gratuit)
🔄 CI/CD : Automatique à chaque push
```

---

## 🔄 Workflow de Mise à Jour

Désormais, pour mettre à jour le site :

```bash
# 1. Faire vos modifications (ex: ajouter un quiz)

# 2. Commiter
git add .
git commit -m "Ajout quiz Harry Potter"

# 3. Pusher
git push

# 4. Netlify redéploie automatiquement ! ✨
```

Vous recevrez un email à chaque déploiement.

---

## 🐛 DÉPANNAGE

### ❌ Erreur "Build failed"

**Symptôme** : Le build échoue avec des erreurs

**Solutions** :

1. **Vérifier localement** :
```bash
npm install
npm run build
```

Si ça fonctionne en local, le problème vient de la config Netlify.

2. **Vérifier la config** :
- Build command : `npm run build`
- Publish directory : `.next`
- Node version : 18+ (Netlify utilise Node 18 par défaut)

3. **Voir les logs détaillés** :
- Dans Netlify, aller sur "Deploys" → cliquer sur le deploy raté
- Lire les logs d'erreur

### ❌ Erreur "Page not found" sur les routes

**Symptôme** : `/fr/quiz/inception` donne 404

**Solution** : Vérifier que `netlify.toml` existe à la racine (déjà fait ✓)

### ❌ Erreur "Function not found"

**Symptôme** : Les API routes ne fonctionnent pas

**Solution** : Vérifier que `@netlify/plugin-nextjs` est installé

```bash
npm install --save-dev @netlify/plugin-nextjs
git add package.json
git commit -m "Add Netlify Next.js plugin"
git push
```

### ❌ Images ou Assets manquants

**Symptôme** : Certaines images ne s'affichent pas

**Solution** : Vérifier les chemins des images (doivent être dans `/public`)

---

## 📊 Dashboard Netlify

Dans votre dashboard, vous avez accès à :

- **Overview** : Statistiques du site
- **Deploys** : Historique des déploiements
- **Site settings** : Configuration
- **Domain management** : Domaines personnalisés
- **Environment variables** : Variables d'env
- **Build & deploy** : Paramètres de build
- **Analytics** : Statistiques de visite (payant)

---

## 🌟 Fonctionnalités Netlify Gratuites

Avec le plan gratuit, vous avez :

- ✅ 100 GB de bande passante/mois
- ✅ 300 minutes de build/mois
- ✅ HTTPS automatique
- ✅ CDN mondial
- ✅ Déploiements illimités
- ✅ Aperçus de branches (branch deploys)
- ✅ Rollback instantané
- ✅ Formulaires (jusqu'à 100/mois)

---

## 🔗 Liens Utiles

- **Votre Dashboard** : https://app.netlify.com
- **Docs Netlify** : https://docs.netlify.com
- **Next.js sur Netlify** : https://docs.netlify.com/integrations/frameworks/next-js/
- **Support Netlify** : https://answers.netlify.com

---

## 🎯 Checklist Finale

- [ ] Compte Netlify créé
- [ ] Site importé depuis GitHub
- [ ] Build command : `npm run build` ✓
- [ ] Publish directory : `.next` ✓
- [ ] Premier déploiement réussi
- [ ] URL personnalisée définie
- [ ] Variable `NEXT_PUBLIC_BASE_URL` configurée
- [ ] Site testé en ligne (quiz fonctionnels)
- [ ] URLs SEO vérifiées (robots.txt, sitemap)

---

## 🎉 C'est Terminé !

Votre site Quizflix V1 est maintenant :
- ✅ En ligne 24/7
- ✅ Sécurisé (HTTPS)
- ✅ Rapide (CDN)
- ✅ Automatiquement mis à jour

**Partagez votre site** : `https://quizflix-v1.netlify.app` 🎊

---

**Besoin d'aide ?** Consultez **DEPLOY_NETLIFY.md** pour plus de détails !

