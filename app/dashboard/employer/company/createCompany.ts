'use server';

import { prisma } from '@/prisma';

export async function CreateCompany(prevState: any, formData: FormData) {
  const name = formData.get('name');
  const industry = formData.get('industry');
  const location = formData.get('location');
  const website = formData.get('website');

  // Type narrow with runtime checks
  if (
    typeof name !== 'string' ||
    typeof industry !== 'string' ||
    typeof location !== 'string' ||
    typeof website !== 'string'
  ) {
    return { error: 'All fields are required.', message: '' };
  }

  try {
    const company = await prisma.company.create({
      data: {
        name,
        industry,
        location,
        website,
      },
    });

    return {
      error: '',
      message: `Company "${company.name}" created successfully.`,
    };
  } catch (err) {
    console.error(err); // helpful for debugging
    return { error: 'Database error', message: '' };
  }
}
