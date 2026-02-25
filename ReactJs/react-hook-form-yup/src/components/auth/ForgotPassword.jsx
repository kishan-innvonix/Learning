import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const otpSchema = yup.object({
    otp: yup
      .string()
      .min(6, "otp must be of six digit")
      .max(6, "otp must be of six digit")
      .required("OTP is required"),
  });

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [optField, setOptField] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);
    setLoading(true);
    setMessage("");

    try {
      if (optField) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/verify-otp`,
          { ...formData, email: emailValue },
        );
        setMessage(data?.message || "Otp verified successfully");
        setOptField(false);
        navigate(`/reset/${emailValue}`);
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/forget-pass-otp`,
          formData,
        );

        setMessage(data?.message || "Password reset link sent to your email.");
        setEmailValue(formData.email);
        setOptField(true);
      }
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          "Failed to send reset link. Try again.",
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={
          optField ? otpHandleSubmit(onSubmit) : emailHandleSubmit(onSubmit)
        }
        className="bg-white p-8 rounded-2xl shadow-xl w-90 flex flex-col gap-3"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 text-center">
          Enter your email to receive a reset link
        </p>

        {!optField && (
          <Input
            type="email"
            label="Email"
            id="email"
            register={emailRegister}
            fieldName="email"
            error={errors.email}
          />
        )}

        {optField && (
          <Input
            type="text"
            label="Otp"
            id="otp"
            register={otpRegister}
            fieldName="otp"
            error={otpErrors.otp}
          />
        )}

        {optField ? (
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        ) : (
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Sending..." : "Send otp"}
          </button>
        )}

        {message && (
          <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
        )}

        <p className="text-sm text-center text-gray-600 mt-2">
          Remember password?{" "}
          <a href="/login" className="text-indigo-600 font-medium">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
