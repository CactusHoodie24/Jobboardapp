import { signIn } from "@/auth"
 
export function SignInTag() {
  return (
    <form
      action={async (formData) => {
        "use server"

        const email = formData.get("email")?.toString()
        const password = formData.get("password")?.toString()

        await signIn("credentials", {
          email,
          password,
          redirectTo: "/jobs" // optional: redirect after login
        })
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}