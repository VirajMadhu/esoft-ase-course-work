import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const RetailCustomer = sequelize.define(
  "RetailCustomer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditLimit: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
  },
  {
    tableName: "retail_customers",
    timestamps: true,
  },
);

export default RetailCustomer;
