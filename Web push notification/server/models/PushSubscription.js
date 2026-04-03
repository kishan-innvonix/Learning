import mongoose from "mongoose";

const pushSubcriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },
    endpoint: {
      type: String,
      required: true,
    },
    keys: {
      p256dh: String,
      auth: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("PushSubscription", pushSubcriptionSchema);
