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

import userModel from './user.js';
import productModel from './product.js';
import orderModel from './order.js';
import orderItemModel from './orderItem.js';
import OauthClientModel from './oauthClient.js';
import OauthTokenModel from './oauthToken.js';

const User = userModel(sequelize, DataTypes);
const Product = productModel(sequelize, DataTypes);
const Order = orderModel(sequelize, DataTypes);
const OrderItem = orderItemModel(sequelize, DataTypes);
const OauthClient = sequelize.define('OauthClient', {
  client_id: { type: DataTypes.STRING, unique: true },
  client_secret: DataTypes.STRING,
  name: DataTypes.STRING,
  redirect_uris: DataTypes.TEXT
}, { tableName: 'oauth_clients', underscored: true });

const OauthAccessToken = sequelize.define('OauthAccessToken', {
  access_token: { type: DataTypes.STRING, unique: true },
  access_token_expires_at: DataTypes.DATE,
}, { tableName: 'oauth_access_tokens', underscored: true });

const OauthRefreshToken = sequelize.define('OauthRefreshToken', {
  refresh_token: { type: DataTypes.STRING, unique: true },
  refresh_token_expires_at: DataTypes.DATE,
}, { tableName: 'oauth_refresh_tokens', underscored: true });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

OauthClient.hasMany(OauthAccessToken, { foreignKey: 'client_id', onDelete: 'CASCADE' });
OauthClient.hasMany(OauthRefreshToken, { foreignKey: 'client_id', onDelete: 'CASCADE' });
OauthAccessToken.belongsTo(OauthClient, { foreignKey: 'client_id' });
OauthRefreshToken.belongsTo(OauthClient, { foreignKey: 'client_id' });

User.hasMany(OauthAccessToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(OauthRefreshToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
OauthAccessToken.belongsTo(User, { foreignKey: 'user_id' });
OauthRefreshToken.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, Sequelize, User, Product, Order, OrderItem, OauthClient, OauthAccessToken,
  OauthRefreshToken };
