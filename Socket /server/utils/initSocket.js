import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) return next(new Error("Token not found"));

      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = user;
      next();
    } catch (error) {
      next(new Error(error));
    }
  });

  io.on("connection", (socket) => {
 
    socket.join(socket.user._id)

    socket.on("new_message", ({id, message}) => {

      io.to(id).emit("receive_message", {
        message,
        sender: socket.user._id
      });
    });
  });
};
