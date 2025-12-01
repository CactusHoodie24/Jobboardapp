
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
      <Button type="submit" size="icon" className="size-8 cursor-pointer px-2.5">
        <FaGoogle className=""/>
      </Button>
    </form>
  )
} 