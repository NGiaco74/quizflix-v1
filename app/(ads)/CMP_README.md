# 🍪 CMP & Consent Mode v2 - Guide d'Intégration

## 🎯 Objectif

Intégrer une CMP (Consent Management Platform) conforme TCF 2.2 pour gérer les consentements publicitaires.

---

## 🔧 CMPs Recommandées

### **1. Didomi** (Recommandé)
- ✅ TCF 2.2 certifié
- ✅ Interface moderne
- ✅ Support FR/EN
- 💰 Gratuit jusqu'à 100k vues/mois

### **2. Cookiebot**
- ✅ TCF 2.2 certifié
- ✅ Simple à intégrer
- 💰 Gratuit jusqu'à 100 pages scannées

### **3. OneTrust**
- ✅ Enterprise-grade
- ✅ Très complet
- 💰 Payant

---

## 📋 Intégration CMP

### **Étape 1 : Installer la CMP**

Exemple avec Didomi :

```bash
npm install @didomi/react
```

### **Étape 2 : Configurer**

```typescript
// app/[locale]/layout.tsx
import { DidomiSDK } from '@didomi/react';

<DidomiSDK
  apiKey="YOUR_DIDOMI_API_KEY"
  noticeId="YOUR_NOTICE_ID"
  onConsentChanged={(cmp) => {
    const hasAdConsent = cmp.getUserConsentStatusForPurpose('cookies');
    applyConsent(hasAdConsent);
  }}
/>
```

### **Étape 3 : Connecter à Consent Mode**

La CMP doit appeler notre fonction :

```typescript
import { applyConsent } from '@/lib/consent';

// Quand l'utilisateur accepte
applyConsent(true);

// Quand l'utilisateur refuse
applyConsent(false);
```

---

## ✅ Checklist d'Intégration

- [ ] CMP installée et configurée
- [ ] Banner s'affiche à la première visite
- [ ] Bouton "Accepter" → `applyConsent(true)`
- [ ] Bouton "Refuser" → `applyConsent(false)`
- [ ] Aucune requête pub sans consentement
- [ ] Consent persistant (cookie ou localStorage)
- [ ] Multi-langue (FR/EN)

---

## 🧪 Tests à Effectuer

### **Test 1 : Consentement Refusé**
1. Charger la page en mode incognito
2. Refuser les cookies
3. Vérifier : Aucune requête vers googlesyndication.com
4. Vérifier : House Ads affichés

### **Test 2 : Consentement Accordé**
1. Accepter les cookies
2. Vérifier : Script AdSense chargé
3. Vérifier : Slots AdSense visibles
4. Network tab : Requêtes vers googlesyndication.com OK

### **Test 3 : Persistence**
1. Accepter les cookies
2. Recharger la page
3. Vérifier : Pas de re-demande de consentement
4. Vérifier : Ads chargent automatiquement

---

## 🔐 Consent Mode v2 (Requis pour AdSense 2024+)

Notre implémentation utilise **Consent Mode v2** :

```javascript
gtag('consent', 'default', {
  ad_storage: 'denied',           // Cookies publicitaires
  ad_user_data: 'denied',         // Données utilisateur pour pubs
  ad_personalization: 'denied',   // Personnalisation des pubs
  analytics_storage: 'denied',    // Analytics
});
```

**Après consentement :**
```javascript
gtag('consent', 'update', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
});
```

---

## 📊 Vérification Compliance

### **DevTools Network**
- Avant consent : 0 requête pub ✅
- Après consent : Requêtes OK ✅

### **Google Tag Assistant**
- Installer l'extension Chrome
- Vérifier les tags Consent Mode
- S'assurer qu'ils sont "denied" par défaut

---

## 🌐 Multi-langue

La CMP doit détecter la langue :

```typescript
const locale = document.documentElement.lang; // 'fr' ou 'en'
```

---

## ⚠️ Sans CMP (Mode Debug)

Pour tester sans CMP, vous pouvez simuler le consentement :

```javascript
// Dans la console Chrome
import { applyConsent } from '@/lib/consent';

// Accepter
applyConsent(true);

// Refuser  
applyConsent(false);
```

---

## 📝 Variables d'Environnement

```env
# .env.local
NEXT_PUBLIC_ADS_ENABLED=false              # true pour activer
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXX  # Votre client ID
NEXT_PUBLIC_ADS_STICKY_FREQ_SECONDS=90     # Frequency cap sticky
```

---

## 🚀 Migration Google Ad Manager (V2)

Quand vous passez à GAM, remplacez :

```typescript
// AdProvider.tsx
// Charger googletag au lieu de adsbygoogle

// AdSlot.tsx
// Utiliser googletag.defineSlot() et googletag.display()
```

L'API des composants reste identique ! 🎉

---

**Documentation complète pour votre future intégration CMP.**

