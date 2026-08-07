import React from "react";
import { FaUser, FaPeopleArrows, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { job } from "@/app/jobs/jobsFilter";
import Link from "next/link";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog';
import { PlusIcon } from 'lucide-react';
import { TextShimmerWave } from '@/components/motion-primitives/text-shimmer-wave';

interface Application {
  jobs: job[]
  searchquery: string
  filteredJobs: job[]
}

const Welcomer = ({jobs, searchquery, filteredJobs}: Application) => {

  const isLoading = jobs.length === 0 && filteredJobs.length === 0;
  const displayedresults = filteredJobs.length > 0 ? filteredJobs : jobs;
  
  return (
    <div className="mt-2">
    <div className="flex justify-between">
    <h3 className="font-bold">Latest</h3>
    <Link href='/jobs'>
  <h3 className="hover:underline cursor-pointer">View All</h3>
    </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
          >
            <div className="flex flex-col rounded-lg p-3 gap-2 shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-10 h-9 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div>
                  <h3 className="font-semibold text-left">
                    <TextShimmerWave
                      as="span"
                      className="[--base-color:#cbd5e1] [--base-gradient-color:#94a3b8]"
                      duration={1}
                      spread={1}
                      zDistance={1}
                      scaleDistance={1.03}
                      rotateYDistance={10}
                    >
                      Loading...
                    </TextShimmerWave>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : displayedresults.length > 0 ? (
        displayedresults.map((job, index) => (
          <MorphingDialog
            key={job.id ?? index}
            transition={{ type: "spring", bounce: 0.05, duration: 0.25 }}
          >
            <MorphingDialogTrigger
              style={{ borderRadius: "12px" }}
              className="flex max-w-[270px] flex-col overflow-hidden border 
                 border-zinc-950/10 bg-white dark:border-zinc-50/10 
                 dark:bg-zinc-900"
            >
              <div className="flex flex-col rounded-lg p-3 gap-2 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex items-center gap-4">
                  <div className="bg-signal text-signal-foreground w-10 h-9 rounded-full flex items-center justify-center text-lg font-semibold uppercase shrink-0">
                    {job.company.name.trim().charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-left">
                        <TextShimmerWave
      as="span"
      className='[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]'
      duration={1}
      spread={1}
      zDistance={1}
      scaleDistance={1.1}
      rotateYDistance={20}
    >
                      {job.title}
                      </TextShimmerWave>
                      </h3>
                  </div>
                </div>


              </div>
            </MorphingDialogTrigger>

            <MorphingDialogContainer>
              <MorphingDialogContent style={{ borderRadius: "24px" }}>
                <div className="p-6">
                  <MorphingDialogTitle className="text-2xl">{job.title}</MorphingDialogTitle>
                  <MorphingDialogSubtitle>{job.company.name}</MorphingDialogSubtitle>

                  <MorphingDialogDescription>
                    <p className="mt-2 text-white">{job.description}</p>
                  </MorphingDialogDescription>

                  <button className="bg-signal hover:bg-signal-hover text-signal-foreground font-medium py-2 rounded-md mt-4 transition-colors">
                    Apply Now
                  </button>
                </div>
                <MorphingDialogClose />
              </MorphingDialogContent>
            </MorphingDialogContainer>

          </MorphingDialog>
        ))
      ) : (
        <div className="col-span-full rounded-xl border border-zinc-950/10 bg-white/80 p-6 text-center text-sm text-zinc-500 dark:border-zinc-50/10 dark:bg-zinc-950/50 dark:text-zinc-400">
          No jobs match your search.
        </div>
      )}
    </div>
    </div>
  );
};

export default Welcomer;
