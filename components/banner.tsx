'use client'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import FeaturedCategories from './featuredCategories'
import { job } from '@/app/jobs/jobsFilter'
import { EncryptedText } from './ui/encrypted-text'
import { toast } from 'sonner'

interface Application {
  jobs: job[]
}

const Banner = ({jobs}: Application) => {
  const [searchquery, setSearchQuery] = useState('')
  const [filteredJobs, setFilteredJobs] =  useState<job[]>([])
  const [mounted, setMounted] = useState(false)

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
          {mounted && (
              <EncryptedText
                text="Find your dream job with us"
                encryptedClassName="text-neutral-500"
                revealedClassName="dark:text-white text-black"
                revealDelayMs={50}
              />
            )}
        </h1>
        <div className='flex flex-col justify-center items-center md:flex-row gap-4'>
        <input value={searchquery} onChange={handleSearch} className='border border-gray-100 text-white rounded-3xl sm:rounded-sm md:w-[450px] w-[200px] sm:w-[300px] h-[45px]  px-5 ' placeholder='Search for jobs' />
        <FaSearch className='sm:hidden absolute top-30 left-48' />
        <button className='hidden sm:block w-[100px] px-2.5 md:px-8 py-2.5 text-white bg-cyan-500 border rounded-sm cursor-pointer'>Search</button>
    </div>
    </div>
    </div>
    <FeaturedCategories jobs={jobs} searchquery={searchquery} filteredJobs={filteredJobs} />
    </>
  )
}

export default Banner