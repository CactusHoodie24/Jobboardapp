import { prisma } from "@/prisma"

interface PageProps {
  params: Promise<{ id: string }>
}

const ApplicantDetail = async ({ params }: PageProps) => {
  // Await the params Promise
  const { id } = await params
  const applicationId = Number(id)

  const job = await prisma.application.findUnique({
    where: { id: applicationId },
  })

  return (
    <div>
      <h2>Status: {job?.status}</h2>
      <h2>Applicant ID: {job?.applicantId}</h2>
    </div>
  )
}

export default ApplicantDetail
