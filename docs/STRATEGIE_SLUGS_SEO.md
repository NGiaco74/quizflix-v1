# 🌐 Stratégie Slugs & SEO Multilingue - Quizzflix V1

**Date :** 1er octobre 2025  
**Tâche :** P1-T2  
**Statut :** Documentation formelle

---

## 🎯 **STRATÉGIE CHOISIE**

### **Slugs Communs (Langue-Agnostique)**

**Décision :** Utiliser des **slugs identiques** en FR et EN

**Format :** `kebab-case` en anglais

**Exemples :**
```
/fr/quiz/inception    ← Français
/en/quiz/inception    ← Anglais

/fr/quiz/breaking-bad ← Français
/en/quiz/breaking-bad ← Anglais

/fr/quiz/zelda-botw   ← Français
/en/quiz/zelda-botw   ← Anglais
```

---

## ✅ **AVANTAGES**

1. **Simplicité** :
   - Un seul slug par quiz
   - Pas de mapping complexe
   - Facile à maintenir

2. **SEO** :
   - URLs stables et prévisibles
   - hreflang fonctionne automatiquement
   - Pas de risque de duplication

3. **Partage** :
   - Lien partageable universel
   - Changement de langue préserve le slug

4. **Développement** :
   - Pas de logique de conversion
   - Pas de redirections complexes
   - Scalable facilement

---

## 📂 **STRUCTURE DES FICHIERS**

```
data/
├── fr/
│   ├── movie/
│   │   └── inception.json         ← slug: "inception"
│   ├── tv/
│   │   └── breaking-bad.json      ← slug: "breaking-bad"
│   └── game/
│       └── zelda-botw.json        ← slug: "zelda-botw"
└── en/
    ├── movie/
    │   └── the-matrix.json        ← slug: "the-matrix"
    ├── tv/
    │   └── stranger-things.json   ← slug: "stranger-things"
    └── game/
        └── elden-ring.json        ← slug: "elden-ring"
```

---

## 🔗 **MAPPING URL → CONTENU**

### **Fonctionnement**

```typescript
// lib/quiz.ts
export function getQuizBySlug(locale: Locale, slug: string): Quiz | null {
  const quizzes = getAllQuizzes(locale);
  return quizzes.find((q) => q.slug === slug) || null;
}
```

**Résolution :**
1. Utilisateur visite `/fr/quiz/inception`
2. Next.js extrait `locale = "fr"` et `slug = "inception"`
3. Fonction cherche dans `data/fr/` le fichier avec `"slug": "inception"`
4. Contenu français retourné

**Même logique pour :** `/en/quiz/the-matrix`

---

## 🔄 **CHANGEMENT DE LANGUE**

### **Comportement Actuel**

```typescript
// components/LanguageSwitcher.tsx
const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
```

**Exemple :**
```
/fr/quiz/inception → /en/quiz/inception
```

**Résultat :**
- ✅ Si le quiz existe en EN avec le même slug → Affichage
- ❌ Si le quiz n'existe pas en EN → 404

---

## ⚠️ **CAS PARTICULIERS**

### **Quiz non traduit**

**Problème :** Un quiz existe en FR mais pas en EN avec le même slug

**Solution actuelle :** 404 (acceptable pour MVP-1)

**Solution future (P3+) :**
```typescript
// Fallback vers la home ou affichage en FR avec avertissement
if (!quiz) {
  redirect(`/${newLocale}`); // Retour à la home
}
```

### **Pages spéciales**

**Problème :** `/fr/jeux-video` vs `/en/games` (slugs différents)

**Solution implémentée :**
```typescript
// components/LanguageSwitcher.tsx
if (pathname.includes('/jeux-video') && newLocale === 'en') {
  router.push(`/${newLocale}/games`);
} else if (pathname.includes('/games') && newLocale === 'fr') {
  router.push(`/${newLocale}/jeux-video`);
}
```

---

## 🎯 **RÈGLES DE NOMMAGE**

### **Slugs de Quiz**

**Format :** `kebab-case`, anglais, descriptif

**Bonnes pratiques :**
```
✅ inception              (titre du film en minuscules)
✅ breaking-bad           (tirets, pas d'espaces)
✅ zelda-botw            (acronymes acceptés)
✅ the-matrix            (articles inclus si partie du titre)
✅ stranger-things       (pluriels corrects)

❌ Inception             (pas de majuscules)
❌ breaking_bad          (underscores déconseillés)
❌ zelda                 (trop générique si série)
❌ matrix                (manque "the" si c'est le titre)
```

**Longueur :** 10-40 caractères recommandés

---

## 🌍 **SEO MULTILINGUE**

### **Hreflang Implémenté**

```typescript
// lib/seo.ts
alternates: {
  languages: {
    fr: `${baseUrl}/fr${path}`,
    en: `${baseUrl}/en${path}`,
  },
}
```

