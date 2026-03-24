import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid Email!!!").required("Email Required!!!"),
  password: yup.string().required("Password Required!!!"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name Required!!!"),
  username: yup.string().required("Username Required!!!").trim().lowercase(),
  email: yup.string().email("Invalid Email").required("Email Required!!!"),
  password: yup
    .string()
    .min(6, "Minimum 6 char Required!!!")
    .required("Password Required!!!"),
});
