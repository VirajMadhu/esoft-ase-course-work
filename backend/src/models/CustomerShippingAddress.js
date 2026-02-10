import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const CustomerShippingAddress = sequelize.define(
  "CustomerShippingAddress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "customer_shipping_addresses",
    timestamps: true,
  },
);

CustomerShippingAddress.associate = function (models) {
  const User = models.User;
  CustomerShippingAddress.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    inverse: false,
  });
};

export default CustomerShippingAddress;
