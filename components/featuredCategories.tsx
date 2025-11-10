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
      <div>
        <h2 className="mb-2.5 font-bold text-lg">Featured Categories</h2>
            <div className="grid grid-cols-[100px_1fr_2fr] sm:grid-cols-3  gap-2">
              <div className="category-card">
                <Laptop className="text-cyan-500 ml-2.5" />
                <h1 className="text-sm ml-1.5">Tech</h1>
                <h3>1200 jobs</h3>
              </div>
              <div className="category-card">
                <Pencil className="text-cyan-500 ml-2.5" />
                <h1 className="font-bold sm:ml-1.5">Design</h1>
                <h3>980 jobs</h3>
              </div>
              <div className="category-card">
                <Megaphone className="text-cyan-500 ml-2.5" />
                <h1 className="font-bold sm:ml-1.5">Marketing</h1>
                <h3>500 jobs</h3>
              </div>
            </div>    
          <div className="hidden sm:block">
             <Welcomer jobs={jobs} searchquery={searchquery} filteredJobs={filteredJobs} />
             </div>
          </div>
  )
}
