import { UnauthorizedError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const authValidator = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("You need to login first!!!");
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = { _id: decode._id };
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};
