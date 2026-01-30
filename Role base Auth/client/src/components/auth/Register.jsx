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
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="text-2xl font-bold ">Signup</h1>

        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id={"name"}
            label={"Name"}
            type={"text"}
            {...register("name")}
            error={errors.name}
          />
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
            className={`border text-lg px-10 py-1 rounded bg-black text-white font-bold cursor-pointer  mt-2`}
            type="submit"
            value={isSignup ? "Signup..." : "Signup"}
            disabled={isSignup}
          />
        </form>

        <p>
          Already Signup?{" "}
          <Link
            className="underline hover:text-zinc-700 font-bold"
            to={"/login"}
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
