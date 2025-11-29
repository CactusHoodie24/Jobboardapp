import { prisma } from '@/prisma';
import { Key } from 'lucide-react';

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

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
];

function filterByProperty<T, U extends keyof T>(arr: T[], name: U, value: T[U]): T[] {
  return arr.filter(item => item[name] === value);
}


const result = filterByProperty(users, "age", 25);
