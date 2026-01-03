import express from 'express';
import productsRouter from './products.js';
import usersRouter from './users.js';
import ordersRouter from './orders.js';
import notificationRouter from './notification.js'; // ajouté
import emailsRouter from './emails.js'; // ajouté

const router = express.Router();

// Route racine
router.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes pour les autres modules
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/notifications', notificationRouter); // ajouté
router.use('/emails', emailsRouter); // ajouté

export default router;