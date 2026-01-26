import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from './../utils/axiosConfig';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (formData, reset) => {
    setIsLogin(true);

    const response = toast.promise(
      axiosInstance.post(`/user/login`, formData),
      {
        loading: "Login...",
        success: (response) => response?.data?.message || "Success",
        error: (err) => err?.response?.data?.message || "Something went wrong",
      },
    );

    try {
      const { data } = await response;
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch({ type: "LOGIN", payload: data?.user });
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
      axiosInstance.post(`/user/register`, formData),
      {
        loading: "Creating account...",
        success: (response) =>
          response?.data?.message || "Account created successfully!!!",
        error: (err) => err?.response?.data?.message || "Something went wrong",
      },
    );

    try {
      const { data } = await response;
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch({ type: "REGISTER", payload: data?.user });
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSignup(false);
    }
  };

  const logout = () => {
    try {
      toast.success("Logout!!!");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };
  return { login, signup, logout, isLogin, isSignup };
};
