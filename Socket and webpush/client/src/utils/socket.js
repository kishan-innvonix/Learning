import { io } from "socket.io-client";

export let socket;

export const connectSocket = (token) => {
  
  socket = io(import.meta.env.VITE_BASE_URL, {
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    console.log(socket)
  })
  console.log(socket)
};
