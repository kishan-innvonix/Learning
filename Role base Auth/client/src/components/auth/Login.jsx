import Layout from "../Layout";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/auth.schemas";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { login, isLogin } = useAuth();

  const onSubmit = async (formData) => {
    login(formData, reset);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full gap-4"> 
        <h1 className="text-2xl font-bold ">Login</h1>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id={"email"}
            label={"Email"}
            type={"email"}
            {...register("email")}
            error={errors.email}
          />
          <Input
            id={"password"}
            label={"Password"}
            type={"password"}
            {...register("password")}
            error={errors.password}
          />
          <input
            className="border text-lg px-10 py-1 rounded bg-black text-white font-bold cursor-pointer  mt-2"
            type="submit"
            value={isLogin ? "Login..." : "Login"}
            disabled={isLogin}
          />
        </form>

        <p>
          still not registered?{" "}
          <Link
            className="underline hover:text-zinc-700 font-medium"
            to={"/signup"}
          >
            {" "}
            Signup
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
