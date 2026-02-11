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

// LIST ORDERS (Order History)
router.get("/", async (req, res) => {
  try {
    const orders = await ordersService.getOrdersByUser(3); // demo user
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SINGLE ORDER
router.get("/:orderNumber", async (req, res) => {
  try {
    const order = await ordersService.getOrderByNumber(req.params.orderNumber);
    res.json(order);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
