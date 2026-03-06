import express from "express";
import * as ordersService from "../services/orders.service.js";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

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

router.get("/:orderNumber", async (req, res) => {
  try {
    const result = await ordersService.getOrderByNumber(req.params.orderNumber);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// List all orders (filtered) – for staff dashboard
router.get("/", getAllOrders);

// Get single order details by ID – for "View Details"
router.get("/view/:id", getOrderById);

// Update order status – inline dropdown in staff UI
router.patch("/:id/status", updateOrderStatus);

export default router;
