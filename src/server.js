import express from 'express';
import routes from './routes/index.js';
import oauthRouter from './routes/oauth.js';
import notificationRouter from './routes/notification.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use('/oauth', oauthRouter);
app.use('/notifications', notificationRouter);

// après les importations
import { sequelize } from './models/index.js';

// ... app.use middlewares, routes, etc.

(async () => {
  try {
    // sync automatque : crée les tables manquantes ou modifie si necessaire
    await sequelize.sync({ alter: true });
    console.log('✅ Sequelize sync completed.');
  } catch (err) {
    console.error('❌ Sequelize sync error:', err);
    process.exit(1);
  }

  // Démarrer le serveur 
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();



