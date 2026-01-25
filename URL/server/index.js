import express from "express";
import { dbConnect } from "./config/db.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import urlRoutes from "./routes/url.routes.js";
import urlRedirectRoutes from "./routes/urlRedirect.routes.js";
import userRoutes from "./routes/user.routes.js";
import customDomainRoutes from "./routes/customDomain.routes.js";
import customUrlRoutes from "./routes/customUrl.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

dbConnect();

app.use(morgan("dev"))
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Health check route
app.get("/", (req, res) => {
  res.send("Server running fine.");
});

// routes - Order matters! Specific routes first, catch-all at the end
app.use("/api/url", urlRoutes);
app.use("/user", userRoutes);
app.use("/customDomain", customDomainRoutes);
app.use("/api/customUrl", customUrlRoutes);

// These handle: GET /:id and GET /:domain/:customName
app.use(urlRedirectRoutes);

// Error handler middleware
app.use(globalErrorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
