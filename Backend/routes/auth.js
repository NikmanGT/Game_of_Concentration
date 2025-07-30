import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/registerUser", async (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 10;
  const HashedPass = await bcrypt.hash(password, saltRounds);

  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password) VALUES($1, $2, $3)`,
      [username, email, HashedPass]
    );
    console.log("Col Added");
    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        username,
        email,
      },
    });
  } catch (err) {
    console.log("db error: ", err.message);
  }
});

router.delete("/loginUser", async (req, res) => {
  const { username, password } = req.body;

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
