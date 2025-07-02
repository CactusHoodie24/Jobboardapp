'use client';


import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import AccordionDemo from "@/components/sideWall";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import { Button } from "./button";
import { useSession } from "next-auth/react";
import { Input } from "./input";


interface Job {
  id: number;
  title: string;
  description: string;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  company: {
    name: string;
  };
}


interface CarouselSpacingProps {
  jobs: Job[]; // now it's an array of jobs
}

export default function CarouselSpacing({ jobs }: CarouselSpacingProps) {
  const {data: session, status} = useSession()
  const isLoggedIn = Boolean(session?.user);
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [selectedJobId, setSelectedJobId] = React.useState<number | null>(null);
  const [isTouched, setIsTouched] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [searchedJob, setSearchedJob] = React.useState<Job[]>([])

  const [error, setError] = React.useState(false)

  const handleSelect = (id:number) => {
    console.log(id)
    setSelectedJobId(id)
  }


 const handleSend = (id: number) => {
  const sendData = async () => {
    const payload = {
      jobId: id,
      userEmail: session?.user?.email,
    };

    try {
      const res = await fetch('http://localhost:3000/api/application/application', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if(res.ok) {
        console.log("Response data:", data);
        setIsSubmitted(true);
      } else {
        setIsSubmitted(false);
      }
      if(res.status === 401) {
        setError(true)
      }
    } catch (error) {
      console.log('There was an error submitting the application', error);
      setIsSubmitted(false);
    }
  }
  sendData();
}

const handleFind = (e: React.ChangeEvent<HTMLInputElement>) => {
    const jobMad = e.target.value;
    setSearch(jobMad)
    const selectedjobs = jobs.filter(job => job.title.toLocaleLowerCase().includes(jobMad.toLocaleLowerCase()));
    setSearchedJob(selectedjobs)
  
}

  return  (
    <div className="flex flex-col">
     <Input type="text" placeholder="search for a job" onChange={handleFind} value={search} className="rounded-3xl"/>
  <div className="flex flex-col sm:flex sm:flex-row relative gap-12">
    <Carousel className=" w-[300px] sm:w-full max-w-sm">
      <CarouselContent  className="-ml-1">
        {(search ? searchedJob : jobs).map((job) => (
          <CarouselItem key={job.id} onClick={() => handleSelect(job.id)} className="pl-1 w-full md:w-[500px] ">
            <div className="p-1">
              <Card className="bg-[url('/setting-hand-leave-job.jpg')] bg-cover bg-center text-white shadow-lg">
  <CardContent className="flex flex-col items-start justify-start p-4 bg-black/50 rounded-lg">
    <span className="text-xl font-bold">{job.title}</span>
    <span className="text-sm text-muted text-white/80">{job.company.name}</span>
    <p className="text-sm mt-2">{job.description}</p>
        <AlertDialog>
      <AlertDialogTrigger asChild>
    <Button className="text-red-500 bg-amber-50 cursor-pointer" onClick={() => setSelectedJobId(job.id)} disabled={!isLoggedIn}>
      Apply
    </Button>
  </AlertDialogTrigger>
   <AlertDialogContent>
<AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will submit your information to the company who made this advertisement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
          if (selectedJobId !== null) handleSend(selectedJobId);
        }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
   </AlertDialogContent>
   </AlertDialog>
  </CardContent>
</Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    {isSubmitted && <Alert className="absolute top-52 w-[375px]">
        <CheckCircle2Icon />
        <AlertTitle>Success! Your information have been saved</AlertTitle>
      </Alert> }
    {error && ( <> 
      <Alert className="w-[375px] absolute top-60 left-125" variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your Application.</AlertTitle>
        <AlertDescription>
          <p>Please verify your the information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>You have registered as a user</li>
            <li>Registered as an applicant</li>
            <li>You are not the administrator of the system</li>
          </ul>
        </AlertDescription>
        <Button variant='secondary' className="w-[100px]" onClick={() => setError(false)}>Dismiss</Button>
      </Alert>
       </>)}
       <AccordionDemo selectedJobId={selectedJobId} jobs={jobs} />
    </div>
    </div>
  );
   
}


