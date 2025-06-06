'use client';


import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./button";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

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
  console.log(session)

 const handleSend = (id: number) => {
  const sendData = async () => {
    const payload = {
      jobId: id,
      userEmail: session?.user?.email,
    };
    console.log("Sending payload:", payload); // <-- Log payload here

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
        alert(`This is not a registered applicant`)
      }
    } catch (error) {
      console.log('There was an error submitting the application', error);
      setIsSubmitted(false);
    }
  }
  sendData();
}

  return  (
  <>
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {jobs.map((job) => (
          <CarouselItem key={job.id} className="pl-1 w-full md:w-[500px] ">
            <div className="p-1">
              <Card className="bg-[url('/setting-hand-leave-job.jpg')] bg-cover bg-center text-white shadow-lg">
  <CardContent className="flex flex-col items-start justify-start p-4 bg-black/50 rounded-lg">
    <span className="text-xl font-bold">{job.title}</span>
    <span className="text-sm text-muted text-white/80">{job.company.name}</span>
    <p className="text-sm mt-2">{job.description}</p>
    <Button className="text-red-500 bg-amber-50 cursor-pointer" onClick={() => handleSend(job.id)} disabled={!isLoggedIn}>
      Apply
    </Button>
  </CardContent>
</Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    {isSubmitted && <h2 className="text-green-600 mt-4">Submitted Your Application</h2>}
    </>
  );
   
}


