import express from "express";
import {
  createCustomDomain,
  getCustomDomain,
  deleteCustomDomain,
} from "../controller/customDomain.controller.js";
import { validateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", validateUser, createCustomDomain);

router.get("/", validateUser, getCustomDomain);

router.delete("/:id", validateUser, deleteCustomDomain);

export default router;
