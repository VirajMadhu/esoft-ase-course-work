import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "SHIPPED",
        "CANCELLED",
        "DELIVERED",
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  },
);

Order.associate = (models) => {
  Order.belongsTo(models.RetailCustomer, {
    foreignKey: "user_id",
    as: "customer",
  });

  Order.hasMany(models.OrderItem, {
    foreignKey: "orderId",
    as: "items",
  });
};

export default Order;
