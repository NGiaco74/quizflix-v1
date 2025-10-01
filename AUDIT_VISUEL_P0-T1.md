# 🔍 Audit Visuel P0-T1 - Quizzflix V1

**Date :** 1er octobre 2025  
**Version :** MVP-1  
**URL Local :** http://localhost:3001/fr  
**URL Netlify :** À vérifier sur https://app.netlify.com

---

## 📋 **CHECKLIST D'AUDIT**

### ✅ **1. NAVIGATION & STRUCTURE**

#### **Header**
- [ ] Logo "Quizzflix" visible et cliquable
- [ ] Liens de navigation (Accueil, Jeux Vidéo) fonctionnels
- [ ] Sélecteur de langue (FR/EN) accessible et fonctionnel
- [ ] Header sticky sur scroll (ou comportement défini)
- [ ] Contraste texte/fond AA (4.5:1 minimum)

#### **Footer**
- [ ] Copyright visible
- [ ] Liens légaux (Confidentialité, Cookies) cliquables
- [ ] Footer ne masque pas de contenu important

#### **Pages principales**
- [ ] Home FR (/)
- [ ] Home EN (/en)
- [ ] Page Quiz (/fr/quiz/inception)
- [ ] Page Résultat (/fr/result/inception?score=8)
- [ ] Page Jeux Vidéo (/fr/jeux-video)
- [ ] Page Games (/en/games)
- [ ] Page Privacy (/fr/legal/privacy)
- [ ] Page Cookies (/fr/legal/cookies)

---

### 📱 **2. MOBILE-FIRST (Viewport 375x667 - iPhone SE)**

#### **Home - 6 cartes visibles en ≤ 2 scrolls**
- [ ] Test sur mobile réel ou DevTools (375px)
- [ ] Compter les scrolls nécessaires pour voir les 6 cartes
- [ ] **Attendu :** Maximum 2 scrolls verticaux
- [ ] Espacement suffisant entre les cartes (>=12px)

#### **Cartes Quiz**
- [ ] Titre lisible (min 16px)
- [ ] Description visible et tronquée si besoin
- [ ] Badge catégorie visible
- [ ] CTA "Commencer le quizz" clair
- [ ] Taille tap >= 44x44px sur toute la carte

#### **Quiz - Questions**
- [ ] Question lisible (texte >=16px)
- [ ] 4 boutons de réponse bien espacés (>=8px entre)
- [ ] Boutons >= 44px de hauteur
- [ ] Barre de progression visible
- [ ] Feedback (vert/rouge) visible après sélection
- [ ] Explication lisible après réponse
- [ ] Bouton "Question suivante" >= 44x44px

#### **Résultat**
- [ ] Score affiché en grand (lisible)
- [ ] Médaille visible (emoji 🥇🥈🥉)
- [ ] 3 boutons (Partager, Rejouer, Accueil) >= 44x44px
- [ ] Boutons empilés verticalement sur mobile

---

### 🎨 **3. CONTRASTES (WCAG AA = 4.5:1)**

#### **Texte normal**
- [ ] Titre principal (blanc/noir sur fond sombre)
- [ ] Sous-titres et descriptions
- [ ] Labels de navigation
- [ ] Texte des boutons

#### **Texte sur états**
- [ ] Hover (survol)
- [ ] Focus (clavier)
- [ ] Active (clic)
- [ ] Disabled (désactivé)

