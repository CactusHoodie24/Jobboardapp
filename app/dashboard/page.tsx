import { prisma } from "@/prisma"
import ChartRadialShape from "./radarChart"
import ChartBarLabelCustom from "./chartbar";

async function getNumberofApplicants() {
    return await prisma.applicant.count()
}

async function getApplicationsbyCompanies() {
   const grouped = await prisma.application.groupBy({
  by: ['jobId'],
  _count: {
    _all: true,
  },
});

const result = await Promise.all(
  grouped.map(async ({ jobId, _count }) => {
    const job = await prisma.jobListing.findUnique({
      where: { id: jobId },
    });
    const company = await prisma.company.findUnique({
        where: {id: job?.companyId}
    })
    return {
      companyName: company?.name ?? 'unknown',
      jobTitle: job?.title ?? 'Unknown',
      totalApplications: _count._all,
    };
  })
);
return result;
}
export default async function Dashboard() {
    const applicants = await getNumberofApplicants()
    const joblistings = await getApplicationsbyCompanies()
return (
  <div className="flex gap-1.5">
    <ChartRadialShape applicants={applicants}  />
    <ChartBarLabelCustom joblistings={joblistings} />
  </div>
)
}