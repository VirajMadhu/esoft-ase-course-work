import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";
import Category from "../Category.js";

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
      references: {
        model: Category,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
      type: DataTypes.STRING,
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

// Associations
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });

Product.hasMany(StockMovement, {
  foreignKey: "productId",
  as: "stockMovements",
});

StockMovement.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

export default Product;
