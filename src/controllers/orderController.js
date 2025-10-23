// src/controllers/orderController.js
import { sendNotification } from '../services/onesignalService.js';
import { Order } from '../models/index.js'; // Assure-toi que ton modèle est exporté en ES Module

export const create = async (req, res, next) => {
  try {
    // Création de la commande (logique habituelle)
    const order = await Order.create({ /* ... */ });

    // Récupère le player_id du client
    const playerId = req.user.player_id;
    if (playerId) {
      await sendNotification({
        headings: { en: 'Commande reçue !' },
        contents: { en: `Votre commande #€{order.id} a bien été enregistrer.` },
        include_player_ids: [playerId],
      });
    }

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
