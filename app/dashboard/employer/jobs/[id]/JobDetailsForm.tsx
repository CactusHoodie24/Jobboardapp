'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'

type Job = {
  id: number
  title: string
  description: string | null
  location: string | null
  salaryMin: number | null
  salaryMax: number | null
}

export default function JobDetailsForm({ job }: { job: Job }) {
  const [description, setDescription] = useState(job.description ?? '')
  const [title, setTitle] = useState(job.title ?? '')
   const [status, setStatus] = useState('')
  const companyId = job.id

   const handleUpdate = async () => {
    const res = await fetch(`/api/company/${companyId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })

    if (res.ok) {
      setStatus("Update successful")
    } else {
      const err = await res.json()
      setStatus(`Error: ${err.error}`)
    }
  }

  const handleDelete = async (companyId: number) => {
    const deleteD = await fetch(`/api/delete/${companyId}`,
        {
            method: 'DELETE',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({companyId})
        }
    )
    if(deleteD.ok) {
        setStatus('Deleted Successfully');
    } else {
              const err = await deleteD.json()
      setStatus(`Error: ${err.error}`)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{job.title}</h1>

      <Label className="block mb-2 font-medium">Title</Label>
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
        <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
         <button onClick={handleUpdate}>Update</button>
         <Button onClick={() => handleDelete(companyId)}>Delete</Button>
      <p>{status}</p>
    </div>
  )
}
