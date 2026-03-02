import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Input from "./Input";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NewPasswordForm } from "../../types/form";

const ResetPassword = () => {
  const schema = yup.object({
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 chars")
      .required("New password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { email } = useParams();

  const onSubmit = async (formData:NewPasswordForm) => {
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/reset-password`,
        {
          email,
          newPassword: formData.newPassword,
        },
      );

      setMessage(data?.message || "Password reset successful");

      // redirect to login after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setMessage("Failed to reset password");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-xl w-[360px] flex flex-col gap-3"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Reset Password
        </h2>

        <Input
          type="password"
          label="New Password"
          id="newPassword"
          register={register}
          fieldName="newPassword"
          error={errors.newPassword}
        />

        <Input
          type="password"
          label="Confirm Password"
          id="confirmPassword"
          register={register}
          fieldName="confirmPassword"
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
        )}

        <p className="text-sm text-center text-gray-600 mt-2">
          Back to{" "}
          <a href="/login" className="text-indigo-600 font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
