import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "./../utils/axiosConfig";
import { connectSocket } from "../utils/socket";
import { useEffect } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { setToken, setUserId, userId, token} = useAuthContext();
  const navigate = useNavigate();

  const login = async (formData, reset) => {
    setIsLogin(true);

    const response = toast.promise(
      axiosInstance.post(`/api/user/login`, formData),
      {
        loading: "Login...",
        success: (response) => response?.data?.message || "Success",
        error: (err) => err?.response?.data?.message || "Something went wrong",
      },
    );

    try {
      const { data } = await response;
      console.log(data)
      localStorage.setItem("accessToken", JSON.stringify(data?.accessToken));
      localStorage.setItem("userId", JSON.stringify(data?.userId));
      connectSocket(data?.accessToken)
      
      setToken(data?.accessToken);
      setUserId(data?.userId)
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLogin(false);
    }
  };

  const signup = async (formData, reset) => {
    setIsSignup(true);

    const response = toast.promise(
      axiosInstance.post(`/api/user/register`, formData),
      {
        loading: "Creating account...",
        success: (response) =>
          response?.data?.message || "Account created successfully!!!",
        error: (err) => err?.response?.data?.message || "Something went wrong",
      },
    );

    try {
      await response;
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSignup(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post(`/api/user/logout`);
      toast.success("Logout!!!");
      localStorage.removeItem("accessToken");
      setToken("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };
  return { login, signup, logout, isLogin, isSignup };
};
