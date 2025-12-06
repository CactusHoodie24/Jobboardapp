'use client'
import React, { useEffect, useState } from 'react'
import Companylist from './companylist'
import { Accordion03 } from './form'
import { PropsApps } from './companylist'

export default function Renderer({companies}: PropsApps) {
      const [selectedId, setSelectedId] = useState<number | null>(null)

      useEffect(() => {
        console.log(companies)
      }, [companies])
      const handleClick = (id: number) => {
      setSelectedId(id)
      }
  return (
      <div className='flex flex-col-reverse sm:flex-row py-6'>
        <Accordion03 companies={companies} selectedId={selectedId}/>
        <Companylist handleClick={handleClick} companies={companies} />
    </div>
  )
}
