import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user.route.js";
import constants from "../../shared/constants.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/users/health", (req, res) => {
  console.log("works");
  res.send("Users ");
});

app.use("/users", userRoutes);

const PORT = process.env.PORT || constants.PORTS.USERS;
app.listen(PORT, () => {
  console.log(`Users running on ${PORT}`);
});
