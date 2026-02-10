import express from "express";
import * as authService from "../services/auth.service.js";
import User from "../models/User.js";

const router = express.Router();

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
    res.status(401).json({ message: err.message });
  }
});

router.put("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findByPk(1);

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    return res.status(400).json({ message: "Current password incorrect" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashed });

  res.json({ message: "Password updated successfully" });
});

export default router;
