import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ["PENDING", "DISPATCH", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
