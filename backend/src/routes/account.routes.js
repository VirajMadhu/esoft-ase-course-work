import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET account
router.get("/", async (req, res) => {
  const user = await User.findByPk(1);
  res.json(user || {});
});

// UPDATE email
router.put("/", async (req, res) => {
  const { email } = req.body;
  await User.update({ email }, { where: { id: 1 } });
  res.json({ message: "Account updated successfully" });
});

// CHANGE PASSWORD
router.put("/password", async (req, res) => {
  const { newPassword } = req.body;
  await User.update({ password: newPassword }, { where: { id: 1 } });
  res.json({ message: "Password updated" });
});

// DEACTIVATE
router.delete("/", async (req, res) => {
  await User.destroy({ where: { id: 1 } });
  res.json({ message: "Account deactivated" });
});

export default router;
