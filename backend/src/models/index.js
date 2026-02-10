import sequelize from "../config/db.config.js";
import Category from "./Category.js";
import Product from "./Product.js";
import StockMovement from "./StockMovement.js";
import Order from "./Order.js";
import User from "./User.js";
import Token from "./Token.js";
import CustomerShippingAddress from "./CustomerShippingAddress.js";

const db = {
  sequelize,
  Category,
  Product,
  StockMovement,
  Order,
  User,
  Token,
  CustomerShippingAddress,
};

// Call associate after all models are imported
Object.values(db).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(db);
  }
});

export default db;
