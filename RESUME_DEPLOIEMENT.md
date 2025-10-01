# 🚀 Résumé : GitHub → Netlify

## 📋 CHECKLIST RAPIDE

### ✅ PARTIE 1 : GITHUB (5 minutes)

**1. Créer le dépôt**
- Aller sur https://github.com/new
- Nom : `quizflix-v1`
- Ne rien cocher
- Cliquer "Create repository"

**2. Lier et pusher**
```bash
# Remplacer VOTRE-USERNAME par votre username GitHub
git remote add origin https://github.com/VOTRE-USERNAME/quizflix-v1.git
git push -u origin main
```

**3. Vérifier**
- Aller sur `https://github.com/VOTRE-USERNAME/quizflix-v1`
- Vous devez voir vos 58 fichiers ✓

---

### ✅ PARTIE 2 : NETLIFY (5 minutes)

**1. Aller sur Netlify**
- https://app.netlify.com
- Se connecter avec GitHub

**2. Importer le projet**
- "Add new site" → "Import from GitHub"
- Sélectionner `quizflix-v1`

**3. Configurer**
```
Build command: npm run build
Publish directory: .next
```

**4. Déployer**
- Cliquer "Deploy site"
- Attendre 2-3 minutes
- C'est en ligne ! 🎉

**5. Personnaliser l'URL**
- Site settings → Change site name
- Nom : `quizflix-v1`
- Nouvelle URL : `https://quizflix-v1.netlify.app`

---

## 🎯 CE QUI SE PASSE ENSUITE

À chaque fois que vous faites un `git push` :
- ✅ Netlify détecte le changement
- ✅ Rebuilde le site automatiquement
- ✅ Déploie la nouvelle version
- ✅ Vous recevez un email de confirmation

---

## 📚 GUIDES DÉTAILLÉS

| Si vous bloquez | Consulter |
|-----------------|-----------|
| Problème avec GitHub | `COMMANDES_GITHUB.md` |
| Problème avec Netlify | `INSTRUCTIONS_NETLIFY.md` |
| Erreur de build | `DEPLOY_NETLIFY.md` (section Dépannage) |

---

## ⚡ COMMANDES UTILES

```bash
# Voir le statut Git
git status

# Voir les remotes
git remote -v

# Faire une mise à jour
git add .
git commit -m "Description"
git push
```

---

**🎉 Bon déploiement !**

