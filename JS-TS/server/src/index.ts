import { Request, Response } from "express";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.route.ts";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

// ─── Health ───────────────────────────────────────────────────────────────────
app.get("/", (req:Request, res:Response) => {
  res.json({ status: "ok", message: "neon-prisma-starter API is running 🚀" });
});

app.use("/users", userRoutes);


// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
});
