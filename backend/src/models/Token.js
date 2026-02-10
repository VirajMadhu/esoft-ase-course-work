import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.config.js";

const Token = sequelize.define(
  "Token",
  {
    userId: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tokens",
    timestamps: true,
  },
);

Token.associate = (models) => {
  Token.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

export default Token;
