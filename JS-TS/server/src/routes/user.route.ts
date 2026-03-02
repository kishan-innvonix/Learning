import express from "express";
import {
  getAllUsers,
  createUser,
  login,
  getUserById,
  getCurrentUser,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/user.controller.ts";
import { validate } from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.get("/:id", getUserById);

router.get("/", validate, getCurrentUser);

router.get("/all", validate, getAllUsers);

router.post("/", createUser);

router.post("/login", login);

router.post("/forget-pass-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

export default router;
