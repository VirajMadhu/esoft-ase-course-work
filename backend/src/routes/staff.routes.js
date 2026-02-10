import express from "express";
import { getAllStaff, createStaff, updateStaff, deleteStaff } from "../controllers/staff.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply authentication to all routes
router.use(authenticate);

// Get all staff (Accessible by Admin and Staff)
router.get("/", authorize(["admin", "staff"]), getAllStaff);

// Create, Update, Delete (Accessible by Admin only)
// Note: For this coursework, we might allow 'staff' to manage other staff if needed, 
// but typically only admins create staff. I'll restrict to admin for now.
router.post("/", authorize(["admin"]), createStaff);
router.put("/:id", authorize(["admin"]), updateStaff);
router.delete("/:id", authorize(["admin"]), deleteStaff);

export default router;
