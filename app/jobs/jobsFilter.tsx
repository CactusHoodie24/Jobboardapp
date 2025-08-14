'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import JobsMaps from './jobsMap'

interface company {
    name: string
}

interface job {
        id: number;
    location: string | null;
    title: string;
    description: string;
    salaryMin: number | null;
    salaryMax: number | null;
    jobType: string | null;
    postedAt: Date;
    isActive: boolean;
    companyId: number;
    company: company;
}

interface Application {
  jobs: job[]
}

export default function Joblist({jobs}: Application) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    console.log("Jobs received:", jobs)
console.log("Job types:", jobs.map(job => job.jobType))


    const handleChange = (value: string) => {
      setSelectedCategory(value)
    }
    return (
      <>
        <Select onValueChange={handleChange}>
  <SelectTrigger className="w-[200px] mb-4 mt-5">
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent>
  {Array.from(new Set(jobs.map(job => job.title)))
    .filter((type): type is string => !!type) // narrow to string
    .map((type, idx) => (
      <SelectItem key={idx} value={type}>
        {type}
      </SelectItem>
    ))
  }

  {/* Fallback in case nothing shows */}
  {jobs.length === 0 && (
    <div className="p-2 text-sm text-muted-foreground">
      No job types found
    </div>
  )}
</SelectContent>

</Select>
<JobsMaps jobs={selectedCategory
          ? jobs.filter(job => job.title === selectedCategory)
          : jobs} />
</>
    )
}