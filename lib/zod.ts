import { object, string, z } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(3, "Password must be more than 3 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const signInSchema = z.object({
    name: z.string().min(1, {message: 'Username must be more than 1 character'}),
    email: z.string().min(1, {message: 'Email is less than 1 character'}).email({message: 'A valid Email is required'})
})

export type LoginInput = z.infer<typeof signInSchema>