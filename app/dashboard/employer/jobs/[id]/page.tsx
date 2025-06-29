
import { Input } from "@/components/ui/input";
import { prisma } from "@/prisma";
import { notFound } from 'next/navigation'
import JobDetailsForm from "./JobDetailsForm";
import type { PageProps } from "@/types/page"

interface JobPageParams {
  id: string
}

export default async function JobDetail({ params }: PageProps<JobPageParams>) {
      // Await the params Promise
  const { id } = await params
  const jobId = Number(id)
    const job = await prisma.jobListing.findUnique({
         where: { id: jobId },
    })

    console.log(job)

    if (!job) return notFound()

        return (
            <div>
                <JobDetailsForm job={job} />
            </div>
        )
    
}