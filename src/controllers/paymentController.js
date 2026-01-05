import { Order, OrderItem, Product } from '../models/index.js';

export const createPayment = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required' });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid item: productId and quantity are required' });
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: `Product with id ${productId} not found` });
      }

      const itemTotal = product.price * quantity;
      total += itemTotal;

      orderItems.push({
        product_id: productId,
        quantity: quantity,
        unit_price: product.price
      });
    }

    const userId = req.user ? req.user.id : null;

    const order = await Order.create({
      user_id: userId,
      total_price: total,
      status: 'pending'
    });

    for (const item of orderItems) {
      await OrderItem.create({
        order_id: order.id,
        ...item
      });
    }

    const completeOrder = await Order.findByPk(order.id, {
      include: [{
        model: OrderItem,
        foreignKey: 'order_id',
        include: [{ model: Product, foreignKey: 'product_id' }]
      }]
    });

    res.status(201).json({
      message: 'Payment initiated successfully',
      order: completeOrder,
      paymentUrl: `http://localhost:3000/payments/${order.id}/confirm`
    });
  } catch (err) {
    next(err);
  }
};

export const confirmPayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'completed';
    await order.save();

    res.json({
      message: 'Payment confirmed',
      order: order
    });
  } catch (err) {
    next(err);
  }
};

export const getPaymentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [{
        model: OrderItem,
        foreignKey: 'order_id',
        include: [{ model: Product, foreignKey: 'product_id' }]
      }]
    });

    if (!order) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      paymentId: order.id,
      status: order.status,
      total: order.total_price,
      items: order.OrderItems
    });
  } catch (err) {
    next(err);
  }
};
