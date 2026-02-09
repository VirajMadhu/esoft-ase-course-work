import express from "express";
import { getAllProducts } from "../services/products.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts({
      page: req.query.page,
      limit: req.query.limit,
      sort: req.query.sort,
      category: req.query.category,
      search: req.query.search,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
