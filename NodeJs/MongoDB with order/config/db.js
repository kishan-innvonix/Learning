import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const dbConnect = asyncHandler(async () => {
    await mongoose.connect("mongodb://localhost:27017/order-management/")
    console.log("DB Connected!!!")
})