import app from "./src/app.js";
import sequelize from "./src/config/db.config.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

async function startServer() {
    try {
        // Test Sequelize DB connection
        await sequelize.authenticate();
        console.log("✅ MySQL DB connected via Sequelize");

        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server running at: ${APP_URL}`);
        });
    } catch (err) {
        console.error(err);

        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    }
}

// Graceful shutdown
const shutdown = async () => {
    console.log("\n🛑 Shutting down server...");
    try {
        await sequelize.close();
        console.log("✅ DB connection closed");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error closing DB:", err.message);
        process.exit(1);
    }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
