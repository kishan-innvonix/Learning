import express from "express";
import { getOriginalUrl } from "../controller/url.controller.js";
import { getCustomUrl } from "../controller/customUrl.controller.js";

const router = express.Router();

// Public route - catch short URL redirects
router.get("/:id", getOriginalUrl);


// Public route - catch custom domain redirects
router.get("/:domain/:customName", getCustomUrl);

export default router;
