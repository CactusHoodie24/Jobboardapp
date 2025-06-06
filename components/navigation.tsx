'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useEffect } from 'react'

export const Navigation = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const nav = [
    { name: 'home', href: '/' },
    { name: 'jobs', href: '/jobs' },
  ]

  const isLoading = status === 'loading'
  const isLoggedIn = !!session?.user



  return (
    <div className='flex justify-between mt-3.5'>
      <Image src='/108560743-job-search-vector-icon-isolated-on-transparent-background-job-search-logo-concept.jpg' width={30} height={30} alt='jobs icon' />
      
      <ul className='flex gap-6'>
        {nav.map((nav, index) => (
          <Link className={clsx('text-black', { 'border-b-2 border-black': pathname === nav.href })} key={index} href={nav.href}>
            {nav.name}
          </Link>
        ))}
      </ul>

      {isLoading ? null : isLoggedIn ? (
        <>
          <Button variant="secondary" disabled>
            Logged In
          </Button>
          <span className='w-8 h-8 rounded-full bg-amber-300 p-2 flex items-center justify-center'>
            <h1 className='text-sm font-bold'>{session?.user.name?.slice(0, 2).toUpperCase()}</h1>
          </span>
        </>
      ) : (
        <Link href="/login">
          <Button variant="secondary">Login</Button>
        </Link>
      )}
    </div>
  )
}
