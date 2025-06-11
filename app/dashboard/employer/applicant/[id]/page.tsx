import { prisma } from '@/prisma'
import React from 'react'

interface PageProps {
  params: {
    id: string;
  };
}

const ApplicantDetail = async ({ params }: PageProps) => {
  const applicationId = Number(params.id);
  
  const job = await prisma.application.findUnique({
    where: { id: applicationId }
  });

  return (
    <div key={job?.id}>
      <h2>{job?.status}</h2>
      <h2>{job?.applicantId}</h2>
    </div>
  );
};

export default ApplicantDetail;
