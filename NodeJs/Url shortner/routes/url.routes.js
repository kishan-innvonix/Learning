import express from "express";
import { 
    createShortUrl, 
    getOriginalUrl 
} from "../controller/url.controller.js";

const router = express.Router();

router.get("/:id", getOriginalUrl);

router.post("/", createShortUrl);

export default router;