import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

console.log("Server running on port 3000");

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("message", (data) => {
    console.log(`${data.user}: ${data.text}`);

    socket.broadcast.emit("message", data);
  });

  socket.on("new_user", (username) => {
    socket.username = username;
    socket.broadcast.emit("new_user", username)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
