'use client'
import AwardCard from '@/components/award';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

export interface Company {
   address: string | null;
    id: number;
    about: string | null;
    email: string | null;
    size: string | null;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    industry: string | null;
    website: string | null;
    location: string | null;
    logoUrl: string | null;
     foundedYear: number | null;
    phone: string | null;
    country: string | null;
    city: string | null;
    latitude: number | null;
    longitude: number | null;
    linkedin: string | null;
    twitter: string | null;
    facebook: string | null;
    isVerified: boolean;
    rating: number | null;
    tags: string[];
}

export interface PropsApps {
    companies: Company[]
    handleClick?: (id: number) => void
}


export default function Companylist({companies, handleClick}: PropsApps) {
  return (
    <div>
    <h1 className='my-3.5'>Select a company to view information</h1>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
     {companies.map(company => (
  <div key={company.id} className="min-w-0">
    <Button
      onClick={() => handleClick?.(company.id)}
      className="w-full break-words whitespace-normal max-w-xs"
      title={company.name}
    >
      {company.name}
    </Button>
  </div>
))}
    </div>
 {/* <AwardCard
  title="Top Innovator 2025"
  description="Awarded for outstanding contribution to tech innovation."
  image="https://picsum.photos/400/250"
/> */}
    </div>
  )
}
