'use client'

import clsx from 'clsx'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'



export const Navigation = () => {
    const pathname = usePathname();
    const nav = [
          {name: 'home', href: '/'},
        {name: 'jobs', href: '/jobs'},
       
    ]

  return (
    <div className='flex justify-between mt-3.5'>
        <Image src='/10-106485_job-opportunity-icon-transparent-hd-png-download.png' width={30} height={30}  alt='jobs icons'/>
        <ul className='flex gap-6'>
            {nav.map((nav, index) => (
                <Link className={clsx('text-black', {'border-b-2 border-black': pathname === nav.href})} key={index} href={nav.href}>
                    {nav.name}
                </Link>
            ))}
        </ul>
        <Button variant="secondary">
            Login
        </Button>
    </div>
  )
}
