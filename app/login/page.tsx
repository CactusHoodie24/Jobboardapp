import SignIn from '@/components/sign-in'
import { SignInTag } from '@/components/test'
import React from 'react'
import LoginForm from './login-form'
import { Label } from '@/components/ui/label'

const Login = () => {
  return (
    <>
   <main className="h-screen flex justify-center items-center">
  
  <div className="flex flex-col justify-center items-center h-[300px] w-[300px]">
    <LoginForm />
     <div className='mt-3'>
      <div className='ml-10'>
      <SignIn />
      </div>
     <Label>Sign using Google</Label>
    </div>
  </div>
</main>
</>
  )
}

export default Login;
