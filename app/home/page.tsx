import React from 'react'
import CarouselSpacing from '@/components/ui/cardlook';
import { getJobs } from '@/lib/getJobs';



 const HomePage = async () => {
    const jobs = await getJobs()
  return (
    <div>
        <div className='flex'>
<CarouselSpacing jobs={jobs} />
        </div>
    </div>
  )
}

export default HomePage;
