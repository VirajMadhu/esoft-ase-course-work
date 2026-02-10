import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "PAID", "SHIPPED", "CANCELLED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  },
);

Order.associate = (models) => {
  Order.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

export default Order;
