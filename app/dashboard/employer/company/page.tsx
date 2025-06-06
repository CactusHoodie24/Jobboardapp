'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { error } from 'console'
import React, { useActionState } from 'react'
import { CreateCompany } from './createCompany'

const intialState = {
    message: '',
    error: ''
}

const CompanyPage = () => {
    const [state, formAction, pending] = useActionState(CreateCompany, intialState)
  return (
    <div>
     <form action={formAction}>
      <Label htmlFor="name">Name</Label>
            <Input type='text' name='name' placeholder='name of company'/>
              <Label htmlFor="name">Industry</Label>
            <Input type='text' name='industry' placeholder='type of industry'/>
              <Label htmlFor="name">Location</Label>
            <Input type='text' name='location' placeholder='type of location'/>
              <Label htmlFor="name">Website</Label>
            <Input type='text' name='website' placeholder='type of website'/>
            <Button type='submit'>Submit</Button>
     </form>
     {state.error && <h2>{state.error}</h2>}
     {state.message && <h2>{state.message}</h2>}
    </div>
  )
}

export default CompanyPage