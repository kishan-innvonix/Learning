import express from "express"
import morgan from "morgan";

import orderRoutes from "./routes/order.routes.js"
import { globalErrorHandler } from "./middleware/error.middleware.js";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the server!")
})

// Routes
app.use("/api/orders", orderRoutes)


app.use(globalErrorHandler)

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})