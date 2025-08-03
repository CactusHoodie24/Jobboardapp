'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { FaHamburger } from 'react-icons/fa'

export const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isTouched, setIsTouched] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    router.refresh()
  }, [session?.user?.name])

  const nav = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    //{ name: 'Applicant', href: '/dashboard/seeker/registerApplicant' },
    { name: 'Applications', href: '/dashboard/seeker/applications' },
  ]

  const isLoading = status === 'loading'
  const isLoggedIn = !!session?.user

  // 🚫 Avoid hydration errors: wait for client render
  if (!hasMounted) return null

  return (
    <div className="flex justify-between">
      <div className="sm:flex sm:justify-between mt-4 w-full">
        {/* Mobile hamburger menu */}
        <FaHamburger
          onClick={() => setIsTouched((prev) => !prev)}
          className="sm:hidden flex mb-5 cursor-pointer"
        />

        {/* Mobile nav dropdown */}
        {isTouched && (
          <div className="sm:hidden flex justify-between mt-3.5 ml-0">
            <ul className="flex flex-col gap-6 relative">
              {nav.map((navItem, index) => (
                <Link
                  key={index}
                  href={navItem.href}
                  className={clsx('text-black', {
                    'text-cyan-500': pathname === navItem.href,
                  })}
                >
                  {navItem.name}
                </Link>
              ))}
            </ul>
          </div>
        )}

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-48">
          <Image
            src="/108560743-job-search-vector-icon-isolated-on-transparent-background-job-search-logo-concept.jpg"
            width={30}
            height={30}
            alt="jobs icon"
          />
          <ul className="flex gap-6 relative">
  {nav.map((navItem, index) => (
    <li key={index} className="relative">
      <Link
        href={navItem.href}
        className={clsx('text-black', {
          'after:content-[""] after:absolute after:bottom-[-10px] after:left-1/2 after:w-[30px] after:h-[2px] after:bg-[#4dca4d] after:-translate-x-1/2':
            pathname === navItem.href,
        })}
      >
        {navItem.name}
      </Link>
    </li>
  ))}
</ul>

        </div>
      </div>

      {/* Right side: Login or user info */}
      {!isLoading && (isLoggedIn ? (
        !isTouched && (
          <div className="flex items-center gap-3">
            <Button  className="cursor-pointer" onClick={() => signOut()} variant="secondary" >
              SignOut
            </Button>
            <span className="w-8 h-8 rounded-full bg-amber-300 p-2 flex items-center justify-center">
              <h1 className="text-sm font-bold">
                {session?.user?.name?.slice(0, 2).toUpperCase()}
              </h1>
            </span>
          </div>
        )
      ) : (
        <Link href="/login">
          <Button className="mt-2.5" variant="secondary">
            Login
          </Button>
        </Link>
      ))}
    </div>
  )
}
