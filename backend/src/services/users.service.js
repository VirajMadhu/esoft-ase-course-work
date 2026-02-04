import User from "../models/User.js";

export async function getAllUsers() {
    return User.findAll();
}

export async function createUser({ name, email }) {
    if (!name || !email) {
        throw new Error("Name and email are required");
    }

    return User.create({ name, email });
}
