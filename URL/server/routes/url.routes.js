import express from "express";
import {
  analysis,
  createShortUrl,
  getAllUrl,
  getOriginalUrl,
} from "../controller/url.controller.js";
import { checkToken, validateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", getOriginalUrl);

router.post("/", checkToken, createShortUrl);

router.get("/:id/analysis", validateUser, analysis);

router.get("/", validateUser, getAllUrl);

export default router;
