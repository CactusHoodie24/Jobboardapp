"use client"

import { ChangeEvent, FormEvent, useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loginAction, type LoginState } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SignInput, signUpSchema } from "@/lib/zod"
import axios from 'axios'
import { signIn } from "next-auth/react";


export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {})
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: ''
  })
   const router = useRouter()
  const [errors, setErrors] = useState<Partial<Record<keyof SignInput, string>>>({})
  const [success, setSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)
    // Handle successful login
useEffect(() => {
  if (state.success) {
   window.location.href = "/dashboard/seeker/applications"
  }
}, [state.success, router]);



  const formData = {
    name: details.name,
    email: details.email,
    password: details.password
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsPending(true);

  const sendData = async () => {
    try {
      const res = await axios.post('/api/register', formData)

      if (res.status === 201 || res.status === 200) {

        setSuccess(true)
        // Auto-login after successful registration
     
              await signIn("credentials", {
          redirect: true, // Let NextAuth handle redirect after login
          email: details.email,
          password: details.password,
          callbackUrl: "/", // Redirect after successful login
        });

    }
    } catch (error) {
      setSuccess(false)
    } finally {
      setIsPending(false) // only handle pending state here
    }
  }

  sendData()
}


const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const newDetails = {
    ...details,
    [e.target.id]: e.target.value
  };

  setDetails(newDetails);

  const result = signUpSchema.safeParse(newDetails);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      name: fieldErrors.name?.[0] ?? '',
      email: fieldErrors.email?.[0] ?? '',
      password: fieldErrors.password?.[0] ?? ''
    });
  } else {
    setErrors({}); 
  }
};


  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="account">
      <TabsList>
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
             <TabsContent value="account">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            {state.errors?.email && <p className="text-sm text-red-600">{state.errors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {state.errors?.password && <p className="text-sm text-red-600">{state.errors.password[0]}</p>}
          </div>

          {state.message && <p className="text-sm text-red-600">{state.message}</p>}

          <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
          {state.success && <h2 className=" text-sm text-red-600">Login was a success</h2>}
        </form>
      </CardContent>
    </Card>
     </TabsContent>
     <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Enter the Details below to sign up.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">Email</Label>
                <Input onChange={handleChange} id="email" value={details.email} type="email" />
                {errors.email && <h4 className="text-red-500">{errors.email}</h4>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Full Name</Label>
                <Input onChange={handleChange} id="name" value={details.name} type="name" />
                {errors.name && <h4 className="text-red-500">{errors.name}</h4>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">Password</Label>
                <Input onChange={handleChange} id="password" value={details.password} type="password" />
                {errors.password && <h4 className="text-red-500">{errors.password}</h4>}
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isPending} type="submit">{isPending ? 'Submiting' : 'Submit'}</Button>
              {success && <h4>Success</h4>}
            </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
  )
}
