import express from "express";
import healthRouter from "./health.routes.js";
import usersRouter from "./users.routes.js";

const router = express.Router();

// register routes
router.use("/health", healthRouter);
router.use("/users", usersRouter);

export default router;

