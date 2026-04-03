import { BadRequestError, NotFoundError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import PushSubscription from "../models/push.model.js";
import webpush from "web-push";
import dotenv from "dotenv";
import { connectedUsers } from "../utils/initSocket.js";

dotenv.config();

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

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

  const otherUserId = users.find(
    (u) => u.toString() !== req.user._id.toString(),
  );

  // Only send web push if the other user is NOT connected to socket
  const isOtherUserOnline = connectedUsers.has(otherUserId?.toString());

  if (!isOtherUserOnline) {
    const subscription = await PushSubscription.findOne({
      userId: otherUserId,
    });

    if (subscription) {
      const sender = await User.findById(req.user._id).select("username");

      const pushPayload = JSON.stringify({
        title: "New Chat",
        body: `${sender?.username} started a chat with you`,
        icon: "/icon.png",
      });

      try {
        await webpush.sendNotification(
          { endpoint: subscription.endpoint, keys: subscription.keys },
          pushPayload,
        );
      } catch (err) {
        console.error("Push notification failed (createChat):", err.message);
      }
    }
  }

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

  if (!chat) {
    throw new NotFoundError("Chat not found");
  }

  const msg = {
    sender: req.user._id,
    text: message,
  };

  chat.messages.push(msg);
  await chat.save();

  // Find the recipient (the other user in the chat)
  const recipientId = chat.users.find(
    (u) => u.toString() !== req.user._id.toString(),
  );

  // Only send web push if the recipient is NOT connected to socket
  const isRecipientOnline = connectedUsers.has(recipientId?.toString());

  if (!isRecipientOnline && recipientId) {
    const subscription = await PushSubscription.findOne({
      userId: recipientId,
    });

    if (subscription) {
      const sender = await User.findById(req.user._id).select("username");

      const pushPayload = JSON.stringify({
        title: `New message from ${sender?.username}`,
        body: message,
        icon: "/icon.png",
        url: `/chat/${chatId}`,
      });

      try {
        await webpush.sendNotification(
          { endpoint: subscription.endpoint, keys: subscription.keys },
          pushPayload,
        );
      } catch (err) {
        console.error("Push notification failed (sendMessage):", err.message);
      }
    }
  }

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
  });
});
