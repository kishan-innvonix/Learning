import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/url-shortner");
    console.log("DB Connected ");
  } catch (error) {
    console.error("Error While DB Connect :", error.message);
    process.exit(1);
  }
};
