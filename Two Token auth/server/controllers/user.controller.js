import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/ApiError.js";
import { registerSchema } from "../validations/user.validations.js";

const options = {
  httpOnly: true,
  secure: true,
};

// Register
export const register = asyncHandler(async (req, res) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw new ApiError("Invalid Data Input!!!", {
      status: 400,
      code: "BAD_REQUEST",
      errors: error?.details,
    });
  }

  const { name, email, password } = value;

  const normalizedEmail = email.toLowerCase();
  const isExist = await User.findOne({ email: normalizedEmail });
  if (isExist) {
    throw new BadRequestError("Email is already in use!!!");
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
  });

  const userWithoutPass = await User.findById(user?._id).select(
    "-password -accessToken",
  );

  res.status(201).json({
    success: true,
    message: "Success",
    user: userWithoutPass,
  });
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("All fields are required!!!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("You need to Signup first!!!");
  }

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) {
    throw new BadRequestError("Invalid Credentials!!!");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const loggedUser = await User.findById(user?._id).select(
    "-password -refreshToken",
  );

  res.cookie("refreshToken", refreshToken, options).status(200).json({
    success: true,
    message: "Welcome Back!",
    user: loggedUser,
    accessToken,
  });
});

// Logout
export const logout = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found!!!");
  }
  if (!user?.refreshToken) {
    throw new UnauthorizedError("You already logged out!!!");
  }

  await User.findByIdAndUpdate(
    userId,
    { $unset: { refreshToken: "" } },
    { new: true },
  );

  res.clearCookie("refreshToken").status(200).json({
    success: true,
    message: "Logged out!!!",
  });
});

// refresh the access token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new UnauthorizedError("You need to login first");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new UnauthorizedError("Invalid or Expired token!!!");
  }

  const user = await User.findById(decoded?._id);
  if (user?.refreshToken !== refreshToken) {
    throw new UnauthorizedError("Invalid Refresh Token");
  }

  const newRefreshToken = await user.generateRefreshToken();
  const newAccessToken = await user.generateAccessToken();

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, options).status(200).json({
    success: true,
    message: "Success",
    accessToken: newAccessToken,
  });
});

// current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new BadRequestError("User not found!!!");
  }

  res.status(200).json({
    success: true,
    message: "User found",
    user,
  });
});
