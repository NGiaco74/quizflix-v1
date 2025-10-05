# 📊 API STATISTIQUES - Documentation pour n8n

**Endpoint :** `/api/stats`  
**Méthode :** `GET`  
**Format :** JSON  
**Accès :** Public (pour n8n)

---

## 🎯 **UTILISATION AVEC n8n**

### **URL Complète**
```
https://votre-domaine.com/api/stats
```

### **Exemple de Requête HTTP (n8n)**
```json
{
  "method": "GET",
  "url": "https://quizzflix.netlify.app/api/stats",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

---

## 📋 **RÉPONSE API**

### **Structure Complète**
```json
{
  "searches": [
    {
      "query": "harry potter",
      "count": 15,
      "found": false,
      "lastSearched": "2025-10-05T10:30:00Z"
    },
    {
      "query": "stranger things",
      "count": 8,
      "found": true,
      "lastSearched": "2025-10-05T09:15:00Z"
    }
  ],
  "summary": {
    "totalSearches": 113,
    "foundSearches": 30,
    "unfoundSearches": 83,
    "topUnfoundQueries": [
      { "query": "star wars", "count": 23 },
      { "query": "marvel", "count": 18 },
      { "query": "harry potter", "count": 15 }
    ],
    "topFoundQueries": [
      { "query": "breaking bad", "count": 12 },
      { "query": "stranger things", "count": 8 }
    ]
  },
  "generatedAt": "2025-10-05T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## 🔍 **CHAMPS EXPLIQUÉS**

### **Searches Array**
| Champ | Type | Description |
|-------|------|-------------|
| `query` | string | Terme recherché par l'utilisateur |
| `count` | number | Nombre de fois recherché |
| `found` | boolean | `true` = quiz existant, `false` = manquant |
| `lastSearched` | string | Dernière recherche (ISO 8601) |

### **Summary Object**
| Champ | Type | Description |
|-------|------|-------------|
| `totalSearches` | number | Total de toutes les recherches |
| `foundSearches` | number | Recherches satisfaites |
| `unfoundSearches` | number | Recherches non satisfaites |
| `topUnfoundQueries` | array | Top des requêtes manquantes |
| `topFoundQueries` | array | Top des requêtes trouvées |

---

## 🎯 **CAS D'USAGE n8n**

### **1. Identifier les Quiz à Créer**
```javascript
// Dans n8n, après la requête HTTP
const unfoundQueries = $json.summary.topUnfoundQueries;

// Prendre les 3 premiers
const priorities = unfoundQueries.slice(0, 3);

// Résultat : ["star wars", "marvel", "harry potter"]
```

### **2. Vérifier la Demande**
```javascript
// Vérifier si "harry potter" est prioritaire
const harryPotter = $json.searches.find(s => 
  s.query === "harry potter"
);

if (harryPotter && harryPotter.count >= 10) {
  // Créer le quiz Harry Potter
}
```

### **3. Analyser les Tendances**
```javascript
// Calculer le ratio de satisfaction
const satisfaction = ($json.summary.foundSearches / $json.summary.totalSearches) * 100;

// Si < 30%, créer plus de quiz
if (satisfaction < 30) {
  // Workflow de création de quiz
}
```

---

## 📊 **EXEMPLE DE WORKFLOW n8n**

### **Workflow : "Content Planning"**

```
1. [HTTP Request] → GET /api/stats
2. [Set] → Extraire topUnfoundQueries
3. [If] → Si count >= 10
4. [OpenAI] → Générer quiz pour cette franchise
5. [Webhook] → Déployer le nouveau quiz
6. [Schedule] → Relancer toutes les 24h
```

### **Configuration HTTP Request**
```json
{
  "method": "GET",
  "url": "{{ $env.QUIZZFLIX_URL }}/api/stats",
  "options": {
    "timeout": 10000,
    "retry": {
      "enabled": true,
      "maxAttempts": 3
    }
  }
}
```

---

## 🔒 **SÉCURITÉ**

### **CORS Activé**
- `Access-Control-Allow-Origin: *`
- Support des requêtes cross-origin
- Compatible avec n8n cloud/self-hosted

### **Pas d'Authentification**
- Endpoint public pour n8n
- Données anonymisées (pas d'IP, pas d'utilisateur)
- Seulement les termes de recherche

---

## 📈 **MÉTRIQUES DISPONIBLES**

### **Priorités de Création**
1. **Star Wars** (23 recherches, non trouvé)
2. **Marvel** (18 recherches, non trouvé)
3. **Harry Potter** (15 recherches, non trouvé)
4. **Game of Thrones** (11 recherches, non trouvé)
5. **Lord of the Rings** (9 recherches, non trouvé)

### **Quiz Populaires Existants**
1. **Breaking Bad** (12 recherches, trouvé)
2. **Stranger Things** (8 recherches, trouvé)
3. **Matrix** (7 recherches, trouvé)
4. **Zelda** (6 recherches, trouvé)
5. **Inception** (4 recherches, trouvé)

---

## 🚀 **IMPLÉMENTATION**

### **1. Tester l'API**
```bash
curl https://votre-domaine.com/api/stats
```

### **2. Configurer n8n**
```javascript
// Dans un n8n node
const response = await fetch('https://quizzflix.netlify.app/api/stats');
const data = await response.json();
return data.summary.topUnfoundQueries;
```

### **3. Automatiser la Création**
- Workflow n8n toutes les 24h
- Vérifier les nouvelles priorités
- Générer automatiquement les quiz manquants

---

## 📝 **EXEMPLE DE RÉPONSE RÉELLE**

```json
{
  "searches": [
    {
      "query": "harry potter",
      "count": 15,
      "found": false,
      "lastSearched": "2025-10-05T10:30:00Z"
    },
    {
      "query": "stranger things",
      "count": 8,
      "found": true,
      "lastSearched": "2025-10-05T09:15:00Z"
    }
  ],
  "summary": {
    "totalSearches": 113,
    "foundSearches": 30,
    "unfoundSearches": 83,
    "topUnfoundQueries": [
      { "query": "star wars", "count": 23 },
      { "query": "marvel", "count": 18 },
      { "query": "harry potter", "count": 15 },
      { "query": "game of thrones", "count": 11 },
      { "query": "lord of the rings", "count": 9 }
    ],
    "topFoundQueries": [
      { "query": "breaking bad", "count": 12 },
      { "query": "stranger things", "count": 8 },
      { "query": "matrix", "count": 7 },
      { "query": "zelda", count: 6 },
      { "query": "inception", "count": 4 }
    ]
  },
  "generatedAt": "2025-10-05T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## 🎯 **RÉSUMÉ**

**API `/api/stats` :**
- ✅ **Publique** pour n8n
- ✅ **JSON structuré** avec priorités
- ✅ **CORS activé** pour cross-origin
- ✅ **Données anonymisées** (sécurisé)
- ✅ **Prêt pour automation** n8n

**Usage :**
1. n8n récupère les stats
2. Identifie les quiz manquants prioritaires
3. Génère automatiquement le contenu
4. Déploie les nouveaux quiz

**Résultat :** Création de contenu **data-driven** et **automatisée** ! 🚀
