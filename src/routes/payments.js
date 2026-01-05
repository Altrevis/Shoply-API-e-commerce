import express from 'express';
import { createPayment, confirmPayment, getPaymentStatus } from '../controllers/paymentController.js';
import oauthAuthenticate from '../middlewares/oauthAuthenticate.js';

const router = express.Router();

router.post('/', createPayment);
router.post('/:id/confirm', oauthAuthenticate, confirmPayment);
router.get('/:id', getPaymentStatus);

export default router;
