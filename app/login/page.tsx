import SignIn from '@/components/sign-in'
import { SignInTag } from '@/components/test'
import React from 'react'
import LoginForm from './login-form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cookies } from "next/headers";
import OnboardingWelcomeBlock from '@/components/creative-tim/blocks/onboarding-welcome-block'


const Login = async () => {
  const visited = (await cookies()).get("visited")?.value;
  return (
    <>
   <main className="flex justify-center items-center">
    {!visited ? <OnboardingWelcomeBlock /> : (
<div className="flex flex-col justify-center items-center h-[300px] w-[300px]">
    <LoginForm register='account' />
    <Label className='mt-2.5'>OR WITH</Label>
     <div className='mt-3'>
      <div className='ml-2 flex bg-gray-200 px-12 border rounded-sm'>
      <SignIn />
      <Label className='text-black'>Sign using Google</Label>
      </div>
    </div>
  </div>
    )}
  </main>
</>
  )
}

export default Login;
