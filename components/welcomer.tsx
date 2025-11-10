import React from "react";
import { FaUser, FaPeopleArrows, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { job } from "@/app/jobs/jobsFilter";
import Link from "next/link";


interface Application {
  jobs: job[]
  searchquery: string
  filteredJobs: job[]
}

const Welcomer = ({jobs, searchquery, filteredJobs}: Application) => {

  const displayedresults = filteredJobs.length > 0 ? filteredJobs : jobs
  
  return (
    <div className="mt-2">
    <div className="flex justify-between">
    <h3 className="font-bold">Latest</h3>
    <Link href='/jobs'>
  <h3 className="hover:underline cursor-pointer">View All</h3>
    </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {displayedresults.map((job, index) => (
        <div
          key={index}
          className="flex flex-col border rounded-lg p-3 gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="bg-cyan-500 w-20 h-9 rounded-full flex items-center justify-center text-lg">
              {job.company.name.slice(0,1).toUpperCase() + job.company.name.slice(1,2)}
            </div>
            <div>
              <h3 className="font-semibold text-base">{job.title}</h3>
              <p className="text-sm text-white">{job.description.slice(0, 30)}</p>
            </div>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md transition-colors">
            Apply
          </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Welcomer;
