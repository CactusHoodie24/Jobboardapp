import React from 'react'
import {prisma} from '@/prisma';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getUsersFromPrisma() {
  return await prisma.jobListing.findMany();
}

async function JobsPage() {
    const jobs = await getUsersFromPrisma()
    console.log(jobs)
  return (
    <div>
       <Table className='w-[300px] ml-8'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">SalaryMin</TableHead>
          <TableHead className="text-right">SalaryMax</TableHead>
          <TableHead className="text-right">Company Id</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.title}</TableCell>
            <TableCell>{job.description}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell className="text-right">{job.salaryMin}</TableCell>
            <TableCell className="text-right">{job.salaryMax}</TableCell>
            <TableCell className="text-right">{job.companyId}</TableCell>
             <TableCell>
                <Link href={`/dashboard/employer/jobs/${job.id}`}>
        <Button>View</Button>
        </Link>
      </TableCell>
      <TableCell>
      </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
  )
}

export default JobsPage