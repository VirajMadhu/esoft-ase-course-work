import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";
import Product from "../Product.js";

const StockMovement = sequelize.define(
  "StockMovement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM("IN", "OUT", "ADJUST"),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "stock_movements",
    timestamps: true,
  },
);

export default StockMovement;
