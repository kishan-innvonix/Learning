import express from "express";
import { dbConnect } from "./config/db.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import urlRoutes from "./routes/url.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

dbConnect();


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Health check route
app.get("/", (req, res) => {
  res.send("Server running fine.");
});

// routes
app.use("/url", urlRoutes);
app.use("/user", userRoutes);

// Error handler middleware
app.use(globalErrorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
