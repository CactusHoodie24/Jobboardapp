import { Map } from 'lucide-react'
import React from 'react'

const RecentlyAdded = () => {
  const items = [
    { title: 'Product Designer', company: 'ABC Company', location: 'London' },
    { title: 'Product Designer', company: 'ABC Company', location: 'London' },
    { title: 'Product Designer', company: 'ABC Company', location: 'London' },
  ]

  return (
    <div className='flex flex-col w-full max-w-[450px] gap-3'>
     <h2>Recently Added</h2>
      {items.map((item, i) => (
        <div key={i} className='flex flex-row items-center justify-between gap-3 border border-border py-2.5 px-3 rounded-2xl'>
          <div className='flex flex-row items-center gap-3.5 min-w-0'>
            <div className='w-9 h-9 shrink-0 rounded-full bg-signal' />
            <div className='flex flex-col min-w-0'>
              <h2 className='text-base font-semibold truncate'>{item.title}</h2>
              <h3 className='truncate'>{item.company}</h3>
            </div>
          </div>
          <div className='flex flex-row items-center gap-1.5 text-muted-foreground shrink-0'>
             <Map className='w-4 h-4' />
             <h3>{item.location}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecentlyAdded