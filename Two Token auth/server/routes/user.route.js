import express from "express";
import {
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/user.controller.js";
import { authValidator } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authValidator, logout);
router.post("/refresh", refreshAccessToken);

export default router;
