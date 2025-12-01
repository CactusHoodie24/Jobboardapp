'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

interface AwardCardProps {
  title: string
  description: string
  image?: string
}

export default function AwardCard({ title, description, image }: AwardCardProps) {
  return (
    <div className="max-w-sm bg-gray-900 border border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <h2 className="text-xl font-bold text-indigo-400 mb-2">{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
          Learn More
        </Button>
      </div>
    </div>
  )
}
