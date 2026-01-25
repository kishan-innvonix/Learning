import mongoose from "mongoose";

const visitListSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
    },
    device: {
      type: String,
    },
    clickedAt: {
      type: String,
    },
    language: {
      type: String,
    },
  },
  { _id: false }
);

const customUrlSchema = new mongoose.Schema(
  {
    customName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomDomain",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitList: [visitListSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomUrl", customUrlSchema);
