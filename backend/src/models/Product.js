import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(2048), // avoids "data too long" error
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badge: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  },
);

// Function to attach associations later
Product.associate = function (models) {
  Product.belongsTo(models.Category, {
    foreignKey: "categoryId",
    as: "category",
    inverse: false,
  });

  Product.hasMany(models.StockMovement, {
    foreignKey: "productId",
    as: "stockMovements",
    inverse: false,
  });
};

export default Product;
