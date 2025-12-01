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
    <div className='flex'>
    <div className="flex flex-col items-center space-y-4 p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-white">
        Are you registering as a company or an individual?
      </h2>

      <ToggleGroup
        type="single"
        value={selected}
        onValueChange={setSelected}
        className="flex gap-4"
      >
        <ToggleGroupItem
          value="individual"
          className={`px-6 py-3 rounded-lg border cursor-pointer text-gray-700 ${
            selected === 'individual' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300'
          }`}
        >
               <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          Individual
        </ToggleGroupItem>

        <ToggleGroupItem
          value="company"
          className={`px-6 py-3 rounded-lg border cursor-pointer text-gray-700 ${
            selected === 'company' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300'
          }`}
        >
              <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 21V3h18v18H3zm4-10h2v2H7v-2zm0 4h2v2H7v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
          </svg>
          Company
        </ToggleGroupItem>
      </ToggleGroup>
           <Button
          className='ml-72 mt-12'
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
