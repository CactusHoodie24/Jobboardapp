import { SignOut } from '@/components/ui/signout'
import { error } from 'console'
import { emitWarning } from 'process'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Joblist from './jobsFilter'
import JobsMap from './jobsMap'
import { getJobs } from '@/lib/getJobs'

export default async function Jobs() {
  const jobs = await getJobs();
  return (
    <>
    <Joblist jobs={jobs} />
    </>
  )
}
