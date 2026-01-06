# Shoply API - E-commerce Backend

API REST complète pour une application e-commerce avec gestion des utilisateurs, produits, commandes, paiements, notifications et emails.

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v5.7 ou supérieur)
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

---

## ⚙️ Configuration

### Base de données

1. Créez une base de données MySQL :
```sql
CREATE DATABASE Shoply-e-commerce;
```

2. Importez le schéma de base de données :
```bash
mysql -u votre_utilisateur -p Shoply-e-commerce < db/Shoply-e-commerce.sql
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=Shoply-e-commerce
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe

# Server Configuration
PORT=3000

# Mailtrap SMTP Configuration
MAILTRAP_SMTP_USER=votre_email_mailtrap
MAILTRAP_SMTP_PASS=votre_mot_de_passe_mailtrap
MAILTRAP_SMTP_HOST=live.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=587

# Email Configuration
MAIL_FROM=noreply@shoply.com
MAIL_FROM_NAME="Shoply API"

# OneSignal Configuration (optionnel)
ONESIGNAL_APP_ID=votre_app_id
ONESIGNAL_REST_KEY=votre_rest_key
```

> **Note :** Remplacez toutes les valeurs par vos propres identifiants.

---

## 🎯 Démarrage

### Mode développement (avec nodemon)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarre par défaut sur `http://localhost:3000`

---

## 📚 Documentation API

**BASE URL:** `http://localhost:3000`

### 1. Route racine

#### Hello World
```http
GET /
```

**Réponse :** `"Hello World"`

---

### 2. Utilisateurs (Users)

#### Récupérer tous les utilisateurs
```http
GET /users
```

#### Récupérer un utilisateur par ID
```http
GET /users/:id
```

**Exemple :** `GET /users/1`

#### Créer un utilisateur
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Modifier un utilisateur
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

#### Supprimer un utilisateur
```http
DELETE /users/:id
```

---

### 3. Produits (Products)

#### Récupérer tous les produits
```http
GET /products
```

---

### 4. Commandes (Orders)

#### Créer une commande
```http
POST /orders
Content-Type: application/json

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

### 5. Paiements (Payments)

#### Traiter un paiement
```http
POST /payments
Content-Type: application/json

{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

---

### 6. Notifications (OneSignal)

#### Envoyer une notification test
```http
POST /notifications/test
Content-Type: application/json

{
  "playerId": "550e8400-e29b-41d4-a716-446655440000"
}
```

> **Note :** Le `playerId` doit être un UUID valide OneSignal. Vous pouvez obtenir un Player ID réel depuis votre dashboard OneSignal.

---

### 7. Emails (Mailtrap)

#### Envoyer un email test
```http
POST /emails/test
Content-Type: application/json

{
  "to": "destinataire@example.com",
  "subject": "Test d'email",
  "text": "Ceci est un email de test depuis l'API Shoply",
  "category": "Integration Test"
}
```

> **Note :** Assurez-vous que vos credentials Mailtrap sont configurés dans le `.env`

---

### 8. OAuth (Authentification)

#### Obtenir un token d'accès
```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=password
username=your_username
password=your_password
client_id=your_client_id
client_secret=your_client_secret
```

**Ou avec JSON :**
```http
POST /oauth/token
Content-Type: application/json

{
  "grant_type": "password",
  "username": "your_username",
  "password": "your_password",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret"
}
```

---

## 🧪 Tests

### Lancer tous les tests
```bash
npm test
```

### Test classique
```bash
npm run test
```

### Mode watch (tests en continu)
```bash
npm run test:watch
```

---

## 📝 Notes importantes

- **Base de données :** Vérifiez que MySQL est démarré et accessible
- **OneSignal :** Utilisez un vrai Player ID UUID depuis votre dashboard OneSignal (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- **Mailtrap :** Configurez vos identifiants SMTP dans le `.env`
- **Variables d'environnement :** Toutes les variables du `.env` doivent être configurées pour un fonctionnement optimal
- **OAuth :** Exécutez le script de seed pour créer un client OAuth : `node src/scripts/seedOauthClient.js`

---

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM pour MySQL
- **MySQL** - Base de données
- **OAuth2 Server** - Authentification
- **Mailtrap** - Service d'envoi d'emails
- **OneSignal** - Service de notifications push
- **Jest** - Framework de tests
- **Nodemon** - Rechargement automatique en développement

---

## 📂 Structure du projet

```
Shoply-API-e-commerce/
├── db/                     # Scripts SQL
├── models/                 # Modèles Sequelize
├── src/
│   ├── auth/              # Configuration OAuth
│   ├── config/            # Configuration base de données
│   ├── controllers/       # Contrôleurs des routes
│   ├── middlewares/       # Middlewares Express
│   ├── models/            # Modèles métier
│   ├── routes/            # Définition des routes
│   ├── scripts/           # Scripts utilitaires
│   ├── services/          # Services externes (Mailtrap, OneSignal)
│   └── server.js          # Point d'entrée de l'application
├── tests/                 # Tests unitaires et d'intégration
├── .env                   # Variables d'environnement (à créer)
├── package.json           # Dépendances et scripts
└── README.md              # Ce fichier
```

---
