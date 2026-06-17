const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET all arcs
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM arcs ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch arcs" });
  }
});

// GET single arc by slug
router.get("/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM arcs WHERE slug = $1",
      [req.params.slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Arc not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch arc" });
  }
});

module.exports = router;
