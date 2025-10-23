import express from 'express';
import { sendNotification } from '../services/onesignalService.js';

const router = express.Router();

// POST /notifications/test
router.post('/test', async (req, res) => {
  try {
    const playerId = req.body.playerId; // j'envoie le player_id dans le body
    const result = await sendNotification({
      headings: { en: 'Test Notification' },
      contents: { en: 'Ceci est un test depuis Postman' },
      include_player_ids: [playerId],
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
