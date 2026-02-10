import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// health route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Esoft ASE Backend 🚀", health_check: "/api/health" });
});

app.use("/api", routes);

export default app;
