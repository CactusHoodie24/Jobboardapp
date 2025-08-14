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

export const signUpSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(3, "Password must be more than 3 characters")
    .max(32, "Password must be less than 32 characters"),
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .min(3, "Name must be more than 3 charcaters")
    .max(32,"Name can not be more than 32 characters")
})

export const ProfileSchema = object({
  phonenumber: string({ required_error: "phone number is required"})
    .min(1, "Phone number is required")
    .min(10, "Phone number must be mor than 10 characters")
    .max(13, 'Phone number must not exceed 13 characters')
})


export const signInSchema = z.object({
    name: z.string().min(1, {message: 'Username must be more than 1 character'}),
    email: z.string().min(1, {message: 'Email is less than 1 character'}).email({message: 'A valid Email is required'})
})

export type LoginInput = z.infer<typeof signInSchema>
export type SignInput = z.infer<typeof signUpSchema>
export type ProfileInput = z.infer<typeof ProfileSchema>