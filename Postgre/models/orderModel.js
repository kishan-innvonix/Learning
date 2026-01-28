const db = require("../config/db")

const createOrder = (data) => {
    return db("orders").insert(data).returning("*")
}

module.exports = {
    createOrder
}