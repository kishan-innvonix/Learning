import { z } from "zod"

export const registerSchema = z.object({
    name: z
      .string("Name is required!!!")
      .trim()
      .min(1, "Name is required!!!")
      .max(10, "Max 10 character!!!"),
    email: z.string().trim().email("Invalid Email type")
}) 

export type registerValueType = z.infer<typeof registerSchema>;
