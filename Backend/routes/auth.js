import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/addingUser", async (req, res) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username,email,password) VALUES($1,$2,$3)`,
      ["Test1", "Test@exmaple.com", "Test123"]
    );
    console.log("Col Added");
    res.send(result.rows);
  } catch (err) {
    console.log("db error: ", err.message);
  }
});

router.delete("/deletingUser", async (req, res) => {
  try {
    const result = await pool.query(`
            DELETE FROM users WHERE username='Test1'`);
    console.log("Col Deleted");
    res.send(result.rows);
  } catch (err) {
    console.log("db error: ", err.message);
  }
});

export default router;
