import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({message: "Email is Required"}),
  password: z.string().min(8, "Password is Required")
});

export const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
});