import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/asyncHandler.js";


export const checkToken = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) return next();

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUser = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new UnauthorizedError("You need to login first");
    }

    if (!auth.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid authorization format");
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    next(error); 
  }
};
