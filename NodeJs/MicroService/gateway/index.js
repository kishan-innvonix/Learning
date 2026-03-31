import express from "express";
import dotenv from "dotenv";
import constants from "../shared/constants.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

dotenv.config();

const SERVICE_MAP = {
  "/users": constants.SERVICE_URLS.USERS,
  "/orders": constants.SERVICE_URLS.ORDERS,
  "/notifications": constants.SERVICE_URLS.NOTIFICATIONS,
};

const PUBLIC_URL = [
  { method: "POST", path: "/users/register" },
  { method: "POST", path: "/users/login" },
  { method: "GET", path: "/users/health" },
];

const authValidator = (req, res, next) => {
  try {
    let isPulic = PUBLIC_URL.some((url) => {
      return url.method === req.method && req.path.startsWith(url.path);
    });

    if (isPulic) {
      return next();
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!!!",
      });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, constants.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const forwardRequest = async (req, res) => {
  try {
    const prefix = Object.keys(SERVICE_MAP).find((route) =>
      req.originalUrl.startsWith(route),
    );
    if (!prefix) {
      return res.status(404).json({
        success: false,
        message: "Not found!!!",
      });
    }

    const targetUrl = SERVICE_MAP[prefix] + req.originalUrl;
    console.log(req.method, targetUrl);
    const response = await axios({
      method: req.method,
      headers: {
        authorization: req.headers.authorization,
        "content-type": req.headers["content-type"],
      },
      url: targetUrl,
      data: req.body,
      params: req.query,
      validateStatus: () => true,
    });
    console.log(response);

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(503).json("Server is not available!!!");
  }
};

// auth middleware
app.use(authValidator);

app.get("/health", (req, res) => {
  res.send("Gateway ");
});

// forwarding request
app.all("*", forwardRequest);

const PORT = process.env.PORT || constants.PORTS.GATEWAY;
app.listen(PORT, () => {
  console.log(`Gateway running on ${PORT}`);
});
