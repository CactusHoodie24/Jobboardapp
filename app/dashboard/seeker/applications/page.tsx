// app/components/ViewJobs.tsx or similar
import Trap from '@/app/seeker/trap'
import { auth } from '@/auth'
import { DataTableDemo } from '@/components/dataTable'
import { prisma } from '@/prisma'
import React from 'react'

const ViewJobs = async () => {
  const session = await auth()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return <div>No user email found.</div>
  }

  const userInfo = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  if (!userInfo) {
    return <div>User not found.</div>
  }

  const applicant = await prisma.applicant.findUnique({
    where: { userId: userInfo.id },
  })

  if (!applicant) {
    return <div>Applicant not found.</div>
  }

  const applications = await prisma.application.findMany({
    where: { applicantId: applicant.id,
     },
     include: {
        job: true
     }
  })

  const applicationting = await prisma.application.findMany()

  if (!applications) {
    return <div>Application not found.</div>
  }

  return (
    <div>
     <DataTableDemo applications={applications} />
     <Trap applicationting={applicationting} />
    </div>
  )
}

export default ViewJobs
