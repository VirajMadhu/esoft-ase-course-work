import User from "../models/User.js";
import bcrypt from "bcrypt";

// Get all staff members (Admin only or Staff view)
export const getAllStaff = async (req, res) => {
    try {
        const staff = await User.findAll({
            where: { role: ["admin", "staff"] },
            attributes: { exclude: ["password"] } // Don't return passwords
        });
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new staff member (Admin only)
export const createStaff = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required for staff accounts" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "staff" // Default to staff if not specified
        });

        res.status(201).json({
            message: "Staff member created successfully",
            user: { id: newStaff.id, name: newStaff.name, email: newStaff.email, role: newStaff.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update staff member
export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Staff member not found" });
        }

        // Only update fields if they are provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.json({
            message: "Staff member updated successfully",
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete staff member
export const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Staff member not found" });
        }

        await user.destroy();
        res.json({ message: "Staff member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
