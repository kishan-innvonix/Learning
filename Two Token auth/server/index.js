import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js"
import { globalErrorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

connectDB();

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running!!!");
});

app.use("/api/user", userRoutes)

app.use(globalErrorHandler)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
