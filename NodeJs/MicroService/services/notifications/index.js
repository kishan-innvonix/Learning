import express from "express";
import dotenv from "dotenv";
import { subscribe } from "../../shared/rabbitmq.js";
import constants from "../../shared/constants.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Notifications ");
});

subscribe("notifications_queue", async (payload) => {
  console.log(
    `[Notifications] Received event: ${payload.eventName}`,
    payload.data,
  );

  switch (payload.eventName) {
    case "user.created":
      console.log(
        `[Notifications] Sending welcome email to: ${payload.data.email}`,
      );
      break;

    case "order.created":
      console.log(
        `[Notifications] Sending order confirmation for order: ${payload.data.orderId}`,
      );
      break;

    case "order.status.updated":
      console.log(
        `[Notifications] Sending status update for order: ${payload.data.orderId}, new status: ${payload.data.status}`,
      );
      break;

    case "order.deleted":
      console.log(
        `[Notifications] Sending order cancellation notification for order: ${payload.data.orderId}`,
      );
      break;

    default:
      console.log(`[Notifications] Unhandled event: ${payload.eventName}`);
  }
});

const PORT = process.env.PORT || constants.PORTS.NOTIFICATIONS;
app.listen(PORT, () => {
  console.log(`Notifications running on ${PORT}`);
});
