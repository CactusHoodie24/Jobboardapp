'use client'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import FeaturedCategories from './featuredCategories'
import { job } from '@/app/jobs/jobsFilter'
import { toast } from 'sonner'

interface Application {
  jobs: job[]
}

const Banner = () => {
  const [searchquery, setSearchQuery] = useState('')
  const [filteredJobs, setFilteredJobs] =  useState<job[]>([])
  const [mounted, setMounted] = useState(false)
  const [jobs, setJobs] = useState<job[]>([])

   useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json()
      if (Array.isArray(data)) {
        setJobs(data)
      } else {
        console.error('Unexpected /api/jobs response:', data)
        toast.error('Unable to load job listings at the moment.')
        setJobs([])
      }
    }
    fetchJobs()
   }, [])

    useEffect(() => setMounted(true), [])


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value 
    setSearchQuery(search)
    const filterlist = jobs.filter(job => job.title.toLowerCase().includes(search.toLowerCase()))
    setFilteredJobs(filterlist)
  }
  
  return (
    <>
    <div className='flex'>
    <div className='flex flex-col gap-8 relative mt-36 sm:m-0'>
        <h1 className='text-3xl md:text-6xl font-bold text-center'>
          Find your dream job with us
        </h1>
        <div className='flex flex-col justify-center items-center md:flex-row gap-4'>
        <input value={searchquery} onChange={handleSearch} className='border border-border bg-card text-foreground rounded-3xl sm:rounded-sm md:w-112.5 w-50 sm:w-75 h-11.5  px-5 placeholder:text-muted-foreground' placeholder='Search for jobs' />
        <FaSearch className='sm:hidden absolute top-30 left-48' />
        <button className='hidden sm:block w-25 px-2.5 md:px-8 py-2.5 text-signal-foreground bg-signal hover:bg-signal-hover border-0 rounded-sm cursor-pointer transition-colors font-medium'>Search</button>
    </div>
    </div>
    </div>
    <FeaturedCategories jobs={jobs} searchquery={searchquery} filteredJobs={filteredJobs} />
    </>
  )
}

export default Banner