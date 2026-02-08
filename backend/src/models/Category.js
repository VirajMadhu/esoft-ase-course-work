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
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

export default Category;
