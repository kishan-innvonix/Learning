import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { authValidator } from "../middlewares/auth.middleware.js";
import {
  loginSchema,
  registerSchema,
} from "../validations/user.validations.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authValidator, logout);
router.post("/refresh", refreshAccessToken);
router.get("/current", authValidator, getCurrentUser)

export default router;
