require("dotenv").config();
const express = require("express");
const { prisma } = require("./db");
const userRoutes = require("./routes/user.route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

// ─── Health ───────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "neon-prisma-starter API is running 🚀" });
});

app.use("/users", userRoutes);


// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
});
