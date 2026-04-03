import express from "express";
import { authValidator } from "../middlewares/auth.middleware.js";
import { createChat, getAllChats, getChatMessages, sendMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/create", authValidator, createChat)

router.get("/messages/:id", authValidator, getChatMessages)

router.post('/message/send/:id', authValidator, sendMessage)
            
router.get("/all", authValidator, getAllChats)

export default router;
