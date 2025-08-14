'use client'
import { error } from 'console'
import React, { useActionState, useState, useEffect } from 'react'
import {CreatePost} from './createPost'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { prisma } from '@/prisma'

const intialState = {
    message: '',
    error: '',
}

type Company = {
  id: number;
  name: string;
  industry?: string;
  location?: string;
  website?: string;
};

const PostJob = () => {
    const [state, formAction, pending] = useActionState(CreatePost, intialState)
    const [companies, setCompanies] = useState<Company[]>([])
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/company')
        const data = await res.json()
        setCompanies(data)
      } catch (err) {
        console.error("Failed to fetch companies", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
        <Card className="w-[350px] ml-72">
      <CardHeader>
        <CardTitle>Create a Job listing</CardTitle>
        <CardDescription>Fill in the details of that Job.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
              <Label htmlFor="name">Title</Label>
            <Input type='text' name='title' placeholder='title of the job'/>
              <Label htmlFor="name">Description</Label>
            <Input type='text' name='description' placeholder='Description of the job'/>
              <Label htmlFor="name">Location</Label>
            <Input type='text' name='location' placeholder='Name of the location'/>
              <Label htmlFor="name">SalaryMin</Label>
            <Input type='text' name='salaryMin' placeholder='Amount of Minimum Salary'/>
              <Label htmlFor="name">SalaryMax</Label>
            <Input type='text' name='salaryMax' placeholder='Amount of Maximum Salary'/>
          <Label htmlFor="companyId">Company</Label>
            <select
              name="companyId"
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              required
              className="w-full border rounded p-2 mt-1"
              value={selectedCompanyId}
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
                <Button disabled={pending} type='submit'> {pending ? 'Submitting...' : 'Submit'}</Button>
                </CardFooter>
            {state.error && <h2 className='text-amber-700'>{state.error}</h2>}
            {state.message && <h2 className='text-amber-700'>{state.message}</h2>}
        </form>
         </CardContent>
    </Card>
    </div>
  )
}

export default PostJob;