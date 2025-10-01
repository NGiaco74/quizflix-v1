# 🔗 Commandes pour Lier à GitHub

## ⚠️ IMPORTANT : Remplacer VOTRE-USERNAME

Dans les commandes ci-dessous, **remplacez `VOTRE-USERNAME`** par votre nom d'utilisateur GitHub.

Par exemple, si votre username est `n-giacometti`, la commande devient :
```bash
git remote add origin https://github.com/n-giacometti/quizflix-v1.git
```

---

## 📝 ÉTAPE 1 : Copier ces commandes

### Version HTTPS (recommandée pour débuter) :

```bash
# Lier le dépôt distant (remplacer VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/quizflix-v1.git

# Pusher le code
git push -u origin main
```

### Version SSH (si vous avez configuré SSH) :

```bash
# Lier le dépôt distant (remplacer VOTRE-USERNAME)
git remote add origin git@github.com:VOTRE-USERNAME/quizflix-v1.git

# Pusher le code
git push -u origin main
```

---

## 🔐 Authentification

Lors du `git push`, GitHub va demander :

### Si HTTPS :
- **Username** : votre nom d'utilisateur GitHub
- **Password** : ⚠️ **PAS votre mot de passe** mais un **Personal Access Token**

#### Créer un Personal Access Token :
1. Aller sur : https://github.com/settings/tokens
2. Cliquer "Generate new token" → "Generate new token (classic)"
3. Note : "Quizflix deployment"
4. Cocher : `repo` (Full control of private repositories)
5. Cliquer "Generate token"
6. **COPIER** le token (vous ne le reverrez plus !)
7. **COLLER** ce token comme mot de passe

### Si SSH :
Pas d'authentification demandée (si SSH déjà configuré).

---

## ✅ Résultat Attendu

Après `git push`, vous devriez voir :

```
Enumerating objects: 60, done.
Counting objects: 100% (60/60), done.
Delta compression using up to 8 threads
Compressing objects: 100% (55/55), done.
Writing objects: 100% (60/60), 65.21 KiB | 3.26 MiB/s, done.
Total 60 (delta 1), reused 0 (delta 0), pack-reused 0
To https://github.com/VOTRE-USERNAME/quizflix-v1.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🎉 Vérification

Allez sur : `https://github.com/VOTRE-USERNAME/quizflix-v1`

Vous devriez voir :
- ✅ Tous vos fichiers
- ✅ Le README.md affiché
- ✅ 58 fichiers
- ✅ Votre commit "Initial commit - Quizflix V1 Frontend Complete"

---

## 🚀 PROCHAINE ÉTAPE : Netlify

Une fois que votre code est sur GitHub, suivez les instructions dans le fichier **INSTRUCTIONS_NETLIFY.md**

