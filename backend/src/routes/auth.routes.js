import express from "express";
import * as authService from "../services/auth.service.js";
import { register, login } from "../controllers/auth.controller.js";

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

// --- Staff/Admin Auth (My Code) ---
router.post("/register", register);
router.post("/login", login);

export default router;
