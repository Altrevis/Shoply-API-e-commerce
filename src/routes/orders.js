const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, User, sequelize } = require('../models');

router.post('/', async (req, res) => {
  const { userId, items } = req.body;
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'userId et items (array) requis' });
  }

  const t = await sequelize.transaction();
  try {
    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    // vérifier stock et calculer total
    let total = 0;
    for (const it of items) {
      const product = await Product.findByPk(it.productId, { transaction: t, lock: t.LOCK.UPDATE });
      if (!product) {
        await t.rollback();
        return res.status(404).json({ error: `Produit ${it.productId} introuvable` });
      }
      if (product.stock < it.quantity) {
        await t.rollback();
        return res.status(400).json({ error: `Stock insuffisant pour le produit ${it.productId}` });
      }
      total += parseFloat(product.price) * it.quantity;
    }

    // créer la commande
    const order = await Order.create({ user_id: userId, total_price: total, status: 'pending' }, { transaction: t });

    // créer items et décrémenter stock
    for (const it of items) {
      const product = await Product.findByPk(it.productId, { transaction: t, lock: t.LOCK.UPDATE });
      await OrderItem.create({
        order_id: order.id,
        product_id: it.productId,
        quantity: it.quantity,
        unit_price: product.price,
      }, { transaction: t });

      // décrémenter stock
      await product.update({ stock: product.stock - it.quantity }, { transaction: t });
    }

    await t.commit();

    const created = await Order.findByPk(order.id, { include: [{ model: OrderItem, include: [Product] }] });
    res.status(201).json(created);
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;