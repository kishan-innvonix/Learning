import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conenctDB from "./config/db.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import pushRoutes from "./routes/push.route.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { initSocket } from "./utils/initSocket.js";

dotenv.config();

conenctDB();
const app = express();

const httpServer = createServer(app);

app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

initSocket(httpServer);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/push", pushRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
