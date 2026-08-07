import Joblist from '@/app/jobs/jobsFilter'
import { getJobs } from '@/lib/getJobs'

export default async function Jobs() {
  const jobs = await getJobs();
  return (
    <>
    <Joblist jobs={jobs} />
    </>
  )
}
