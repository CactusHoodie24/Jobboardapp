import React from 'react'
import Companylist from './companylist'
import { PropsApps } from './companylist'

export default function Renderer({ companies }: PropsApps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Companies</h1>
      <p className="text-muted-foreground mb-6 pb-1.5">Browse companies currently hiring on JobBoard.</p>
      <Companylist companies={companies} />
    </div>
  )
}
