# 🚀 Netlify CLI - Aide-Mémoire

## ✅ Installation et Configuration

```bash
# Installer (déjà fait ✓)
npm install -g netlify-cli

# Vérifier la version
netlify --version

# Se connecter (déjà fait ✓)
netlify login

# Voir le statut
netlify status

# Lier le projet au site Netlify
netlify link
```

---

## 🧪 Développement et Tests

```bash
# Lancer le serveur de dev Netlify
netlify dev
# → http://localhost:8888

# Lancer le serveur Next.js standard (plus rapide)
npm run dev
# → http://localhost:3000

# Builder localement
netlify build

# Tester le build Next.js
npm run build
```

---

## 🚀 Déploiement

```bash
# Méthode 1 : Automatique (recommandée)
git add .
git commit -m "Description des changements"
git push
# Netlify détecte et déploie automatiquement !

# Méthode 2 : Déploiement manuel de test
netlify deploy
# Crée une URL de preview

# Méthode 3 : Déploiement manuel en production
netlify deploy --prod
# Déploie directement en production
```

---

## 📊 Gestion du Site

```bash
# Ouvrir le site en ligne
netlify open

# Ouvrir le dashboard Netlify
netlify open:admin

# Voir les déploiements en temps réel
netlify watch

# Voir les logs
netlify logs

# Lister tous vos sites
netlify sites:list
```

---

## 🔐 Variables d'Environnement

```bash
# Lister toutes les variables
netlify env:list

# Ajouter une variable
netlify env:set NEXT_PUBLIC_BASE_URL https://votre-site.netlify.app

# Voir une variable
netlify env:get NEXT_PUBLIC_BASE_URL

# Importer depuis un fichier .env
netlify env:import .env
```

---

## 🔗 Lien et Configuration

```bash
# Lier à un site existant
netlify link

# Délier
netlify unlink

# Changer de site
netlify switch

# Voir la configuration du site
netlify api getSite --data '{"site_id": "YOUR_SITE_ID"}'
```

---

## 🆘 Aide et Documentation

```bash
# Aide générale
netlify help

# Aide sur une commande spécifique
netlify deploy --help

# Voir toutes les commandes
netlify help --list
```

---

## 🎯 Workflows Courants

### Développement Local

```bash
# 1. Développer
npm run dev

# 2. Tester
# ... faire vos modifications ...

# 3. Vérifier le build
npm run build

# 4. Commiter
git add .
git commit -m "Ajout feature X"

# 5. Pusher (déploiement auto)
git push
```

### Déploiement Manuel d'Urgence

```bash
# 1. Builder
npm run build

# 2. Déployer
netlify deploy --prod
```

### Debug d'un Problème de Build

```bash
# 1. Tester le build localement
netlify build

# 2. Voir les logs en ligne
netlify logs

# 3. Ouvrir le dashboard pour voir les détails
netlify open:admin
```

---

## 🔧 Configuration Avancée

### Fichier netlify.toml (déjà créé ✓)

Votre fichier `netlify.toml` contient :
- Build command
- Publish directory
- Redirections
- Headers de sécurité

### Fonctions Netlify (Optionnel)

```bash
# Créer une fonction
netlify functions:create my-function

# Lister les fonctions
netlify functions:list

# Invoquer une fonction localement
netlify functions:invoke my-function
```

---

## 📱 Commandes Pratiques

```bash
# Voir l'URL du site
netlify status | grep "Website URL"

# Copier l'URL dans le presse-papier (Windows)
netlify status | findstr "Website URL" | clip

# Vérifier si le site est accessible
curl https://votre-site.netlify.app
```

---

## 🎉 Commandes Favorites

```bash
# Top 5 des commandes les plus utiles :

1. netlify dev          # Tester localement
2. netlify open         # Ouvrir le site
3. netlify open:admin   # Ouvrir le dashboard
4. netlify deploy --prod # Déployer en production
5. netlify status       # Voir les infos du site
```

---

## 📊 Informations de Votre Projet

```
Compte : Nicolas Giacometti (ncls.giacometti@gmail.com)
Team : ngiacometti
Dépôt : https://github.com/NGiaco74/quizflix-v1
CLI Version : 23.9.1
Node Version : v22.14.0
```

---

## 🔗 Ressources

- **Docs Netlify CLI** : https://cli.netlify.com
- **Commandes** : https://cli.netlify.com/commands
- **Community** : https://answers.netlify.com

---

**💡 Conseil** : Pour la plupart des cas, utilisez le workflow automatique (git push) !

