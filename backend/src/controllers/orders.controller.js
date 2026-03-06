// controllers/orders.controller.js
import Order from "../models/Order.js";
import RetailCustomer from "../models/RetailCustomer.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import { Op } from "sequelize";

export const getAllOrders = async (req, res) => {
  try {
    const { status, startDate, endDate, search } = req.query;

    const where = {};

    // Status filter
    if (status && status !== "All Statuses") {
      where.status = status;
    }

    // Date range filter
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[Op.lte] = new Date(endDate);
    }

    // Search by order_number or customer business name
    if (search) {
      where[Op.or] = [
        { order_number: { [Op.like]: `%${search}%` } },
        { "$customer.businessName$": { [Op.like]: `%${search}%` } }, // search customer name
      ];
    }

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: RetailCustomer,
          as: "customer",
          attributes: ["id", "businessName", "address", "phone"],
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              attributes: ["name", "sku", "unit", "image", "price"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: RetailCustomer,
          as: "customer",
          attributes: ["id", "businessName", "address", "phone", "creditLimit"],
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              attributes: ["id", "name", "sku", "unit", "image", "price"],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Optional: format response for cleaner frontend consumption
    const formatted = {
      ...order.toJSON(),
      customer: order.customer
        ? {
            id: order.customer.id,
            businessName: order.customer.businessName,
            address: order.customer.address,
            phone: order.customer.phone,
            creditLimit: order.customer.creditLimit,
          }
        : null,
      items:
        order.items?.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.quantity * item.unitPrice,
        })) || [],
    };

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ message: "Failed to fetch order details" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validTransitions = {
      PENDING: ["PAID", "CANCELLED"],
      PAID: ["SHIPPED"],
      SHIPPED: ["DELIVERED"],
      DELIVERED: [],
      CANCELLED: [],
    };

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const current = order.status;
    if (!validTransitions[current]?.includes(status)) {
      return res.status(400).json({
        message: `Cannot transition from ${current} to ${status}`,
      });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};
