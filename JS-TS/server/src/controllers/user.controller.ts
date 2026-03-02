declare global {
  namespace Express {
    interface Request {
      user?: { userId: string | number };
    }
  }
}

import { prisma } from "../db.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendMail } from "../utils/sendMail.ts";
import { Request, Response } from "express";

const generateToken = (userId: string | number): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });
    if (!users) {
      res.status(404).json({
        success: false,
        message: "No users found!!!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Users found!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
        bio: req.body?.bio || "",
      },
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });

    const token = generateToken(user?.id);

    res.status(201).json({
      success: true,
      message: "Register successful!",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    console.log(password, user)
    const isCorrect = await bcrypt.compare(password, user?.password);
    if (!isCorrect) {
      res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }

    if (!user) {
      res.status(404).json({
        success: false,
        message: "No user found!!!",
      });
      return;
    }

    const token = generateToken(user?.id);

    res.status(201).json({
      success: true,
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "No user found!!!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Users found!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "No user found!!!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User found!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

interface OtpRecord {
  otp: number;
  expiresIn: number;
}

const otps = new Map<string, OtpRecord>();

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "No user found!!!",
      });
      return;
    }

    const otp = Math.floor(Math.random() * 1000000);

    otps.set(email, {
      otp,
      expiresIn: Date.now() + 5 * 60 * 1000,
    });

    await sendMail(email, "OTP to reset password", `Your OTP is ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "No user found!!!",
      });
      return;
    }

    const record = otps.get(email);
    if (!record) {
      res.status(404).json({
        success: false,
        message: "Otp Expired try again!",
      });
      return;
    }

    if (Date.now() > record.expiresIn) {
      otps.delete(email);
      res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
      return;
    }
    if (record.otp !== Number(otp)) {
      res.status(400).json({
        success: false,
        message: "Incorrect otp",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "OTP validation successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { newPassword, email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found pls try again",
      });
      return;
    }

    const hashPass = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashPass,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!!",
    });
  }
};
