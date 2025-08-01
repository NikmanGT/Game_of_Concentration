import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/registerUser", async (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 10;
  const HashedPass = await bcrypt.hash(password, saltRounds);

  try {
    const isRegistered = await pool.query(
      `SELECT COUNT(*) FROM users WHERE email=$1 OR username=$2`,
      [email, username]
    );

    if (Number(isRegistered.rows[0].count) > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      const result = await pool.query(
        `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *`,
        [username, email, HashedPass]
      );

      const token = jwt.sign(
        {
          id: result.rows[0].id,
          username,
          email,
        },
        process.env.JWT_SECRET_REGISTRATION_KEY,
        { expiresIn: "1h" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000,
        })
        .status(201)
        .json({
          message: "User Registered Successfully",
          token,
          user: {
            username,
            email,
          },
        });
    }
  } catch (err) {
    console.log("db error: ", err.message);
    res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
});

router.get("/getUser", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_REGISTRATION_KEY);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

router.post("/loginUser", async (req, res) => {
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
