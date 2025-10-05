# 📋 Utilisation des Emplacements Publicitaires

## 🎯 Guide Rapide

### **1. Activer les Ads (quand prêt)**

Créer/modifier `.env.local` :

```env
# Désactivé par défaut
NEXT_PUBLIC_ADS_ENABLED=false

# Pour activer (une fois AdSense configuré)
NEXT_PUBLIC_ADS_ENABLED=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADS_STICKY_FREQ_SECONDS=90
```

---

### **2. Obtenir votre Client ID AdSense**

1. Créer un compte sur https://adsense.google.com
2. Ajouter votre site
3. Copier le Publisher ID : `ca-pub-XXXXXXXXXXXXXXXX`
4. Le coller dans `.env.local`

---

### **3. Créer des Emplacements Publicitaires**

Dans AdSense :
1. Annonces → Par unité d'annonce
2. Créer 3 formats :
   - **Display** (leaderboard) → Copier le data-ad-slot
   - **Display** (rectangle) → Copier le data-ad-slot
   - **Display** (mobile banner) → Copier le data-ad-slot

---

### **4. Utiliser dans les Pages**

#### **Exemple : Home avec Ad Top**

```tsx
// app/[locale]/page.tsx
import AdSlot from '@/components/AdSlot';

export default function HomePage() {
  return (
    <div>
      {/* Ad en haut de page */}
      <AdSlot 
        id="ad-home-top"
        type="top"
        slotId="1234567890" // Remplacer par votre slot ID
      />

      {/* Contenu principal */}
      <div className="grid grid-cols-3 gap-6">
        {/* ... cartes quiz ... */}
      </div>

      {/* Ad au milieu */}
      <AdSlot 
        id="ad-home-mid"
        type="mid"
        slotId="0987654321"
      />
    </div>
  );
}
```

#### **Exemple : Quiz avec Ad Sticky**

```tsx
// app/[locale]/quiz/[slug]/page.tsx
import AdSlot from '@/components/AdSlot';

export default function QuizPage() {
  return (
    <div>
      {/* Questions 1-10 */}
      <Quiz />

      {/* Sticky ad en bas d'écran */}
      <AdSlot 
        id="ad-quiz-sticky"
        type="sticky"
        slotId="5555555555"
      />
    </div>
  );
}
```

---

## 📏 Types d'Emplacements

### **Top Banner** (728x90 desktop, 320x50 mobile)
```tsx
<AdSlot id="ad-top" type="top" slotId="YOUR_SLOT_ID" />
```
- Above the fold
- Visible immédiatement
- Hauteur réservée : 100px

### **Mid Rectangle** (300x250)
```tsx
<AdSlot id="ad-mid" type="mid" slotId="YOUR_SLOT_ID" />
```
- Entre le contenu
- Lazy-load (400px avant)
- Hauteur réservée : 300px

### **Sticky Bottom** (320x50 mobile)
```tsx
<AdSlot id="ad-sticky" type="sticky" slotId="YOUR_SLOT_ID" />
```
- Toujours visible en bas
- Frequency cap : 1x/90s
- Hauteur réservée : 60px

---

## 🔒 Consent Mode v2

### **Sans CMP (Mode Debug)**

Pour tester, ouvrez la console et tapez :

```javascript
// Simuler acceptation
import { applyConsent } from '@/lib/consent';
applyConsent(true);
```

### **Avec CMP (Production)**

La CMP doit appeler :

```typescript
import { applyConsent } from '@/lib/consent';

// Au clic sur "Accepter"
applyConsent(true);

// Au clic sur "Refuser"  
applyConsent(false);
```

---

## 🎨 House Ads (Fallback)

Quand les pubs sont désactivées ou refusées, on affiche des **House Ads** :
- Liens vers d'autres quiz
- Design cohérent avec le site
- Même footprint que les vraies pubs (zero CLS)

---

## 📊 Monitoring

### **Vérifier que ça fonctionne**

**Chrome DevTools → Network :**
- **Sans consent :** 0 requête vers `googlesyndication.com` ✅
- **Avec consent :** Requêtes vers `googlesyndication.com` ✅

**Console :**
- Vérifier logs `adsbygoogle.push({})`
- Aucune erreur AdSense

---

## ⚡ Performance

### **Zero CLS garanti**
- Hauteur toujours réservée (min-height)
- Pas de layout shift au chargement

### **Lazy Loading**
- IntersectionObserver avec 400px margin
- Ne charge que ce qui est visible bientôt
- Économise bande passante

### **Frequency Capping**
- Sticky : 1 affichage par 90s
- Évite la sur-sollicitation
- Meilleure UX

---

## 🐛 Dépannage

### **Les pubs ne s'affichent pas**

1. Vérifier `.env.local` :
   ```env
   NEXT_PUBLIC_ADS_ENABLED=true
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXX
   ```

2. Vérifier le consentement :
   ```javascript
   console.log(window.__CONSENT_GRANTED__); // doit être true
   ```

3. Vérifier le script :
   ```javascript
   document.querySelector('script[data-adsense]'); // doit exister
   ```

4. Console : Erreurs AdSense ?

### **CLS détecté**

- Vérifier que `min-height` est défini
- Vérifier que les House Ads ont la même taille

### **Sticky ne s'affiche pas**

- Vérifier frequency cap : `canShowSticky()`
- Reset pour test : `resetStickyTimer()`

---

## 🚀 Migration Google Ad Manager (V2)

Quand ready, remplacez :

```typescript
// Au lieu de AdSense adsbygoogle
window.googletag = window.googletag || {cmd: []};

googletag.cmd.push(() => {
  googletag.defineSlot('/YOUR_NETWORK_ID/slot', [300, 250], 'ad-div')
    .addService(googletag.pubads());
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});
```

Composants `AdSlot` et `AdProvider` : API identique, juste le core change !

---

**🎉 Système prêt pour AdSense + migration GAM facile !**

