import http from "http";
import express from "express";

const app = express();
const PORT = 8000;
const myServer = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Server is running on NodeJS");
});

myServer.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
