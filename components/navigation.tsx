'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
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
    { name: 'home', href: '/' },
    { name: 'jobs', href: '/jobs' },
    { name: 'Register as Applicant', href: '/dashboard/seeker/registerApplicant' },
    { name: 'View Applications', href: '/dashboard/seeker/applications' },
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
            <ul className="flex flex-col gap-6">
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
          <ul className="flex gap-6">
            {nav.map((navItem, index) => (
              <Link
                key={index}
                href={navItem.href}
                className={clsx('text-black', {
                  'border-b-2 border-black': pathname === navItem.href,
                })}
              >
                {navItem.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side: Login or user info */}
      {!isLoading && (isLoggedIn ? (
        !isTouched && (
          <div className="flex items-center gap-3">
            <Button variant="secondary" disabled>
              Logged In
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
