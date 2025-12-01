import React from 'react'
import { Accordion03 } from './form'
import { prisma } from '@/prisma'
import Companylist from './companylist'
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
