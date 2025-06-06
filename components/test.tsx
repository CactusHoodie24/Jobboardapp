import { signIn } from "@/auth"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
 
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
          redirectTo: "/jobs", // optional: redirect after login
        })
      }}
    >
      <label>
        Email
        <Input name="email" type="email" />
      </label>
      <label>
        Password
        <Input name="password" type="password" />
      </label>
      <Button className="mt-2.5">Sign In</Button>
    </form>
  )
}