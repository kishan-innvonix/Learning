import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const auth = req.headers?.authorization;
  if (!auth) {
     res.status(401).json({
      success: false,
      message: "You are not authorized!!!",
    });return
  }

  const token = auth.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
  req.user = decoded as { userId: string };

  next();
};
