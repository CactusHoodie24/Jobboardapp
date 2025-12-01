"use client"

import { Gauge } from "./gauge"
import Link from "next/link"
import { useState } from "react"

interface Progress {
    progress: number
}

export default function ProgressGauge({progress}: Progress) {


  return (
    <main className=" bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="lg:w-[200px] max-w-2xl mx-auto">
        
        <div className="bg-slate-800 rounded-lg p-12">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 flex items-center justify-center bg-slate-900 rounded-full">
              <Gauge value={progress} min={0} max={100} type="full" />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
