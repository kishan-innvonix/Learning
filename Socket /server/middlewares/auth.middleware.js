import { ForbiddenError, UnauthorizedError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const authValidator = async (req, res, next) => {
  try {
    const auth = req.headers?.authorization;
    if (!auth) {
      throw new UnauthorizedError("Invalid Access!!!");
    }
    const token = auth?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const allow = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req?.user?.role)) {
        throw new ForbiddenError("You are not allow to do this!!!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
