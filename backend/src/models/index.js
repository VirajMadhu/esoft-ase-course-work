import sequelize from "../config/db.config.js";
import Category from "./Category.js";
import Product from "./Product.js";
import StockMovement from "./StockMovement.js";

const db = {
  sequelize,
  Category,
  Product,
  StockMovement,
};

// Call associate after all models are imported
Object.values(db).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(db);
  }
});

export default db;
