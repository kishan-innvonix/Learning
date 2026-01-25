import express from "express";
import {
  getCustomUrl,
  createCustomUrl,
  getAllCustomUrls,
  getCustomUrlsByDomain,
  toggleCustomUrlActive,
  deleteCustomUrl,
} from "../controller/customUrl.controller.js";
import { validateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes for management
router.post("/", validateUser, createCustomUrl);

router.get("/list", validateUser, getAllCustomUrls);

router.get("/domain/:domainId", validateUser, getCustomUrlsByDomain);

router.patch("/:id/status", validateUser, toggleCustomUrlActive);

router.delete("/:id", validateUser, deleteCustomUrl);

export default router;
