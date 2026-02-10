import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("CUSTOMER", "STAFF", "MANAGER", "ADMIN"),
      allowNull: false,
      defaultValue: "CUSTOMER",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

export default User;
