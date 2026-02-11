import express from "express";
import healthRouter from "./health.routes.js";
import usersRouter from "./users.routes.js";
import productsRouter from "./products.routes.js";
import constantDataRouter from "./constant-data.routes.js";
import authRouter from "./auth.routes.js";
import ordersRouter from "./orders.routes.js";
import staffRouter from "./staff.routes.js";
import accountRouter from "./account.routes.js"

const router = express.Router();

// register routes
router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/staff", staffRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/constants", constantDataRouter);
router.use("/orders", ordersRouter);
router.use("/account", accountRouter);

export default router;
