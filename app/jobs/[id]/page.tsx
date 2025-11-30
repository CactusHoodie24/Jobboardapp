import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      <h1>{job.company.name}</h1>
      <p>{job.description}</p>
      <Button className="w-[300px]">Apply</Button>
    </Card>
    </div>
  );
}
