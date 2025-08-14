'use client'

import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import AccordionDemo from "@/components/sideWall"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./button"
import { useSession } from "next-auth/react"
import { Input } from "./input"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, CheckCircle2Icon, ArrowLeft, ArrowRight } from "lucide-react"

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

interface CarouselSpacingProps {
  jobs: Job[]
}

export default function CarouselSpacing({ jobs }: CarouselSpacingProps) {
  const { data: session } = useSession()
  const isLoggedIn = Boolean(session?.user)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [searchedJob, setSearchedJob] = useState<Job[]>([])
  const [error, setError] = useState(false)

  const jobList = search ? searchedJob : jobs
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSend = (id: number) => {
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

        const data = await res.json()

        if (res.ok) {
          console.log("Response data:", data)
          setIsSubmitted(true)
        } else {
          setIsSubmitted(false)
        }

        if (res.status === 401) {
          setError(true)
        }
      } catch (error) {
        console.log('Error submitting the application', error)
        setIsSubmitted(false)
      }
    }
    sendData()
  }

  const handleFind = (e: React.ChangeEvent<HTMLInputElement>) => {
    const jobMad = e.target.value
    setSearch(jobMad)
    const selectedJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(jobMad.toLowerCase())
    )
    setSearchedJob(selectedJobs)
    setCurrentIndex(0)
  }

  useEffect(() => {
    if (jobList.length > 0) {
      setSelectedJobId(jobList[currentIndex]?.id ?? null)
    }
  }, [currentIndex, jobList])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % jobList.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + jobList.length) % jobList.length)
  }

  return (
    <div className="flex flex-col">
      <Input
        type="text"
        placeholder="Search for a job"
        onChange={handleFind}
        value={search}
        className="rounded-3xl border-black mb-2.5"
      />

      <div className="flex flex-col sm:flex-row relative gap-12">
        <div className="w-[300px] sm:w-full max-w-sm relative">
          <Carousel>
            <CarouselContent className="-ml-1">
              {jobList.map((job, index) => (
                <CarouselItem
                  key={job.id}
                  className="pl-1 w-full md:w-[500px] hidden"
                  style={{ display: index === currentIndex ? 'block' : 'none' }}
                >
                  <div className="p-1">
                    <Card className="bg-[url('/setting-hand-leave-job.jpg')] bg-cover bg-center text-white shadow-lg">
                      <CardContent className="flex flex-col items-start justify-start p-4 bg-black/50 rounded-lg">
                        <span className="text-xl font-bold">{job.title}</span>
                        <span className="text-sm text-white/80">{job.company.name}</span>
                        <p className="text-sm mt-2">{job.description.slice(0, 40)}</p>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className="text-red-500 bg-amber-50 cursor-pointer"
                              onClick={() => setSelectedJobId(job.id)}
                              disabled={!isLoggedIn}
                            >
                              Apply
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will submit your information to the company.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => {
                                if (selectedJobId !== null) handleSend(selectedJobId)
                              }}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* ✅ Styled arrows triggering your logic */}
           <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10">
  <button onClick={handlePrevious} aria-label="Previous slide" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
    <ArrowLeft className="w-6 h-6 text-gray-700" />
  </button>
</div>
<div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
  <button onClick={handleNext} aria-label="Next slide" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
    <ArrowRight className="w-6 h-6 text-gray-700" />
  </button>
</div>
          </Carousel>
        </div>

        {isSubmitted && (
          <Alert className="absolute top-52 w-[375px]">
            <CheckCircle2Icon />
            <AlertTitle>Success! Your information has been saved</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert className="w-[375px] absolute top-60 left-125" variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to process your Application.</AlertTitle>
            <AlertDescription>
              <p>Please verify your information and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Make sure you have completed your Profile</li>
                <li>Click on your name icon on the top right corner</li>
              </ul>
            </AlertDescription>
            <Button variant='secondary' className="w-[100px]" onClick={() => setError(false)}>Dismiss</Button>
          </Alert>
        )}

        <AccordionDemo selectedJobId={selectedJobId} jobs={jobs} />
      </div>
    </div>
  )
}
