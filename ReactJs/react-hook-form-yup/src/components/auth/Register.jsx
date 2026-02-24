import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import axios from "axios";

const Register = () => {
  const userSchema = yup.object({
    name: yup.string().required("Name is required!!!"),
    email: yup
      .string()
      .email("Invalid Email!!!")
      .required("Email is required!!!"),
    password: yup.string().min(6, "Pass is too weak").required(),
    gender: yup.string().required("Select gender"),
    confirmPass: yup
      .string()
      .oneOf([yup.ref("password")], "Password not match!!")
      .required("Confirm your password"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users`,
        formData,
      );
      localStorage.setItem("token", data?.token);
      reset();
      window.location.href = "/dashboard"; // redirect
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = () =>
    Object.values(errors)[0] && (
      <p className="text-red-500 text-sm mb-2">
        {Object.values(errors)[0]?.message}
      </p>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-xl w-[380px] flex flex-col gap-3"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Create Account
        </h2>

        <Input
          type="text"
          label="Name"
          id="name"
          register={register}
          fieldName="name"
          error={errors.name}
        />

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

        <Input
          type="password"
          label="Confirm Password"
          id="confirmPass"
          register={register}
          fieldName="confirmPass"
          error={errors.confirmPass}
        />
        <div className="flex gap-6">
          <Input
            type="radio"
            label="Male"
            value="male"
            id="male"
            register={register}
            fieldName="gender"
            error={errors.gender}
          />

          <Input
            type="radio"
            label="Female"
            value="female"
            id="female"
            register={register}
            fieldName="gender"
            error={errors.gender}
          />
        </div>

        {/* {errors.gender && (
  <p className="text-red-500 text-sm">{errors.gender.message}</p>
)} */}

        <textarea
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="About..."
          {...register("bio")}
        />

        {/* {handleError()} */}

        <input
          type="submit"
          value="Register"
          className="bg-indigo-600 text-white py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition"
        />

        <p className="text-sm text-center text-gray-600 mt-2">
          Don't have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