#### **Éléments interactifs**
- [ ] Boutons primaires (fond rouge #e50914)
- [ ] Boutons secondaires (fond cyan #22d3ee)
- [ ] Liens dans le footer
- [ ] Badges catégories

**Outil recommandé :** https://webaim.org/resources/contrastchecker/

---

### 🔗 **4. LIENS & NAVIGATION**

#### **Liens cassés (404)**
- [ ] Tester tous les liens du header
- [ ] Tester tous les liens du footer
- [ ] Tester les 6 cartes quiz sur home
- [ ] Tester les liens internes dans les quiz
- [ ] Tester le changement de langue (FR ↔ EN)

#### **Redirections**
- [ ] / → /fr (redirection automatique)
- [ ] /fr/jeux-video accessible
- [ ] /en/games accessible
- [ ] Changement de langue conserve la page (ex: /fr/quiz/inception → /en/quiz/inception)

---

### 👆 **5. TAILLES TAP (Mobile Touch Targets)**

**Minimum WCAG :** 44x44px  
**Recommandé :** 48x48px

#### **Éléments à vérifier**
- [ ] Logo header
- [ ] Liens de navigation header
- [ ] Sélecteur de langue
- [ ] Cartes quiz (toute la carte cliquable)
- [ ] Boutons quiz (4 réponses)
- [ ] Bouton "Question suivante"
- [ ] Boutons page résultat (3 boutons)
- [ ] Liens footer

**Outil DevTools :**
```
- Ouvrir DevTools (F12)
- Mode responsive (Ctrl+Shift+M)
- Sélectionner iPhone SE (375x667)
- Inspecter les éléments et vérifier dimensions
```

---

### ⌨️ **6. NAVIGATION CLAVIER**

#### **Ordre de tabulation logique**
- [ ] Header → Contenu → Footer
- [ ] Focus visible sur tous les éléments (ring bleu/cyan)
- [ ] Pas de piège clavier (on peut sortir de partout)

#### **Quiz complet au clavier**
- [ ] Tab pour naviguer entre les réponses
- [ ] Entrée pour sélectionner une réponse
- [ ] Tab pour atteindre "Question suivante"
- [ ] Ordre logique du début à la fin

---

### 🎭 **7. RESPONSIVE BREAKPOINTS**

#### **Mobile (375px - 767px)**
- [ ] Home : 1 colonne
- [ ] Cartes empilées verticalement
- [ ] Boutons pleine largeur ou adaptés

#### **Tablet (768px - 1023px)**
- [ ] Home : 2 colonnes
- [ ] Espacement approprié
- [ ] Navigation horizontale OK

#### **Desktop (1024px+)**
- [ ] Home : 3 colonnes
- [ ] Max-width container (~1200px)
- [ ] Espacement généreux

---

### 🖼️ **8. IMAGES & MÉDIAS**

#### **Images OG**
- [ ] /api/og fonctionne
- [ ] /api/og?title=Test génère une image
- [ ] /api/og?title=Test&score=8&total=10 affiche le score
- [ ] Image 1200x630px
- [ ] Poids < 300KB

#### **Favicon**
- [ ] Favicon visible dans l'onglet
- [ ] Pas d'erreur 404 sur /favicon.ico

---

### 🚨 **9. ERREURS CONSOLE**

#### **Console Browser (F12)**
- [ ] Aucune erreur JavaScript bloquante
- [ ] Warnings next-intl (non bloquants, OK)
- [ ] Aucune ressource 404 critique
- [ ] Aucune erreur CORS

#### **Console serveur (npm run dev)**
- [ ] Compilation réussie
- [ ] Pas d'erreurs TypeScript
- [ ] Warnings acceptables (telemetry, etc.)

---

### 🌐 **10. i18n & LOCALES**

#### **Changement de langue**
- [ ] Cliquer FR → EN change la langue
- [ ] Textes traduits correctement
- [ ] Quiz anglais affichés en mode EN
- [ ] Quiz français affichés en mode FR
- [ ] URLs mises à jour (/fr → /en)

#### **Cohérence des traductions**
- [ ] "Quizz" (2 z) partout en FR
- [ ] "Quizzflix" (2 z) dans header/footer
- [ ] Pas de texte hardcodé en anglais sur /fr
- [ ] Pas de texte hardcodé en français sur /en

---

## 📊 **RÉSULTATS ATTENDUS**

### ✅ **Critères de validation P0-T1**

| Critère | Attendu | Statut |
|---------|---------|--------|
| Home mobile ≤ 2 scrolls | 6 cartes visibles | ⏳ |
| Contrastes AA | Tous >= 4.5:1 | ⏳ |
| Tailles tap | Tous >= 44px | ⏳ |
| Liens cassés | Aucun | ⏳ |
| Navigation clavier | Complète | ⏳ |
| Responsive | 3 breakpoints OK | ⏳ |

---

## 🐛 **BUGS À REPORTER**

Notez ici les problèmes trouvés :

### **Critique (bloquant)**
- [ ] ...

### **Important (non bloquant)**
- [ ] ...

### **Mineur (cosmétique)**
- [ ] ...

---

## 🔧 **OUTILS RECOMMANDÉS**

### **Contrastes**
- WebAIM Contrast Checker : https://webaim.org/resources/contrastchecker/
- Chrome DevTools : Lighthouse → Accessibility

### **Responsive**
- Chrome DevTools (F12) → Mode responsive (Ctrl+Shift+M)
- Devices : iPhone SE, iPad, Desktop

### **Navigation clavier**
- Tester avec Tab, Shift+Tab, Entrée, Espace
- Vérifier focus visible partout

### **Performance**
- Chrome DevTools → Lighthouse
- Run sur mobile (throttling activé)

---

## ✅ **VALIDATION FINALE**

Une fois l'audit terminé :
- [ ] Tous les critères validés
- [ ] Bugs critiques corrigés
- [ ] P0-T1 marqué comme TERMINÉ ✅
- [ ] Passer à P0-T5 (Performance mobile)

---

## 📝 **NOTES**

*Ajoutez vos observations ici...*

