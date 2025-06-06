
import { signIn } from "@/auth"
import { Button } from "./ui/button"
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import { Label } from "./ui/label";
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", {
            redirectTo: '/jobs'
        })
      }}
    >
      <Label>SIgnIn using</Label>
      <Button type="submit" variant="secondary" size="icon" className="size-8">
        <FaGoogle className="text-yellow-500"/>
      </Button>
    </form>
  )
} 