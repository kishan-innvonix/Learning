import express from "express";
import {
  currentUser,
  deleteUser,
  getAllUser,
  getUser,
  login,
  logout,
  refreshUser,
  register,
  searchUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../validations/user.validation.js";
import { allow, authValidator } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", authValidator, logout);

router.get("/current", authValidator, currentUser);

router.post("/refresh-token", refreshUser);

router.get("/search", authValidator, allow(["admin", "user"]), searchUser);

router.get("/:id", authValidator, allow(["admin", "user"]), getUser);

router.get("/", authValidator, allow(["admin", "user"]), getAllUser);


router.delete("/:id", authValidator, allow(["admin"]), deleteUser);

router.patch("/", authValidator, updateUser);

export default router;
