import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Job {
  id: number;
  title: string;
  description: string;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  postedAt: Date;
  company: {
    name: string;
  };
}


interface CarouselSpacingProps {

  jobs: Job[]; // now it's an array of jobs
   selectedJobId: number | null;
}

export default function AccordionDemo({ jobs, selectedJobId }: CarouselSpacingProps) {
  const selectedJob = jobs.find(job => job.id === selectedJobId)
  const defaultJob = jobs[0]
  return (
    <Accordion
      type="single"
      collapsible
      className=" w-[100%] m-0 sm:w-[60%] sm:ml-16"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Job Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>{selectedJob ? selectedJob.title : defaultJob.title} 
          </p>
          <p>
            {selectedJob ? selectedJob.description : defaultJob.description} 
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Location</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>{selectedJob  ? selectedJob.location : defaultJob.location}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Deadline</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>{selectedJob ? selectedJob.postedAt.toLocaleDateString() : defaultJob.postedAt.toLocaleDateString()}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

