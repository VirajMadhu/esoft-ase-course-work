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
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

export default User;
