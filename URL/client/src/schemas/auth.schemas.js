import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid Email!!!").required("Email Required!!!"),
  password: yup.string().required("Password Required!!!"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name Required!!!"),
  email: yup.string().email("Invalid Email").required("Email Required!!!"),
  password: yup
    .string()
    .min(6, "Minimum 6 char Required!!!")
    .required("Password Required!!!"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password")], "Password didn't Match!!!")
    .required("Password Required!!!"),
});
