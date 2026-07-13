import React from 'react'
import { prisma } from '@/prisma'
import Renderer from './renderer'

async function getCompanies() {
    return await prisma.company.findMany()
}

export default async function page() {
    const companies = await getCompanies()
  return (
         <Renderer companies={companies} />
  )
}
