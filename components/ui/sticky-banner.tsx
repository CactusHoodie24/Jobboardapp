"use client"
import type React from "react"
import { type SVGProps, useState, useEffect } from "react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { cn } from "@/lib/utils"

export const StickyBanner = ({
  className,
  announcements = [],
  hideOnScroll = false,
  autoRotate = true,
  rotationInterval = 5000,
}: {
  className?: string
  announcements?: Array<{ id: string; content: React.ReactNode }>
  hideOnScroll?: boolean
  autoRotate?: boolean
  rotationInterval?: number
}) => {
  const [open, setOpen] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll && latest > 40) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  })

  useEffect(() => {
    if (!autoRotate || announcements.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, rotationInterval)

    return () => clearInterval(timer)
  }, [autoRotate, announcements.length, rotationInterval])

  useEffect(() => {
    if (announcements.length > 0 && currentIndex >= announcements.length) {
      setCurrentIndex(0)
    }
  }, [announcements.length, currentIndex])

  const handleNext = () => {
    if (announcements.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }
  }

  const handlePrevious = () => {
    if (announcements.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)
    }
  }

  const currentAnnouncement = announcements[currentIndex]

  return (
    <>
      {announcements.length > 0 && (
        <motion.div
          className={cn(
            "sticky inset-x-0 top-0 z-40 flex min-h-14 w-full items-center justify-between bg-accent px-4 py-1 text-accent-foreground",
            className,
          )}
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: open ? 0 : -100,
            opacity: open ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {announcements.length > 1 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handlePrevious}
              className="cursor-pointer p-2 hover:opacity-80 transition-opacity"
              aria-label="Previous announcement"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </motion.button>
          )}

          {currentAnnouncement && (
            <motion.div
              key={currentAnnouncement.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 text-center"
            >
              {currentAnnouncement.content}
            </motion.div>
          )}

          {announcements.length > 1 && (
            <div className="flex items-center gap-2">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleNext}
                className="cursor-pointer p-2 hover:opacity-80 transition-opacity"
                aria-label="Next announcement"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </motion.button>
              <span className="text-sm min-w-12 text-center">
                {currentIndex + 1}/{announcements.length}
              </span>
            </div>
          )}

          <motion.button
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            className="cursor-pointer p-2 hover:opacity-80 transition-opacity"
            onClick={() => setOpen(false)}
            aria-label="Close announcement"
          >
            <CloseIcon className="h-5 w-5" />
          </motion.button>
        </motion.div>
      )}

      {announcements.length > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: open ? 0 : 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90 transition-opacity"
          aria-label="View announcements"
        >
          <BellIcon className="h-6 w-6" />
        </motion.button>
      )}
    </>
  )
}

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="15 6 9 12 15 18" />
    </svg>
  )
}

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

const BellIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 7 7v3a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-3a7 7 0 0 1 7 -7" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  )
}
