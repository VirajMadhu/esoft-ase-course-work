import express from "express";
import healthRouter from "./health.routes.js";
import usersRouter from "./users.routes.js";
import productsRouter from "./products.routes.js";
import constantDataRouter from "./constant-data.routes.js";
import authRouter from "./auth.router.js";

const router = express.Router();

// register routes
router.use("/health", healthRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/constants", constantDataRouter);
router.use("/auth", authRouter);

export default router;
