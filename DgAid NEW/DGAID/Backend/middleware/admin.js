// backend/middleware/admin.js
import { db } from "../db.js";

export const adminOnly = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Fetch the user from database
    const [rows] = await db.query("SELECT role FROM users WHERE id = ?", [req.user.id]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const userRole = rows[0].role;
    if (userRole !== "admin") return res.status(403).json({ message: "Admin access only" });

    // All good, proceed
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
