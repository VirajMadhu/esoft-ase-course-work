import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Token from "../models/Token.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export async function signup({ email, password, name }) {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    role: "customer",
  });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiredAt = new Error(new Date().getTime() + 10 * 60 * 1000); // 10 minutes from now

  // Store OTP in Token table
  await Token.create({
    userId: user.id,
    token: otp,
    expiredAt: new Date(new Date().getTime() + 10 * 60 * 1000),
  });

  // In a real app, you would send this OTP via email
  console.log(`OTP for ${email}: ${otp}`);

  return {
    message: "Signup successful. Please verify your OTP.",
    email: user.email,
  };
}

export async function verifyOTP({ email, otp }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const tokenRecord = await Token.findOne({
    where: {
      userId: user.id,
      token: otp,
    },
  });

  if (!tokenRecord) {
    throw new Error("Invalid OTP");
  }

  if (new Date() > new Date(tokenRecord.expiredAt)) {
    throw new Error("OTP expired");
  }

  // Mark user as verified or active if there's such a field
  // For now, just delete the token
  await tokenRecord.destroy();

  return { message: "OTP verified successfully" };
}

export async function login({ email, password }) {
  const user = await User.findOne({ where: { email, role: "customer" } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };
}
