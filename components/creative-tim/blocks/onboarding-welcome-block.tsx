"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Question from "@/app/login/question"
import { useState } from "react"
import ProgressGauge from "@/components/progressQuestion"
import LoginForm from "@/app/login/login-form"
import CompanyPage from "@/app/dashboard/employer/company/page"

export default function OnboardingWelcomeBlock() {
  const [mode, setMode] = useState<
    "welcome" | "invite" | "individual" | "company"
  >("welcome")

  const [progress, setProgress] = useState(0)

  const handleContinue = (selected: string | undefined) => {
    if (!selected) return

    // Update progress
    setProgress((prev) => Math.min(prev + 50, 100))

    if (selected === "individual") setMode("individual")
    if (selected === "company") setMode("company")
  }

  // Shared layout: FORM LEFT, GAUGE RIGHT
  const renderSideBySide = (content: React.ReactNode) => (
    <div className="flex flex-col sm:flex-row items-start justify-center gap-6 w-full max-w-5xl">
      <Card className="flex-1 w-full max-w-lg shadow-xl rounded-xl p-6 sm:p-8 md:p-12">
        {content}
      </Card>

      <div className="flex-1 max-w-sm w-full">
        <ProgressGauge progress={progress} />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-4 sm:p-6 grid place-items-center gap-6">

      {/* Step 1 — Welcome Page */}
      {mode === "welcome" && (
        <Card className="w-full max-w-lg shadow-xl rounded-xl overflow-hidden">
          <div className="px-6 pt-8 pb-4 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-neutral-900 p-4 mx-auto">
              <Heart className="h-10 w-10 fill-white text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">Welcome to our community!</h2>
            <p className="text-muted-foreground text-sm">
              Let's get you started on an amazing journey
            </p>
          </div>

          <div className="flex flex-col gap-3 px-6 pt-6 pb-8">
            <Button variant="outline" className="w-full">
              Skip for now
            </Button>
            <Button className="w-full" onClick={() => setMode("invite")}>
              Get Started
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2 — Question (side-by-side layout) */}
      {mode === "invite" &&
        renderSideBySide(<Question onContinue={handleContinue} />)}

      {/* Step 3 — Individual Login (side-by-side layout) */}
      {mode === "individual" && renderSideBySide(<LoginForm register={'register'} setProgress={setProgress} />)}

      {/* Step 4 — Company Form (side-by-side layout, placeholder) */}
      {mode === "company" &&
        renderSideBySide(
          <CompanyPage />
        )}
    </div>
  )
}
