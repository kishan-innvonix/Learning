import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conenctDB from "./config/db.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

conenctDB();
const app = express();

app.use(cookieParser())
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api/user", userRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
