import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import notFound from './middlewares/not-found.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

// Middleware pour les routes non trouvées
app.use(notFound);

// Middleware de gestion d'erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur tourne sur le port: ${PORT}`);
});
