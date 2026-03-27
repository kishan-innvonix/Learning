import express from "express";
import runTask from "./threadPool.js";

const app = express();

let requestCount = 0;

app.use((req, res, next) => {
  requestCount++;
  console.log(`PID ${process.pid} handled ${requestCount} requests`);
  next();
});

app.get("/", (req, res) => {
  console.log("first");
  res.send(`Running ${process.pid}  `);
});

app.get("/fast", (req, res) => {
  res.send(`Fast response from PID ${process.pid}`);
});

app.get("/blocking", (req, res) => {
  let count = 0;
  for (let i = 0; i < 1e9; i++) {
    count += Math.sqrt(i);
  }
  res.send(`${count} Blocking api from PID ${process.pid}`);
});

// Blocking code optimized with worker thread
app.get("/blocking-optimized", async (req, res) => {
  const result = await runTask(1e9);
  res.send(`${result} Blocking api from PID ${process.pid}`);
});

const port = 3000;
app.listen(port, () => {
  console.log("Server running on ", port);
});
