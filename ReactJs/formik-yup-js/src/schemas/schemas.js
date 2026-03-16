import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Min 3 character required!")
    .max(10, "Max 10 character!!!"),
  email: Yup.string().email("Invalid email").trim().test(
    "email-check",
    "Email already in use",
    async (value) => {
        await new Promise((resolve) => setTimeout(resolve, 600))

        const usedEmail = ['kp19@gmail.com']

        return !usedEmail.includes(value)
    }
  ),
});
