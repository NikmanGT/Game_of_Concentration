import http from "http";
import express from "express";
import cors from "cors";
import authHandler from "../Backend/routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8000;
const myServer = http.createServer(app);

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api", authHandler);

app.get("/", (req, res) => {
  res.send("Server is running on NodeJS & PostgreSQL");
});

myServer.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
