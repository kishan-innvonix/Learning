import mongoose from "mongoose";

const customDomainSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomDomain", customDomainSchema);
