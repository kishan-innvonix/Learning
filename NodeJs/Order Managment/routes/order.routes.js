import express from "express"
import { cancelOrder, 
    createOrder, 
    deleteOrder, 
    getOrder, 
    getOrders, 
    updateOrder 
} from "../controllers/order.controller.js";
import { 
    craeteOrderValidator, 
    statusUpdateValidator, 
    validateId 
} from "../validators/order.validator.js";


const router = express.Router();

router.get("/", getOrders)

router.get("/:id", validateId, getOrder)

router.post("/", craeteOrderValidator, createOrder)

router.patch("/:id/cancel", validateId, cancelOrder)

router.patch("/:id/status", validateId, statusUpdateValidator, updateOrder)

router.delete("/:id", validateId, deleteOrder);


export default router;