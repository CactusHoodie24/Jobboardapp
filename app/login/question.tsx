'use client'

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/animate-ui/components/radix/toggle-group'
import ProgressGauge from '@/components/progressQuestion'
import { Button } from '@/components/ui/button'
import { ArrowBigRight } from 'lucide-react'
import React, { useState } from 'react'

interface RegistrationTypeQuestionProps {
  onContinue: (selected: string | undefined) => void
}

export default function RegistrationTypeQuestion({ onContinue }: RegistrationTypeQuestionProps) {
  const [selected, setSelected] = useState<string | undefined>(undefined)

  return (
    <div className="flex w-full justify-center px-4">
  <div className="flex flex-col items-center space-y-6 p-6 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-lg md:text-xl font-semibold text-white text-center">
      Are you registering as a company or an individual?
    </h2>

    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={setSelected}
      className="flex gap-4 flex-wrap justify-center"
    >
     <ToggleGroupItem
  value="individual"
  className={`
    flex flex-col items-center justify-center gap-2 text-center
    px-4 py-3 rounded-lg border cursor-pointer 
    text-gray-700 w-32 sm:w-36 md:w-40
    ${selected === "individual" 
      ? "bg-blue-500 text-white border-blue-500" 
      : "bg-white border-gray-300"
    }
  `}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="hidden w-10 h-10 md:w-12 md:h-12 mx-auto"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 12c2.21..." />
  </svg>
  Individual
</ToggleGroupItem>


      <ToggleGroupItem
        value="company"
        className={`flex flex-col items-center px-4 py-3 rounded-lg border cursor-pointer text-gray-700 w-32 sm:w-36 md:w-40
          ${selected === "company" 
            ? "bg-blue-500 text-white border-blue-500" 
            : "bg-white border-gray-300"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hidden w-10 h-10 md:w-12 md:h-12"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 21V3..." />
        </svg>
        Company
      </ToggleGroupItem>
    </ToggleGroup>

    <Button
      className="w-full sm:w-auto mt-6"
      disabled={!selected}
      onClick={() => onContinue(selected)}
    >
      Continue
      <ArrowBigRight />
    </Button>
  </div>
</div>
  )
}
