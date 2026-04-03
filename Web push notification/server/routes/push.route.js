import express from "express";
import dotenv from "dotenv";
import PushSubscription from "../models/PushSubscription.js";
import webpush from "web-push";

const router = express.Router();
dotenv.config();

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

router.post("/subscribe", async (req, res) => {
  try {
    const { endpoint, keys } = req.body;

    if (!endpoint || !keys) {
      return res.status(400).json({
        success: false,
        message: "Endpoint and keys are required",
      });
    }

    await PushSubscription.findOneAndUpdate(
      { endpoint },
      { endpoint, keys },
      { upsert: true, new: true },
    );

    res.status(200).json({
      success: true,
      message: "Subscription saved successfully!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/unsubscribe", async (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({
        success: false,
        message: "Endpoint is required",
      });
    }

    await PushSubscription.deleteOne({
      endpoint,
    });

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully!!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/send", async (req, res) => {
  const { title, body, url, icon } = req.body;

  const payload = JSON.stringify({ title, body, url, icon });

  try {
    // Fetch all subscriptions from DB
    const subscriptions = await PushSubscription.find();

    const results = await Promise.allSettled(
      subscriptions.map((sub) =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys, // { p256dh, auth }
          },
          payload,
        ),
      ),
    );

    // Clean up expired/invalid subscriptions
    const expiredEndpoints = [];
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const statusCode = result.reason?.statusCode;
        if (statusCode === 410 || statusCode === 404) {
          expiredEndpoints.push(subscriptions[i].endpoint);
        }
      }
    });

    if (expiredEndpoints.length > 0) {
      await PushSubscription.deleteMany({
        endpoint: { $in: expiredEndpoints },
      });
      console.log(
        `Cleaned up ${expiredEndpoints.length} expired subscriptions`,
      );
    }

    res.json({ message: "Notifications sent", total: subscriptions.length });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

export default router;
