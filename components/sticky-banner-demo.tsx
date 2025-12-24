"use client"

import { StickyBanner } from "@/components/ui/sticky-banner"

export default function StickyBannerDemo() {
  const announcements = [
    {
      id: "announcement-1",
      content: (
        <p className="mx-0 max-w-[90%] text-accent-foreground drop-shadow-md">
          Announcing $10M seed funding from project mayhem ventures.{" "}
          <a href="#" className="transition duration-200 hover:underline font-medium">
            Read announcement
          </a>
        </p>
      ),
    },
    {
      id: "announcement-2",
      content: (
        <p className="mx-0 max-w-[90%] text-accent-foreground drop-shadow-md">
          🎉 New feature released! Check out our latest dashboard improvements.{" "}
          <a href="#" className="transition duration-200 hover:underline font-medium">
            Learn more
          </a>
        </p>
      ),
    },
    {
      id: "announcement-3",
      content: (
        <p className="mx-0 max-w-[90%] text-accent-foreground drop-shadow-md">
          Join us for a live webinar on product roadmap. Register{" "}
          <a href="#" className="transition duration-200 hover:underline font-medium">
            here
          </a>
        </p>
      ),
    },
  ]

  return (
    <div className="relative flex h-[60vh] w-full flex-col overflow-y-auto">
      <StickyBanner announcements={announcements} autoRotate={true} rotationInterval={5000} />
      <DummyContent />
    </div>
  )
}

const DummyContent = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 py-8">
      <div className="h-96 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      <div className="h-96 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      <div className="h-96 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
    </div>
  )
}
