import { Map } from 'lucide-react'
import React from 'react'

const RecentlyAdded = () => {
  return (
    <div className='flex flex-col w-[450px]'>
     <h2>Recently Added</h2>
      <div className='flex flex-row border py-2.5 pl-2.5 rounded-sm'>
        <div className='p-1.5 px-5 bg-cyan-500 mr-3.5'>

        </div>
        <div className='flex flex-col mr-24'>
          <h2>Product Designer</h2>
          <h3>ABC Company</h3>
        </div>
        <div className='flex flex-row gap-1.5'>
           <Map />
           <h3>London</h3>
        </div>
      </div>
       <div className='flex flex-row border py-2.5 pl-2.5 rounded-2xl'>
        <div className='p-1.5 px-5 bg-cyan-500 mr-3.5'>

        </div>
        <div className='flex flex-col mr-24'>
          <h2>Product Designer</h2>
          <h3>ABC Company</h3>
        </div>
        <div className='flex flex-row gap-1.5'>
           <Map />
           <h3>London</h3>
        </div>
      </div>
      <div className='flex flex-row border py-2.5 pl-2.5 rounded-2xl'>
        <div className='p-1.5 px-5 bg-cyan-500 mr-3.5'>

        </div>
        <div className='flex flex-col mr-24'>
          <h2>Product Designer</h2>
          <h3>ABC Company</h3>
        </div>
        <div className='flex flex-row gap-1.5'>
           <Map />
           <h3>London</h3>
        </div>
      </div>
    </div>
  )
}

export default RecentlyAdded