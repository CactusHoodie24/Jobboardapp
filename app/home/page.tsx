import { prisma } from '@/prisma';
import React from 'react'
import Jobs from '../jobs/page';
import CarouselSpacing from '@/components/ui/cardlook';

async function getJobs() {
  return  await prisma.jobListing.findMany({
  include: {
    company: {
      select: {
        name: true, // Only select the name
      },
    },
  },
});
}

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
