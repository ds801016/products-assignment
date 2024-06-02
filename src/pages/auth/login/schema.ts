import * as z from "zod";

export const LoginSchema = z.object({
  userName: z.string().min(3, "Username is required"),
  password: z.string().min(3, "Password is required"),
});

export type LoginType = z.infer<typeof LoginSchema>;
