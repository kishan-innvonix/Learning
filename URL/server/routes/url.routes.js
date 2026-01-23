import express from "express";
import {
  analysis,
  createShortUrl,
  deleteUrl,
  getAllUrl,
  getOriginalUrl,
  toggleActive,
} from "../controller/url.controller.js";
import { checkToken, validateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", getOriginalUrl);

router.post("/", checkToken, createShortUrl);

router.get("/:id/analysis", validateUser, analysis);

router.get("/", validateUser, getAllUrl);

router.delete("/:id", validateUser, deleteUrl)

router.patch("/:id/status", validateUser, toggleActive)

export default router;
