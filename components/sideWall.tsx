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
          <p>{selectedJob?.title || ' Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.'} 
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you&apos;re not completely satisfied, simply return the
            item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

