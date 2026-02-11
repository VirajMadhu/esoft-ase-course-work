import express from "express";
import * as authService from "../services/auth.service.js";
import { register, login } from "../controllers/auth.controller.js";
import User from "../models/User.js"; 
import bcrypt from "bcryptjs";


const router = express.Router();

// --- Customer Auth (Friend's Code) ---
router.post("/signup", async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const result = await authService.verifyOTP(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(3);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// --- Staff/Admin Auth (My Code) ---
router.post("/staff/register", register);
router.post("/staff/login", login);

export default router;
