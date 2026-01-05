# Shoply-API — Installation des dépendances

Rapide guide pour installer les node_modules du projet.

## Installation (local)

Avec npm :
```bash
npm install
```

Configuration du fichier `.env` (à la racine du projet) :
```env
MAILTRAP_TOKEN=
DB_NAME=Shoply-e-commerce
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=
PORT=3000
MAILTRAP_SMTP_USER=
MAILTRAP_SMTP_PASS=
MAIL_FROM=mailtrap@example.com
MAIL_FROM_NAME="Shoply API"
ONESIGNAL_APP_ID=
ONESIGNAL_REST_KEY=
```

## Démarrage du serveur

```bash
npm run dev
```

================================================================================
## SHOPLY API - GUIDE DE TEST POSTMAN
================================================================================

**BASE URL:** `http://localhost:3000`

---

### 1. ROUTE RACINE

**GET** `http://localhost:3000/`
- Body: Aucun
- Réponse: `"Hello World"`

---

### 2. USERS (Utilisateurs)

#### Récupérer tous les utilisateurs
**GET** `http://localhost:3000/users`
- Body: Aucun

#### Récupérer un utilisateur par ID
**GET** `http://localhost:3000/users/1`
- Body: Aucun

#### Créer un utilisateur
**POST** `http://localhost:3000/users`
- Content-Type: `application/json`
- Body:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Modifier un utilisateur
**PUT** `http://localhost:3000/users/1`
- Content-Type: `application/json`
- Body:
```json
{
  "name": "Updated User",
  "email": "updated@example.com"
}
```

#### Supprimer un utilisateur
**DELETE** `http://localhost:3000/users/1`
- Body: Aucun

---

### 3. PRODUCTS (Produits)

#### Récupérer tous les produits
**GET** `http://localhost:3000/products`
- Body: Aucun

---

### 4. ORDERS (Commandes)

#### Créer une commande
**POST** `http://localhost:3000/orders`
- Content-Type: `application/json`
- Body:
```json
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

---

### 5. NOTIFICATIONS (OneSignal)

#### Envoyer une notification test
**POST** `http://localhost:3000/notifications/test`
- Content-Type: `application/json`
- Body:
```json
{
  "playerId": "Votre player ID"
}
```

**Note:** Le `playerId` doit être un UUID valide OneSignal.  
Vous pouvez obtenir un vrai Player ID depuis votre dashboard OneSignal.

---

### 6. EMAILS (Mailtrap)

#### Envoyer un email test
**POST** `http://localhost:3000/emails/test`
- Content-Type: `application/json`
- Body:
```json
{
  "to": "destinataire@example.com",
  "subject": "Test d'email",
  "text": "Ceci est un email de test depuis l'API Shoply",
  "category": "Integration Test"
}
```

**Note:** Assurez-vous que vos credentials Mailtrap sont configurés dans le `.env`

---

### 7. OAUTH (Authentification)

#### Obtenir un token d'accès
**POST** `http://localhost:3000/oauth/token`

**Option 1** - Content-Type: `application/x-www-form-urlencoded`
- Body (x-www-form-urlencoded):
```
grant_type=password
username=your_username
password=your_password
client_id=your_client_id
client_secret=your_client_secret
```

**Option 2** - Content-Type: `application/json`
- Body:
```json
{
  "grant_type": "password",
  "username": "your_username",
  "password": "your_password",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret"
}
```

---

## NOTES IMPORTANTES

1. **Démarrage:** Assurez-vous que le serveur est démarré avec `npm run dev`

2. **Tests OneSignal:**
   - Utilisez un vrai Player ID de votre dashboard OneSignal
   - Format UUID valide: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - Exemple: `550e8400-e29b-41d4-a716-446655440000`

3. **Tests Mailtrap:**
   - Vérifiez que `MAILTRAP_SMTP_USER` et `MAILTRAP_SMTP_PASS` sont définis dans `.env`
   - L'email "to" peut être n'importe quelle adresse valide

4. **Variables d'environnement requises (.env):**
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
   - `MAILTRAP_SMTP_USER`, `MAILTRAP_SMTP_PASS`
   - `ONESIGNAL_APP_ID`, `ONESIGNAL_REST_KEY` (optionnel pour mode simulation)

5. **Base de données:**
   - Les utilisateurs sont maintenant stockés dans la base de données MySQL
   - Les données persistent entre les redémarrages du serveur