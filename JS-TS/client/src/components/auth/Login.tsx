import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Input from "./Input";
import { useState } from "react";
import { User } from "../../types/user";

const Login = () => {
  const loginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 chars")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData:User) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        formData,
      );

      localStorage.setItem("token", data?.token);

      // redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Invalid credentials");
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
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <Input
          type="email"
          label="Email"
          id="email"
          register={register}
          fieldName="email"
          error={errors.email}
        />

        <Input
          type="password"
          label="Password"
          id="password"
          register={register}
          fieldName="password"
          error={errors.password}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? "Login..." : "Login"}
        </button>
        <a href="/forget" className="text-blue-500 underline font-medium">
          forget password
        </a>
        <p className="text-sm text-center text-gray-600 mt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
