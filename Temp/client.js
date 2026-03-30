import { io } from "socket.io-client";
import readline from "readline";

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username = "";

//  Step 1: Ask name on initial load
rl.question("Enter your name: ", (name) => {
  username = name.trim() || "Anonymous";
  socket.emit("new_user", username);
  console.log(`Welcome ${username}! You can start chatting...\n`);
  rl.setPrompt(`${username} ${Date.now()}: `);
  rl.prompt();

  //  Start listening for messages after name is set
  startChat();
});

function startChat() {
  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.on("new_user", (data) => {
    console.log(`\n👤 ${data} joined the chat`);
    rl.prompt(true);
  });

  socket.on("message", (data) => {
    console.log(`\n📩 ${data.user}: ${data.text}`);
    rl.prompt(true);
  });

  //  Send message with username
  rl.on("line", (input) => {
    console.log(`\n🟢 You: ${input}`);

    socket.emit("message", {
      user: username,
      text: input,
    });

    rl.prompt(true);
  });
}
