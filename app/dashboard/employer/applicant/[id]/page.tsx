import { prisma } from '@/prisma'
import React from 'react'

const ApplicantDetail = async ({params}: {params: {id: string}}) => {
    const applicationId = Number(params.id)
     const jobs = await prisma.application.findUnique({
        where: {id : applicationId}
     })
  return (
    <div key={jobs?.id}>
     <h2>{jobs?.status}</h2>
     <h2>{jobs?.applicantId}</h2>
     <h2>{jobs?.applicantId}</h2>
    </div>
  )
}

export default ApplicantDetail