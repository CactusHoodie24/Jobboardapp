
import { Input } from "@/components/ui/input";
import { prisma } from "@/prisma";
import { notFound } from 'next/navigation'
import JobDetailsForm from "./JobDetailsForm";

export default async function JobDetails({params}: {params: {id: string}}) {
     const jobId = Number(params.id)
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