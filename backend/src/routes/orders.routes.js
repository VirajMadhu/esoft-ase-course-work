import express from "express";
import * as ordersService from "../services/orders.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // In a real app, userId would come from the auth middleware (req.user.id)
    // For now, we expect it in the body as per the implementation plan requirement for testing
    const result = await ordersService.createOrder(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
