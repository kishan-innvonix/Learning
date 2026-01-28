const db = require("../config/db")

const createOrder = (data) => {
    return db("orders").insert(data).returning("*")
}

const getAllOrders = () => {
    return db("orders").select("*")
}

module.exports = {
    createOrder,
    getAllOrders
}