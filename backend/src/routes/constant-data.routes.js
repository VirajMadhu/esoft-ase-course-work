import express from "express";
import { getAllCategories } from "../services/categories.service.js";
import { PRODUCT_SORT_OPTIONS } from "../constants/productSort.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    const sortOptions = PRODUCT_SORT_OPTIONS;
    res.json({ categories, sortOptions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
