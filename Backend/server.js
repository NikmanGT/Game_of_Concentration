import http from "http";
import express from "express";
import cors from "cors";
import authHandler from "../Backend/routes/auth.js";
import matchHistoy from "../Backend/routes/History.js";

import cookieParser from "cookie-parser";

const app = express();
const myServer = http.createServer(app);

const allowedOrigins = [
  "https://game-of-concentration-nikunj.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api", authHandler);

app.use("/api/matches", matchHistoy);

app.get("/", (req, res) => {
  res.send("Server is running on NodeJS & PostgreSQL.");
});

myServer.listen(process.env.PORT || 8000, () => {
  console.log(`Server started at PORT: ${process.env.PORT || 8000}`);
});
