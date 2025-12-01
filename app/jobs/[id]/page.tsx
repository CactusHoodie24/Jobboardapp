import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CarouselSpacing from "@/components/ui/cardlook";
import { getJobs } from "@/lib/getJobs";


interface JobPageProps {
  // Define params as a Promise wrapping the actual object structure
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const jobs = await getJobs();

  return jobs.map((job) => ({
    id: job.id.toString(),
  }));
}

export async function generateMetadata({ params }: JobPageProps) {
     const awaitedParams = await params;
  const job = await getJobById(awaitedParams.id);

    if (!job) {
    return { title: "Job not found" };
  }

  return {
    title: job.title,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
      url: `/jobs/${awaitedParams.id}`,
    },
  };
}


async function getJobById(id: string) {
  const jobs = await getJobs();
  return jobs.find((job) => job.id.toString() === id);
}

export default async function JobPage({ params }: JobPageProps) {
  const awaitedParams = await params;
  const job = await getJobById(awaitedParams.id);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="p-10">
      <h2>{job.company.name}</h2>
      <p>{job.description}</p>
      <div className="flex gap-3.5 justify-between">
      <h1>{job.location}</h1>
      <h1>MKW {job.salaryMin} - {job.salaryMax}</h1>
      <h1>{job.postedAt.toLocaleTimeString()}</h1>
      </div>
      <CarouselSpacing job={job} />
    </Card>
    </div>
  );
}
