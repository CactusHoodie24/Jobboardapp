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
    <div className="flex justify-center w-full items-center min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <Card className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-4xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">{job.company.name}</h2>
        <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-justify text-gray-700 dark:text-gray-300">{job.description}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3.5 sm:justify-between mb-4 sm:mb-6">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold">{job.location}</h1>
          <h1 className="text-base sm:text-lg md:text-xl font-semibold">MKW {job.salaryMin} - {job.salaryMax}</h1>
          <h1 className="text-base sm:text-lg md:text-xl font-semibold">{job.postedAt.toLocaleTimeString()}</h1>
        </div>
        <CarouselSpacing job={job} />
      </Card>
    </div>
  );
}
