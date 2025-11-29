import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getJobs } from "@/lib/getJobs";

export async function generateStaticParams() {
  const jobs = await getJobs();

  return jobs.map((job) => ({
    id: job.id.toString(),
  }));
}

export async function generateMetadata({params}) {
    const job = await getJobById(params.id)

    if (!job) {
    return { title: "Job not found" };
  }

  return {
    title: job.title,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
      url: `/jobs/${params.id}`,
    },
  };
}


async function getJobById(id) {
  const jobs = await getJobs();
  return jobs.find((job) => job.id.toString() === id);
}

export default async function JobPage({ params }) {
  const job = await getJobById(params.id);

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
