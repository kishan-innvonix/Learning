import dotenv from "dotenv";
import PushSubscription from "../models/push.model.js";
dotenv.config();

export const subscribePush = async (req, res) => {
  try {
    const { endpoint, keys } = req.body;
    const userId = req.params.userId;
    if (!endpoint || !keys) {
      return res.status(400).json({
        success: false,
        message: "Endpoint and keys are required",
      });
    }

    await PushSubscription.findOneAndUpdate(
      { userId },
      { endpoint, keys, userId },
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
};

export const unsubscribePush = async (req, res) => {
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
};
