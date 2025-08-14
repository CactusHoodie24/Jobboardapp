"use server"

import { signIn } from "@/auth"
import { loginSchema } from "./zod"
import { AuthError } from "next-auth"

export type LoginState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
  success?: boolean
}

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  // Validate form fields
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    })

    return { success: true }
  } catch (error: any) {
    console.log("Full error object:", error)
    console.log("Error type:", error?.type)
    console.log("Error message:", error?.message)
    console.log("Error cause:", error?.cause)
    console.log("Error cause message:", error?.cause?.message)
    console.log("Error constructor name:", error?.constructor?.name)

    // Check for NextAuth CallbackRouteError with "Login failed" cause
    if (
      error?.type === "CallbackRouteError" &&
      (error?.cause?.err?.message === "Login failed" ||
        error?.cause?.message === "Login failed" ||
        error?.message?.includes("Login failed"))
    ) {
      return { message: "Invalid email or password" }
    }

    // Fallback: Check for AuthError types
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid email or password" }
        default:
          return { message: "Something went wrong" }
      }
    }

    // Additional fallback checks for error messages
    const errorMessage = error?.message || ""
    const causeMessage = error?.cause?.message || ""

    if (
      errorMessage.includes("CredentialsSignin") ||
      errorMessage.includes("Invalid credentials") ||
      errorMessage.includes("Sign in failed") ||
      errorMessage.includes("Login failed") ||
      causeMessage.includes("Login failed")
    ) {
      return { message: "Invalid email or password" }
    }

    console.error("Unexpected login error:", error)
    return { message: "Something went wrong" }
  }
}