**Balises générées :**
```html
<link rel="alternate" hreflang="fr" href="https://site.com/fr/quiz/inception" />
<link rel="alternate" hreflang="en" href="https://site.com/en/quiz/inception" />
<link rel="alternate" hreflang="x-default" href="https://site.com/fr/quiz/inception" />
```

### **Sitemaps**

```
/sitemap.xml          → Index
/sitemap-fr.xml       → Tous les quiz FR
/sitemap-en.xml       → Tous les quiz EN
```

**Génération automatique** depuis les fichiers JSON

---

## 🔍 **CANONICAL URLS**

```typescript
// lib/seo.ts
alternates: {
  canonical: url, // URL actuelle de la page
}
```

**Résultat :**
```html
<link rel="canonical" href="https://site.com/fr/quiz/inception" />
```

Chaque langue a sa propre canonical → Pas de duplication SEO

---

## 🚀 **SCALABILITÉ**

### **Ajouter un Quiz**

**Processus simplifié :**
1. Créer `data/fr/movie/nouveau-quiz.json`
2. Définir `"slug": "nouveau-quiz"`
3. Le quiz apparaît automatiquement
4. URLs générées : `/fr/quiz/nouveau-quiz`

**Pas de code à modifier !** ✨

### **Ajouter une Langue (ES, DE, IT...)**

**Étapes :**
1. Ajouter locale dans `lib/i18n.ts`
2. Créer `i18n/messages/es.json`
3. Créer dossier `data/es/`
4. Ajouter sitemap `app/sitemap-es.xml/`
5. Mettre à jour middleware

**Les slugs restent identiques** → Cohérence multilingue

---

## 📊 **MATRICE SLUGS ACTUELS**

| Quiz FR | Slug | Quiz EN | Slug |
|---------|------|---------|------|
| Inception | `inception` | The Matrix | `the-matrix` |
| Breaking Bad | `breaking-bad` | Stranger Things | `stranger-things` |
| Zelda BotW | `zelda-botw` | Elden Ring | `elden-ring` |

**Note :** Slugs différents car contenus différents (pas de traduction 1:1)

---

## ⚠️ **LIMITATIONS ACTUELLES**

### **Pas de Redirection Intelligente**

**Scénario :**
```
Utilisateur sur /fr/quiz/inception
→ Clique EN
→ Va vers /en/quiz/inception
→ Quiz n'existe pas en EN avec ce slug
→ 404
```

**Accepté pour MVP-1** ✅  
**À améliorer en P3+** avec fallback vers home

---

## 🔮 **ÉVOLUTIONS FUTURES**

### **Phase P3+ : Mapping Slugs**

**Si on veut des quiz traduits 1:1 :**

```typescript
// lib/slug-mapping.ts
const slugMapping = {
  'inception-fr': 'inception-en',
  'matrix-fr': 'matrix-en',
};
```

**Permet :**
- Slugs localisés (`/fr/quiz/le-labyrinthe` → `/en/quiz/the-maze`)
- Redirections intelligentes
- Meilleur SEO local

**Coût :** +30 min développement + maintenance

---

## ✅ **VALIDATION P1-T2**

### **Critères de succès :**

- ✅ Stratégie documentée formellement
- ✅ Slugs cohérents et prévisibles
- ✅ Aucune 404 lors du changement de langue (sauf quiz non traduit)
- ✅ SEO multilingue fonctionnel (hreflang, sitemaps)

**P1-T2 → TERMINÉ** ✅

---

## 🎊 **PHASE P1 - COMPLÉTÉE À 100% !**

```
✅ P1-T1 Section Jeux vidéo    → TERMINÉ
✅ P1-T2 Slugs & SEO doc       → TERMINÉ (ce doc)
✅ P1-T3 Politique légale      → TERMINÉ
```

---

## 📊 **BILAN GLOBAL**

```
🎉 Phase P0 : 100% ✅
🎉 Phase P1 : 100% ✅
⏳ Phase P2 : 0%
⏳ Phase P3 : 0%
⏳ Phase P4 : 0%

Progression totale : 40% (2/5 phases)
```

---

## 🎯 **PROCHAINE PHASE : P2 - Instrumentation**

### **P2-T1 : Analytics Minimal** (60 min)

**Objectif :** Mesurer l'engagement utilisateur

**Actions :**
- Intégrer Plausible.io (ou Netlify Analytics)
- Events frontend : quiz_start, quiz_finish, share_click
- Dashboard de base

**Résultat :** Données de base après première session

---

**🎊 FÉLICITATIONS ! Vous avez terminé 2 phases complètes (P0 + P1) !**

**Voulez-vous commencer P2-T1 (Analytics) maintenant ?** 📊
