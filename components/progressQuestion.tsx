"use client"

import { Gauge } from "./gauge"
import Link from "next/link"
import { useState } from "react"

interface Progress {
  progress: number
}

export default function ProgressGauge({ progress }: Progress) {
  return (
    <main className="from-slate-900 to-slate-800 min-h-screen">
      <div className="lg:w-[200px] max-w-2xl mx-auto">

        {/* Floating action bar on mobile */}
        <div
          className="
           p-6 rounded-2xl shadow-xl
            fixed top-15 right-1 -translate-x-1/2 w-[85%] z-50

            /* Desktop reset */
            lg:static lg:translate-x-0 lg:w-auto lg:p-12 lg:shadow-none
          "
        >
          <div className="flex flex-col items-center">
            {/* Gauge container — becomes smaller on mobile */}
            <div
              className="
                flex items-center justify-center bg-slate-900 rounded-full
                w-24 h-24          /* mobile size */
               /* desktop size */
              "
            >
              <Gauge value={progress} min={0} max={100} type="full" />
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
