import express from 'express';
import productsRouter from './products.js';
import usersRouter from './users.js';
import ordersRouter from './orders.js';
import notificationRouter from './notification.js';
import emailsRouter from './emails.js';
import paymentsRouter from './payments.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/payments', paymentsRouter);
router.use('/notifications', notificationRouter);
router.use('/emails', emailsRouter);

export default router;