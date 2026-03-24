import { BadRequestError, NotFoundError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const createChat = asyncHandler(async (req, res) => {
  const { users } = req.body;

  if (!users || users.length === 0) {
    throw new NotFoundError("Members not found");
  }

  const ifExist = await Chat.find({
    users: {
      $all: users,
    },
  });

  if (ifExist.length !== 0) {
    return res.status(200).json({
      success: true,
      message: "Already created",
      chat: ifExist[0],
    });
  }

  const chat = await Chat.create({
    users,
  });

  res.status(201).json({
    success: true,
    message: "New chat created!!!",
    chat,
  });
});

export const getChatMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.id;

  if (!chatId) {
    throw new BadRequestError("Validation fail!!!");
  }

  const chat = await Chat.findById(chatId).populate({
    path: "users",
    select: "-password",
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    chat,
  });
});

export const getAllChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = User.findById(userId).select("-password");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const chats = await Chat.find({
    users: userId,
  }).populate({
    path: "users",
    select: "-password",
  });
  console.log(chats);
  res.status(200).json({
    success: true,
    message: "Chats found!!!",
    chats,
  });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const chatId = req.params.id;

  if (!message || !chatId) {
    throw new BadRequestError("Validation fail!!!");
  }

  const chat = await Chat.findById(chatId);

  const msg = {
    sender: req.user._id,
    text: message,
  };

  chat.messages.push(msg);
  await chat.save();

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
  });
});
