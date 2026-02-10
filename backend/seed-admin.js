import User from "./src/models/User.js";
import bcrypt from "bcrypt";
import sequelize from "./src/config/db.config.js";

const createAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB");

        const email = "admin@esoft.com";
        const password = "adminpassword";

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: "Super Admin",
            email,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully");
    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await sequelize.close();
    }
};

createAdmin();
