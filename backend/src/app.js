import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import accountRoutes from "./routes/account.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/account", accountRoutes);
app.use("/api/auth", authRoutes);


// health route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Esoft ASE Backend 🚀", health_check: "/api/health" });
});

app.use("/api", routes);

export default app;
