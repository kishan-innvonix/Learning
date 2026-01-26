import { UnauthorizedError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

export const authVaildator = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      throw new UnauthorizedError("You need to login first!!!");
    }

    const token = auth.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("You need to login first!!!");
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = { _id: decode._id };
    next();
  } catch (error) {
    next(error);
  }
};
