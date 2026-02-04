import express from "express";
import sequelize from "../config/db.config.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ server: "running 🚀", db: "connected ✅" });
    } catch (err) {
        console.error(err);

        res.json({ server: "running 🚀", db: "failed ❌" });
    }
});

export default router;