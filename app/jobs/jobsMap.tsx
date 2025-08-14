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
        <div className="flex flex-col gap-2.5">
        {jobs.map(job => (
 <Card key={job.id}>
  <CardHeader>
    <CardTitle>{job.company.name}</CardTitle>
    <CardDescription>{job.description}</CardDescription>
    <CardAction className="text-cyan-500">{job.company.name}</CardAction>
  </CardHeader>
  <CardContent>
    <p>{job.location}</p>
  </CardContent>
  <CardFooter>
    <p>{job.postedAt.toLocaleDateString()}</p>
  </CardFooter>
</Card>
        ))}
       
        </div>
    )
}