import { Laptop, Megaphone, Pencil } from 'lucide-react'
import React from 'react'
import Welcomer from './welcomer'
import { job } from '@/app/jobs/jobsFilter'



interface Application {
  jobs: job[]
  searchquery: string,
  filteredJobs: job[]
}

export default function FeaturedCategories ({jobs, searchquery, filteredJobs}: Application) {   
  return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 ml-7 sm:ml-0 sm:mb-4 md:mb-5 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">Featured Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              <div className="category-card">
                <Laptop className="text-cyan-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-1 sm:ml-2 md:ml-2.5" />
                <h1 className="text-sm sm:text-base md:text-lg ml-1 sm:ml-1.5 font-semibold">Tech</h1>
                <h3 className="text-xs sm:text-sm md:text-base">1200 jobs</h3>
              </div>
              <div className="category-card">
                <Pencil className="text-cyan-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-1 sm:ml-2 md:ml-2.5" />
                <h1 className="text-sm sm:text-base md:text-lg ml-1 sm:ml-1.5 font-bold">Design</h1>
                <h3 className="text-xs sm:text-sm md:text-base">980 jobs</h3>
              </div>
              <div className="category-card">
                <Megaphone className="text-cyan-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-1 sm:ml-2 md:ml-2.5" />
                <h1 className="text-sm sm:text-base md:text-lg ml-1 sm:ml-1.5 font-bold">Marketing</h1>
                <h3 className="text-xs sm:text-sm md:text-base">500 jobs</h3>
              </div>
            </div>    
          <div className="hidden sm:block">
             <Welcomer jobs={jobs} searchquery={searchquery} filteredJobs={filteredJobs} />
             </div>
          </div>
  )
}
