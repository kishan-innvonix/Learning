import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";

const Register = () => {
  const userSchema = yup.object({
    name: yup.string().required("Name is required!!!"),
    email: yup
      .string()
      .email("Invalid Email!!!")
      .required("Email is required!!!"),
    password: yup.string().min(6, "Pass is too weak").required(),
    gender: yup.string().required(),
    skills: yup.array().min(1, "Required At least one Skill").max(3).required(),
    confirmPass: yup
      .string()
      .oneOf([yup.ref("password")], "Password not match!!")
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset()
  };

  const showErrors = (fieldName) => {
    return errors[fieldName] && <p>{errors[fieldName].message}</p>;
  };

  const handleError = () => {
    return (
      Object.values(errors) && <p className="text-red-600 text-sm "> {Object.values(errors)[0]?.message} </p>
    );
  };

  return (
    <div className="flex justify-center items-center w-full h-lvh">
      <form className="flex flex-col gap-1 w-md" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label={"Name"}
          id={"name"}
          register={register}
          fieldName={"name"}
        />
        <Input
          type="email"
          label={"Email"}
          id={"email"}
          register={register}
          fieldName={"email"}
        />
        <Input
          type="password"
          label={"Password"}
          id={"password"}
          register={register}
          fieldName={"password"}
        />
        <Input
          type="password"
          label={"Confirm Password"}
          id={"confirmPass"}
          register={register}
          fieldName={"confirmPass"}
        />

        <div className="gender">
          <Input
            type={"radio"}
            label={"Male"}
            value={"male"}
            id={"male"}
            register={register}
            fieldName={"gender"}
          />
          <Input
            type={"radio"}
            label={"Female"}
            value={"female"}
            id={"female"}
            register={register}
            fieldName={"gender"}
          />
        </div>

        <div className="skills">
          <Input
            type={"checkbox"}
            label={"React"}
            value={"react"}
            id={"react"}
            register={register}
            fieldName={"skills"}
          />
          <Input
            type={"checkbox"}
            label={"Node"}
            value={"node"}
            id={"node"}
            register={register}
            fieldName={"skills"}
          />
          <Input
            type={"checkbox"}
            label={"Mongo"}
            value={"mongo"}
            id={"mongo"}
            register={register}
            fieldName={"skills"}
          />
        </div>

        <textarea className="border px-1 " placeholder="About..." {...register("about")}></textarea>

        {/* {errors.name && <p>{errors.name.message}</p>}
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {errors.confirmPass && <p>{errors.confirmPass.message}</p>}
        {errors.gender && <p>{errors.gender.message}</p>}
        {errors.skills && <p>{errors.skills.message}</p>} */}
        {handleError()}
        {/* {showErrors("name")}
        {showErrors("email")}
        {showErrors("password")}
        {showErrors("confirmPass")}
        {showErrors("gender")}
        {showErrors("skills")} */}
        
        <input className="border px-1 py-0.5 " type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Register;
