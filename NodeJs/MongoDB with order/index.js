import express from "express"
import { dbConnect } from "./config/db.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";

const app = express();

dbConnect()

app.use(express.json());

app.get("/", (req, res) => {
    app.send("Server running fine.");
})

app.use(globalErrorHandler)

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
