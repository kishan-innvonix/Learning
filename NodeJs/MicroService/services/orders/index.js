import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import orderRoutes from "./routes/order.routes.js";
import { subscribe } from "../../shared/rabbitmq.js";
import Order from "./models/order.model.js";
import constants from "../../shared/constants.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/health", (req, res) => {
  res.send("Orders ");
});

app.use("/orders", orderRoutes);

subscribe("orders_queue", async (payload) => {
  console.log(`[Orders] Received event: ${payload.eventName}`, payload.data);

  switch (payload.eventName) {
    case "user.deleted":
      await Order.deleteMany({ userId: payload.data.userId });
      console.log(`[Orders] Deleted orders for user: ${payload.data.userId}`);
      break;

    case "user.updated":
      await Order.updateMany(
        { userId: payload.data.userId },
        {
          userName: payload.data.username || payload.data.userName,
          userEmail: payload.data.email || payload.data.userEmail,
        },
      );
      console.log(`[Orders] Synced user details for: ${payload.data.userId}`);
      break;

    default:
      console.log(`[Orders] Unhandled event: ${payload.eventName}`);
  }
});

const PORT = process.env.PORT || constants.PORTS.ORDERS;
app.listen(PORT, () => {
  console.log(`Orders running on ${PORT}`);
});
