import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import validator from "validator";
import { BadRequestError } from "../utils/ApiError.js";

// Register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("All fields are required!!!");
  }

  if (!validator.isEmail(email)) {
    throw new BadRequestError("Invalid Email!!!");
  }

  if (!validator.isStrongPassword(password)) {
    throw new BadRequestError("Password is too weak!!!");
  }

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

  res.status(200).json({
    success: true,
    message: "Welcome Back!",
    user: loggedUser,
    accessToken,
    refreshToken,
  });
});
