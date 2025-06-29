'use client'
import { SignOut } from '@/components/ui/signout'
import React, { useActionState } from 'react'
import { SavePost } from './saveTets'
import { error } from 'console'
import { emitWarning } from 'process'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Testing from './testing'

const initialState = {
  errors: {
    email: '',
    name: ''
  }
}

export default function Jobs() {
  const [state, action, isPending] = useActionState(SavePost, initialState)
  return (
    <div>
        <SignOut />
        <Testing />
        <form action={action}>
        <Input type='text' name='email' placeholder='email' />
        <Input type='text' name='name' placeholder='name' />
        <Button type='submit'>Submit</Button>
        {state?.errors.email && <h2>{state.errors.email}</h2>}
        {state?.errors.name && <h2>{state.errors.name}</h2>}
        </form>
    </div>
  )
}
