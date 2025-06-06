'use server';

import { prisma } from '@/prisma';

export async function CreatePost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const salaryMin = parseFloat(formData.get('salaryMin') as string);
  const salaryMax = parseFloat(formData.get('salaryMax') as string);
  const companyId = parseInt(formData.get('companyId') as string);

  // Check for valid data
  if (
    !title ||
    !description ||
    !location ||
    isNaN(salaryMin) ||
    isNaN(salaryMax) ||
    isNaN(companyId)
  ) {
    return { error: 'All fields are required.', message: '' };
  }

  try {
    const job = await prisma.jobListing.create({
      data: {
        title,
        description,
        location,
        salaryMin,
        salaryMax,
        companyId,
      },
    });

    return {
      error: '',
      message: `Job "${job.title}" created successfully.`,
    };
  } catch (err) {
    console.error(err);
    return { error: 'Database error', message: '' };
  }
}
