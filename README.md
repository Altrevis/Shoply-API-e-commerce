# Shoply-API — Installation des dépendances

Rapide guide pour installer les node_modules du projet.

Installation (local)
- Avec npm
  ```bash
  npm install
  ```
  installation .env (fichier racine)
  ```
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
  ```

Url à testé sur Porstman
  User POST and GET
  ```
  http://localhost:3000/users
  ```
  Body (json)
  ```
  {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "client",
  "money": 100
  }
  ```


  Product GET
  ```
  http://localhost:3000/products
  ```


  Order POST
  ```
  http://localhost:3000/orders
  ```
  Body (json)
  ```
  {
  "userId": 7,
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


  Payments POST
  ```
  http://localhost:3000/payments
  ```
  Body (json)
  ```
  {
  "orderId": 8,
  "amount": 89.88,
  "method": "card"
  }
  ```


  Onesignal POST
  ```
  http://localhost:3000/notifications/test
  ```
  Body (text)
  ```
  {
    "playerId": "test_played_id"
  }
  ```

  
  Mailtrap POST
  ```
  http://localhost:3000/emails/test
  ```
  Body (json)
  ```
  {
  "to": "votre.email@demailtrap.com",
  "subject": "Test d'email",
  "text": "Ceci est un email de test",
  "category": "Integration Test"
  }
  ```