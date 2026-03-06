// routes/inventory.routes.js
import express from "express";
import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import Category from "../models/Category.js"; // assuming you have Category model
import { Op } from "sequelize";

const router = express.Router();

// GET /inventory - List products with calculated stock & status
router.get("/", async (req, res) => {
  try {
    const { search, categoryId, status } = req.query;

    const where = {};

    // Search by name or SKU
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { sku: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filter by category
    if (categoryId && categoryId !== "All Categories") {
      where.categoryId = categoryId;
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: StockMovement,
          as: "stockMovements",
          attributes: ["quantity", "type"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    // Calculate real stock level & status
    const inventory = products.map((product) => {
      const totalStock = product.stockMovements.reduce((sum, movement) => {
        if (
          movement.type === "IN" ||
          (movement.type === "ADJUST" && movement.quantity > 0)
        ) {
          return sum + movement.quantity;
        } else {
          return sum - Math.abs(movement.quantity);
        }
      }, 0);

      let displayStatus = "In Stock";
      if (totalStock <= 20) displayStatus = "Low Stock";
      if (totalStock <= 10) displayStatus = "Critical";

      return {
        id: product.id,
        sku: product.sku,
        name: product.name,
        category: product.category?.name || "Unknown",
        stock: totalStock,
        status: displayStatus,
      };
    });

    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

export default router;
