import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/user/:userId", getOrdersByUser);
router.patch("/:id/status", updateOrderStatus);

export default router;
