import 'dotenv/config';
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

import { sequelize } from './models/index.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();



