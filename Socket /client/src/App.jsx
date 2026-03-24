import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./hooks/useAuthContext";
import { connectSocket } from "./utils/socket";

const App = () => {
  
  const { token } = useAuthContext();
  useEffect(() => {
    if (token) {
      connectSocket(token);
    }
  }, [token]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Dashboard />} />
        <Route path="/chat/:chatId" element={<Dashboard />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
