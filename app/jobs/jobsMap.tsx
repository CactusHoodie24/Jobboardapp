import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
export default function jobsMaps({jobs}: Application) {
    return (
        <>
        {jobs.map(job => (
 <Card key={job.id}>
  <CardHeader>
    <CardTitle>{job.jobType}</CardTitle>
    <CardDescription>{job.description}</CardDescription>
    <CardAction>{job.company.name}</CardAction>
  </CardHeader>
  <CardContent>
    <p>{job.salaryMax}</p>
  </CardContent>
  <CardFooter>
    <p>{job.location}</p>
  </CardFooter>
</Card>
        ))}
       
        </>
    )
}