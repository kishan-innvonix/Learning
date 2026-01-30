import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/ApiError.js";

const options = {
  httpOnly: true,
  secure: true,
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isExistUser = await User.findOne({ email });
  if (isExistUser) {
    throw new BadRequestError("Email already in use");
  }

  await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: "Welcome",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Invalid Email!!!");
  }

  const check = user.isPasswordCorrect(password);
  if (!check) {
    throw new UnauthorizedError("Invalid Credentials!!!");
  }

  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  res.cookie("refreshToken", refreshToken, options).status(200).json({
    success: true,
    message: "Welcome back!",
    accessToken,
  });
});

export const logout = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: { refreshToken: "" },
    },
    { new: true },
  );
  if (!user) {
    throw new NotFoundError("User not found!!!");
  }

  res.clearCookie("refreshToken", options).status(200).json({
    success: true,
    message: "Logged out!!!",
  });
});

export const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );
  if (!user) {
    throw new NotFoundError("User not found!!!");
  }
  res.status(200).json({
    success: true,
    message: "Success",
    user,
  });
});

export const refreshUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new UnauthorizedError("You need to login!!!");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new NotFoundError("User not found!!!");
  }

  if (user?.refreshToken !== refreshToken) {
    throw new BadRequestError("Invalid Token");
  }

  const newRefreshToken = await user.generateRefreshToken();
  const newAccessToken = await user.generateAccessToken();

  const updatedUser = await User.findByIdAndUpdate(
    user?._id,
    {
      $set: { refreshToken: newRefreshToken },
    },
    { new: true },
  ).select("-password -refreshToken");

  res.cookie("refreshToken", newRefreshToken, options).status(200).json({
    success: true,
    message: "Welcome back!",
    user: updatedUser,
    accessToken: newAccessToken,
  });
});

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");

  res.status(200).json({
    success: true,
    message: "Fetched users successfully",
    users,
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new NotFoundError("User not found!!!");
  }

  res.status(200).json({
    success: true,
    message: "Fetched user successfully",
    user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new NotFoundError("No Id found!!!");
  }

  if (id === req.user._id) {
    throw new BadRequestError("You are not allow to remove your self");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found!!!");
  }

  if (user?.role === "admin" && req.user.role === "admin") {
    throw new ForbiddenError("Admin not allow to delete another admin");
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Deleted successfully",
    deletedUserId: id,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req?.user?._id, req?.body, {
    new: true,
  });
  if (!updatedUser) {
    throw new NotFoundError("User not found!!!");
  }

  res.status(200).json({
    success: true,
    message: "Updated successfully",
    updatedUser,
  });
});
