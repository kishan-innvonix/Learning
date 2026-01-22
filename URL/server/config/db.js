import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected ");
  } catch (error) {
    console.error("Error While DB Connect :", error.message);
    process.exit(1);
  }
};
