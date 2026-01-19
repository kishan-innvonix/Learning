import express from "express"
import { dbConnect } from "./config/db.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import urlRoutes from "./routes/url.routes.js"

const app = express();

dbConnect()

app.use(express.json());


// Health check route
app.get("/", (req, res) => {
    res.send("Server running fine.");
})


// routes
app.use("/api/url", urlRoutes)


// Error handler middleware
app.use(globalErrorHandler)

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
