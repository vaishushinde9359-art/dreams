// // backend/routes/projects.js
// import express from "express";
// import { db } from "../db.js";
// import { authenticate } from "../middleware/auth.js";
// import { adminOnly } from "../middleware/admin.js";

// const router = express.Router();

// // GET all projects (public)
// router.get("/", async (req, res) => {
//   try {
//     const [result] = await db.query("SELECT * FROM projects");
//     const formatted = result.map(p => ({
//       ...p,
//       features: JSON.parse(p.features || "[]"),
//       outcomes: JSON.parse(p.outcomes || "[]"),
//       author: { name: p.author_name, bio: p.author_bio }
//     }));
//     res.json(formatted);
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // GET project by ID (public)
// router.get("/:id", async (req, res) => {
//   try {
//     const [result] = await db.query("SELECT * FROM projects WHERE id=?", [req.params.id]);
//     if (!result.length) return res.status(404).json({ message: "Project not found" });
//     const p = result[0];
//     res.json({ ...p, features: JSON.parse(p.features || "[]"), outcomes: JSON.parse(p.outcomes || "[]"), author: { name: p.author_name, bio: p.author_bio } });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // POST project (admin)
// router.post("/", authenticate, adminOnly, async (req, res) => {
//   try {
//     const { title, shortDescription, overview, features, outcomes, image, price, college, collegeInfo, author } = req.body;
//     const [result] = await db.query("INSERT INTO projects (title,shortDescription,overview,features,outcomes,image,price,college,collegeInfo,author_name,author_bio) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
//       [title, shortDescription, overview, JSON.stringify(features||[]), JSON.stringify(outcomes||[]), image, price, college, collegeInfo, author?.name, author?.bio]
//     );
//     res.json({ message: "Project added", projectId: result.insertId });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // PUT project (admin)
// router.put("/:id", authenticate, adminOnly, async (req, res) => {
//   try {
//     const { title, shortDescription, overview, features, outcomes, image, price, college, collegeInfo, author } = req.body;
//     await db.query("UPDATE projects SET title=?, shortDescription=?, overview=?, features=?, outcomes=?, image=?, price=?, college=?, collegeInfo=?, author_name=?, author_bio=? WHERE id=?",
//       [title, shortDescription, overview, JSON.stringify(features||[]), JSON.stringify(outcomes||[]), image, price, college, collegeInfo, author?.name, author?.bio, req.params.id]
//     );
//     res.json({ message: "Project updated" });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // DELETE project (admin)
// router.delete("/:id", authenticate, adminOnly, async (req, res) => {
//   try {
//     const [result] = await db.query("DELETE FROM projects WHERE id=?", [req.params.id]);
//     if (result.affectedRows === 0) return res.status(404).json({ message: "Project not found" });
//     res.json({ message: "Project deleted" });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// export default router;



















import express from "express";
import { db } from "../db.js";
import { authenticate } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

// Helper to safely parse JSON
const safeParse = (str) => {
  try {
    return JSON.parse(str || "[]");
  } catch {
    return []; // fallback if invalid JSON
  }
};

// GET all projects (public)
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM projects");
    const formatted = result.map(p => ({
      ...p,
      features: safeParse(p.features),
      outcomes: safeParse(p.outcomes),
      author: { name: p.author_name, bio: p.author_bio }
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET project by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM projects WHERE id=?", [req.params.id]);
    if (!result.length) return res.status(404).json({ message: "Project not found" });
    const p = result[0];
    res.json({
      ...p,
      features: safeParse(p.features),
      outcomes: safeParse(p.outcomes),
      author: { name: p.author_name, bio: p.author_bio }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST project (admin)
router.post("/", authenticate, adminOnly, async (req, res) => {
  try {
    const { title, shortDescription, overview, features, outcomes, image, price, college, collegeInfo, author } = req.body;
    const [result] = await db.query(
      "INSERT INTO projects (title,shortDescription,overview,features,outcomes,image,price,college,collegeInfo,author_name,author_bio) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        title,
        shortDescription,
        overview,
        JSON.stringify(features || []),
        JSON.stringify(outcomes || []),
        image,
        price,
        college,
        collegeInfo,
        author?.name,
        author?.bio
      ]
    );
    res.json({ message: "Project added", projectId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT project (admin)
router.put("/:id", authenticate, adminOnly, async (req, res) => {
  try {
    const { title, shortDescription, overview, features, outcomes, image, price, college, collegeInfo, author } = req.body;
    await db.query(
      "UPDATE projects SET title=?, shortDescription=?, overview=?, features=?, outcomes=?, image=?, price=?, college=?, collegeInfo=?, author_name=?, author_bio=? WHERE id=?",
      [
        title,
        shortDescription,
        overview,
        JSON.stringify(features || []),
        JSON.stringify(outcomes || []),
        image,
        price,
        college,
        collegeInfo,
        author?.name,
        author?.bio,
        req.params.id
      ]
    );
    res.json({ message: "Project updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project (admin)
router.delete("/:id", authenticate, adminOnly, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM projects WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
