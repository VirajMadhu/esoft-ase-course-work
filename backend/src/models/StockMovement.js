import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

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
      type: DataTypes.STRING,
      allowNull: false,
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

// Function to attach associations later
StockMovement.associate = function (models) {
  const Product = models.Product;
  StockMovement.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
    inverse: false,
  });
};

export default StockMovement;
