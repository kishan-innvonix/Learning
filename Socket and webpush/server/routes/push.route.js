import express from "express";
import {
  subscribePush,
  unsubscribePush,
} from "../controllers/push.cotroller.js";

const router = express.Router();

router.post("/subscribe/:userId", subscribePush);
router.post("/unsubscribe", unsubscribePush);

export default router;
