'use client'

import { signIn} from "next-auth/react"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SignInTag() {  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false // don't redirect automatically
    })

    if (result?.ok) {
       console.error("Login error:", result.error)
   
    } else {
     
      alert("Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button className="mt-2.5" type="submit">Sign In</Button>
      {error && <h2>{error}</h2>}
    </form>
  )
}