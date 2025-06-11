import { prisma } from '@/prisma';
import Link from 'next/link';
import React from 'react'

async function getApplicants() {
    return await prisma.application.findMany({
        include: {
            applicant: true,
            job: true
        }
    })
}

const ViewApplicant = async () => {
    const details = await getApplicants();
  return (
    <div>
     {details.map(detail => (
        <div key={detail.id} className='flex'>
          <h2>{detail.id}</h2>  
          <h2>{detail.job.title}</h2>
          <h2>{detail.applicant.fullName}</h2>
          <Link href={`/dashboard/employer/applicant/${detail.id}`}>View</Link>
        </div>
     ))}
    </div>
  )
}

export default ViewApplicant;
