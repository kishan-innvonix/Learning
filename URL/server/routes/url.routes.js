import express from "express";
import {
  analysis,
  createShortUrl,
  deleteUrl,
  getAllUrl,
  toggleActive,
} from "../controller/url.controller.js";
import { checkToken, validateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes for URL management
router.post("/", checkToken, createShortUrl);

router.get("/list", validateUser, getAllUrl);

router.get("/:id/analysis", validateUser, analysis);

router.delete("/:id", validateUser, deleteUrl)

router.patch("/:id/status", validateUser, toggleActive)

export default router;
