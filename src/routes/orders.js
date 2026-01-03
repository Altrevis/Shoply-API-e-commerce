import express from 'express';
import oauthAuthenticate from '../middlewares/oauthAuthenticate.js';

// Données en mémoire (mock)
const _products = [
  { id: 1, name: 'Produit demo', price: 9.99, stock: 10 },
  { id: 2, name: 'Autre produit', price: 19.99, stock: 5 }
];
const _users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const _orders = [];
const _orderItems = [];
let _nextOrderId = 1;
let _nextOrderItemId = 1;

// Mock sequelize transaction
const sequelize = {
  async transaction() {
    return {
      async commit() {},
      async rollback() {},
      LOCK: { UPDATE: 'UPDATE' }
    };
  }
};

// Mock Product
const Product = {
  async findByPk(id, options) {
    const idx = _products.findIndex(p => p.id === Number(id));
    if (idx === -1) return null;
    const base = _products[idx];
    const instance = { ...base };
    instance.update = async (attrs) => {
      _products[idx] = { ..._products[idx], ...attrs };
      return { ..._products[idx] };
    };
    return instance;
  }
};

// Mock User
const User = {
  async findByPk(id, options) {
    const u = _users.find(x => x.id === Number(id));
    return u ? { ...u } : null;
  }
};

// Mock Order
const Order = {
  async create(attrs, options) {
    const order = { id: _nextOrderId++, ...attrs };
    _orders.push(order);
    return { ...order };
  },
  async findByPk(id, opts = {}) {
    const order = _orders.find(o => o.id === Number(id));
    if (!order) return null;
    // construire inclusion d'items + produits si demandé
    const includeItems = (opts.include || []).some(i => i.model === OrderItem || i.model === 'OrderItem');
    const result = { ...order };
    if (includeItems) {
      const items = _orderItems.filter(it => it.order_id === order.id).map(it => ({ ...it }));
      // gérer include des produits dans items
      const itemInclude = (opts.include || []).find(i => i.model === OrderItem);
      if (itemInclude && Array.isArray(itemInclude.include) && itemInclude.include.includes(Product)) {
        for (const it of items) {
          const prod = _products.find(p => p.id === Number(it.product_id));
          it.Product = prod ? { ...prod } : null;
        }
      }
      // nommer la propriété comme Sequelize (OrderItems)
      result.OrderItems = items;
    }
    return result;
  }
};

// Mock OrderItem
const OrderItem = {
  async create(attrs, options) {
    const item = { id: _nextOrderItemId++, ...attrs };
    _orderItems.push(item);
    return { ...item };
  }
};

const router = express.Router();

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
      // décrémenter stock (mise à jour du tableau)
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

export default router;
