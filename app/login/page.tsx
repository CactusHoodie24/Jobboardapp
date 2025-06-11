import SignIn from '@/components/sign-in'
import { SignInTag } from '@/components/test'
import React from 'react'
import LoginForm from './login-form'
import { Label } from '@/components/ui/label'

const Login = () => {
  return (
    <>
   <main className="bg-white h-screen flex justify-center items-center">
  
  <div className="flex flex-col justify-center items-center h-[300px] bg-gray-100 rounded-md shadow-md w-[300px]">
    <div className='mb-1'>
     <SignIn />
    </div>
    <LoginForm />
  </div>
</main>
</>
  )
}

export default Login;
