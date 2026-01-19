import { body, param } from "express-validator"
import { validateRequest } from "../middleware/order.validateRequest.js"

export const craeteOrderValidator = [
    body("items")
        .isArray({min: 1})
        .withMessage("Atleast you have to add one item!!!"),
    validateRequest
]

export const validateId = [
    param("id")
        .isUUID()
        .withMessage("Invalid Id"),
    validateRequest
]

export const statusUpdateValidator = [
    body("status")
        .isIn(["DISPATCH", "DELIVERED"])
        .withMessage("Status must be either dispatch or deliver"),
    validateRequest
]