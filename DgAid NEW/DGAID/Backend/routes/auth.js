// backend/routes/auth.js
import express from "express";
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password, confirm_password } = req.body;

    if (!full_name || !email || !password || !confirm_password)
      return res.status(400).json({ message: "All fields required" });

    if (password !== confirm_password)
      return res.status(400).json({ message: "Passwords do not match" });

    const [existing] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (existing.length) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (full_name,email,password) VALUES (?,?,?)", [full_name,email,hashed]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const [users] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (!users.length) return res.status(400).json({ message: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
