import express from "express";
import { 
    analysis,
    createShortUrl, 
    getOriginalUrl 
} from "../controller/url.controller.js";

const router = express.Router();

router.get("/:id", getOriginalUrl);

router.post("/", createShortUrl);

router.get("/:id/analysis", analysis)

export default router;