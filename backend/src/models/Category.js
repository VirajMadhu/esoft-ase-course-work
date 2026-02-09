import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const Category = sequelize.define(
  "Category",
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
  },
  {
    tableName: "categories",
    timestamps: true,
  },
);

// Function to attach associations later
Category.associate = function (models) {
  const Product = models.Product;
  Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
    inverse: false,
  });
};

export default Category;
