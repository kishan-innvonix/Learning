import Layout from "../Layout";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/auth.schemas";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { signup, isSignup } = useAuth();

  const onSubmit = async (formData) => {
    signup(formData, reset);
  };

  return (
    <Layout>
      <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200">
        
        <div className="bg-white shadow-2xl rounded-2xl px-8 py-6 w-[360px] flex flex-col gap-5">
          
          <h1 className="text-2xl font-bold text-center">Create Account</h1>

          <form
            className="flex flex-col items-center gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="name"
              label="Name"
              type="text"
              {...register("name")}
              error={errors.name}
            />

            <Input
              id="username"
              label="Username"
              type="text"
              {...register("username")}
              error={errors.username}
            />

            <Input
              id="email"
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password}
            />

            <button
              className="w-full bg-black text-white font-semibold py-2 rounded-lg 
              hover:bg-zinc-800 transition duration-200 active:scale-95 disabled:opacity-60"
              type="submit"
              disabled={isSignup}
            >
              {isSignup ? "Creating Account..." : "Signup"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-black font-semibold hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </Layout>
  );
};

export default Register;