const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.route("/").post( createOrder).get(getOrders)

module.exports = router;