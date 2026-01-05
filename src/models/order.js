export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      tableName: 'orders',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: false
    }
  );
  return Order;
};
