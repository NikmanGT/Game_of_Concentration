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
        process.env.JWT_AUTH_KEY,
        { expiresIn: "1h" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
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
    const decoded = jwt.verify(token, process.env.JWT_AUTH_KEY);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

router.post("/loginUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE users.username=$1`,
      [username]
    );

    if (result.rows.length == 0) {
      res.status(400).json({ message: "User does not exist" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_AUTH_KEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 3600000,
      })
      .status(200)
      .json({
        message: `Welcome back ${user.username}`,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log("Db error: ", err.message);
  }
});

export default router;
