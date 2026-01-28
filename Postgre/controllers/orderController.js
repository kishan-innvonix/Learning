const orderModel = require("../models/orderModel")

exports.createOrder = async(req, res) => {
    try {
        const order = await orderModel.createOrder(req.body)
        res.status(201).json({
            success: true,
            message: "Order recorded",
            order
        })
    } catch (error) {
        res.status(500).json({
            error: error?.message || "Something went wrong"
        })
    }
}