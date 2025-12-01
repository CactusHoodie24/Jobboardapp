import React from 'react'
import CarouselSpacing from '@/components/ui/cardlook';
import { getJobs } from '@/lib/getJobs';
import OnboardingWelcomeBlock from '@/components/creative-tim/blocks/onboarding-welcome-block';




 const HomePage = async () => {
  return (
    <div>
        <div className='flex justify-center'>
        <OnboardingWelcomeBlock />
        </div>
    </div>
  )
}

export default HomePage;
