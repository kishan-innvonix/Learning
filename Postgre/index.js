const express = require("express")

const app = express();

const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")

app.use(express.json())
app.get("/", (req, res) => {
    res.send("Working")
})

app.use("/api/user", userRoutes)
app.use("/api/order", orderRoutes)

app.listen(3000, ()=> {
    console.log("Server running")
})