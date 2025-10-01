# ⚡ Netlify - Démarrage Rapide (5 minutes)

## 🎯 **Objectif**

Déployer Quizflix V1 sur Netlify en 5 minutes chrono !

---

## 🚀 **ÉTAPE PAR ÉTAPE**

### 1️⃣ **Initialiser Git** (30 secondes)

```bash
git init
git add .
git commit -m "Initial commit - Quizflix V1"
git branch -M main
```

---

### 2️⃣ **Créer le Dépôt GitHub** (1 minute)

1. Aller sur https://github.com/new
2. Nom du dépôt : `quizflix-v1`
3. **NE PAS** cocher "Add README"
4. Cliquer "Create repository"

---

### 3️⃣ **Pusher le Code** (30 secondes)

Copier-coller les commandes données par GitHub :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/quizflix-v1.git
git push -u origin main
```

---

### 4️⃣ **Déployer sur Netlify** (2 minutes)

1. Aller sur https://app.netlify.com
2. Cliquer **"Add new site"** → **"Import an existing project"**
3. Choisir **"Deploy with GitHub"**
4. Autoriser Netlify
5. Sélectionner **`quizflix-v1`**
6. Configuration :
   ```
   Build command: npm run build
   Publish directory: .next
   ```
7. Cliquer **"Deploy site"**

---

### 5️⃣ **Attendre** (2-3 minutes)

Netlify installe, build et déploie automatiquement.

✅ **C'est en ligne !** 🎉

Votre site : `https://[random-name].netlify.app`

---

## 🎨 **Personnaliser l'URL** (optionnel)

1. Dans Netlify : **Site settings** → **Change site name**
2. Entrer : `quizflix-v1`
3. Votre site : `https://quizflix-v1.netlify.app`

---

## 🔄 **Mettre à Jour le Site**

Pour chaque modification :

```bash
git add .
git commit -m "Description du changement"
git push
```

Netlify redéploie automatiquement ! 🚀

---

## 📋 **Commandes Résumées**

```bash
# Installation locale (une fois)
npm install

# Test local
npm run dev

# Git + Déploiement
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/quizflix-v1.git
git push -u origin main

# Puis : connecter sur https://app.netlify.com
```

---

## ✅ **Checklist**

- [ ] Git initialisé
- [ ] Code committé
- [ ] Dépôt GitHub créé
- [ ] Code pushé
- [ ] Site connecté à Netlify
- [ ] Premier déploiement réussi
- [ ] Site accessible en ligne
- [ ] Quiz testés en ligne

---

## 🎯 **Résultat Attendu**

Votre site sera accessible 24/7 avec :
- ✅ HTTPS automatique
- ✅ CDN mondial
- ✅ Déploiement automatique à chaque push
- ✅ 100 GB gratuit/mois

---

## 🐛 **Problème ?**

Consultez **DEPLOY_NETLIFY.md** pour le guide complet avec dépannage !

---

**🎉 Bon déploiement !**

