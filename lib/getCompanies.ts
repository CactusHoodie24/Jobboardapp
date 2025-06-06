import {prisma} from '@/prisma';

export async function getCompanies() {
  await prisma.company.findMany()
}