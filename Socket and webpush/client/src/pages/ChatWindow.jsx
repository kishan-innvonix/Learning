import { useRef, useState } from "react";
import { socket } from "../utils/socket";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const ChatWindow = ({ user, chat }) => {
  const { userId } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(chat?.messages || []);
  }, [chat]);

  // scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (socket) {
      socket.emit("new_message", {
        message: input,
        id: user._id,
      });
    }
    await axiosInstance.post(`/api/chat/message/send/${chat._id}`, {
      message: input,
    });
    setMessages((prev) => [...prev, { text: input, sender: userId }]);
    setInput("");
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = ({ message, sender }) => {
      setMessages((prev) => [...prev, { text: message, sender }]);
    };
    
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-white font-semibold">{user.name}</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[60%] px-3 py-2 rounded-lg text-sm 
            ${
              msg?.sender === userId
                ? "bg-black text-white self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg?.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2 bg-white">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
