'use client'
import { Star, MapPin, Briefcase, Globe, Mail, Phone, BadgeCheck, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

export interface Company {
   address: string | null;
    id: number;
    about: string | null;
    email: string | null;
    size: string | null;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    industry: string | null;
    website: string | null;
    location: string | null;
    logoUrl: string | null;
     foundedYear: number | null;
    phone: string | null;
    country: string | null;
    city: string | null;
    latitude: number | null;
    longitude: number | null;
    linkedin: string | null;
    twitter: string | null;
    facebook: string | null;
    isVerified: boolean;
    rating: number | null;
    tags: string[];
}

export interface PropsApps {
    companies: Company[]
}

function CompanyCard({ company }: { company: Company }) {
  const [expanded, setExpanded] = useState(false)
  const rating = company.rating ?? 0

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-start gap-4 p-5 text-left"
      >
        <div className="w-12 h-12 shrink-0 rounded-full bg-signal text-signal-foreground flex items-center justify-center text-lg font-semibold uppercase">
          {company.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={company.logoUrl} alt={company.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            company.name.trim().charAt(0)
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold truncate">{company.name}</h3>
            {company.isVerified && (
              <BadgeCheck className="w-4 h-4 text-signal shrink-0" aria-label="Verified company" />
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {company.industry && (
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" /> {company.industry}
              </span>
            )}
            {company.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {company.location}
              </span>
            )}
          </div>

          {rating > 0 && (
            <div className="mt-1.5 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < rating ? 'fill-signal text-signal' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
          )}
        </div>

        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-border">
          {company.about && (
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{company.about}</p>
          )}
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {company.foundedYear && (
              <span className="text-muted-foreground">Founded in {company.foundedYear}</span>
            )}
            {company.email && (
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-signal">
                <Mail className="w-4 h-4" /> {company.email}
              </a>
            )}
            {company.phone && (
              <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-signal">
                <Phone className="w-4 h-4" /> {company.phone}
              </a>
            )}
            {company.website && (
              <a
                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-signal"
              >
                <Globe className="w-4 h-4" /> {company.website}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Companylist({ companies }: PropsApps) {
  if (!companies || companies.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No companies listed yet — check back soon.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  )
}
