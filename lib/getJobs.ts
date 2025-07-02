import { prisma } from '@/prisma';

export async function getJobs() {
  return  await prisma.jobListing.findMany({
  include: {
    company: {
      select: {
        name: true, // Only select the name
      },
    },
  },
});
}