"use client"

import { ArrowRight, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function BlogContentBlockWithCtaButton() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
                <span>Featured Article</span>
              </div>

              <h1 className="text-4xl leading-tight font-bold [text-wrap:balance] md:text-5xl lg:text-6xl">
                About Us
              </h1>

             
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                A platform built to simplify the way employers find talent and the way job seekers discover opportunities. We bring both sides of the job market together in one easy-to-use place—empowering businesses to grow and enabling individuals to take the next step in their careers.
              </p>

              <p className="text-muted-foreground text-base leading-relaxed">
         In today’s fast-moving world, hiring and job searching can feel overwhelming. Employers struggle to find the right skills, and job seekers often get lost in complicated processes. Our mission is to change that. We use smart technology, thoughtful design, and a human-centered approach to create a platform where connecting is effortless and meaningful.
              </p>
            </div>

            <div className="bg-card space-y-4 rounded-xl border p-6">
              <h3 className="text-xl font-bold">Key Takeaways:</h3>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                  <span className="text-sm">
                   &#8226; Smart Matching: We use modern technologies to match job seekers with opportunities that align with their skills and interests.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                  <span className="text-sm">
                   &#8226; Easy Communication: Employers and applicants can communicate directly through the platform—saving time and making the process smoother.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                  <span className="text-sm">
                   &#8226; User-Friendly Design: Everything on our website is built to be simple, clean, and intuitive for all users.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                  <span className="text-sm">
                   &#8226; Secure & Reliable: We prioritize safety and make sure your data stays protected.
                  </span>
                </li>
              </ul>
            </div>

            <Button className="bg-neutral-900 text-base transition-all hover:bg-neutral-800">
              Read Full Article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="relative h-[500px] lg:h-[700px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <img
                src="/office_chair.png"
                alt="Modern architecture"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            <div className="absolute right-6 bottom-6 left-6 rounded-xl bg-white/95 p-4 backdrop-blur-sm dark:bg-neutral-900/95">
              <p className="text-muted-foreground text-xs font-medium">
                Photo by Unsplash
              </p>
              <p className="mt-1 text-sm font-medium">
                Modern architectural design inspiring digital innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
