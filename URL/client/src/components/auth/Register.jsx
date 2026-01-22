import Layout from "../Layout";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/auth.schemas";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import FormError from "./FormError";
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

  const {signup, isSignup} = useAuth()

  const onSubmit = async (formData) => {
    signup(formData, reset)
  };

  return (
    <Layout>
      <AuthLayout
        leftTitle={"One account. Endless links."}
        leftDescription={"Manage, track, and share your links all in one place"}
        leftSubText={"Create your free account and get started in seconds."}
        authTitle={"Signup"}
      >
        <form
          className="flex flex-col items-center md:[70% ] lg:w-[50%] sm:w-[70%] w-[80%] gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id={"name"}
            label={"Name"}
            type={"text"}
            {...register("name")}
          />
          <Input
            id={"email"}
            label={"Email"}
            type={"email"}
            {...register("email")}
          />
          <Input
            id={"password"}
            label={"Password"}
            type={"password"}
            {...register("password")}
          />
          <Input
            id={"confirmPass"}
            label={"Confirm Password"}
            type={"password"}
            {...register("confirmPass")}
          />
          <input
            className={`border text-lg px-10 py-1 rounded bg-black text-white font-bold cursor-pointer  mt-2`}
            type="submit"
            value={isSignup ? "Signup...": "Signup"}
            disabled={isSignup}
          />
        </form>

        {/* Error handling */}
        <FormError errors={errors} />

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
      </AuthLayout>
    </Layout>
  );
};

export default Register;
