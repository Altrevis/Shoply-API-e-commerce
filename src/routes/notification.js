import express from 'express';
import { sendNotification } from '../services/onesignalService.js';

const router = express.Router();

// POST /notifications/test
router.post('/test', async (req, res) => {
  try {
    const playerId = req.body.playerId; // j'envoie le player_id dans le body
    
    // Validation: vérifier si c'est un UUID valide
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(playerId)) {
      return res.status(400).json({ 
        error: 'Invalid player ID format',
        message: 'Player ID must be a valid UUID. Get a real Player ID from OneSignal dashboard or use testMode=true',
        example: '550e8400-e29b-41d4-a716-446655440000',
        receivedFormat: playerId
      });
    }
    
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
