'use client'

import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "./button"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Job {
  id: number
  title: string
  description: string
  location: string | null
  salaryMin: number | null
  salaryMax: number | null
  postedAt: Date;
  company: {
    name: string
  }
}



export default function CarouselSpacing({ job }: { job: Job } ) {
  const { data: session } = useSession()
  const isLoggedIn = Boolean(session?.user)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [searchedJob, setSearchedJob] = useState<Job[]>([])
  const [error, setError] = useState(false)
  const router = useRouter()


  const handleSend = (id: number) => {
    if (!session?.user?.email) {
      toast.warning("You must be logged in to apply", {
        action: {
          label: "Login",
          onClick: () => router.push('/login'), 
        },
        onDismiss: () => router.push('/login'), 
      })
      return
    }
    const sendData = async () => {
      const payload = {
        jobId: id,
        userEmail: session?.user?.email,
      }

      try {
        const res = await fetch('/api/application/application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          setIsSubmitted(true)
        } else {
          setIsSubmitted(false)
        }

        if (res.status === 401) {
          setError(true)
        }
      } catch (error) {
        setIsSubmitted(false)
      }
    }
    sendData()
  }


  return (
    <Button onClick={() => handleSend(job.id)} className="w-[400px]">
      Apply
    </Button>
  )
}
