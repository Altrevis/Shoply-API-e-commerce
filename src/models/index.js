// src/models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3307,
    dialect: 'mysql',
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion établie');
  } catch (error) {
    console.error('Erreur de chargement:', error);
  }
};

testConnection();

// Import des modèles
import userModel from './user.js';
import productModel from './product.js';
import orderModel from './order.js';
import orderItemModel from './orderItem.js';

// Initialisation des modèles
const User = userModel(sequelize, DataTypes);
const Product = productModel(sequelize, DataTypes);
const Order = orderModel(sequelize, DataTypes);
const OrderItem = orderItemModel(sequelize, DataTypes);

// Associations
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Export ES Modules
export { sequelize, Sequelize, User, Product, Order, OrderItem };
