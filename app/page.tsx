import Image from "next/image";
import Banner from "@/components/banner";
import TestimonialComponent from "@/components/testimonialComponent";
import ContactSections03 from "@/components/creative-tim/blocks/contact-sections-03";
import LogoCarousel from "@/components/ui/logo-carousel";
import Link from "next/link";
import { StickyBanner } from "@/components/ui/sticky-banner";


export default function Home() {
  return (
    <div className="flex flex-col mt-20 gap-32 px-6  sm:gap-10 w-full sm:px-6">
      {/* SECTION 1: Banner + Featured + Image Side by Side */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* LEFT SIDE (Banner + Featured) */}
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          {/* Banner */}
          <StickyBanner />
          <div className="flex flex-col gap-2.5 mobile-bg">
            <Banner />
          </div>

          {/* Featured Categories */}
       
        </div>
    
        {/* RIGHT SIDE (Image beside banner & featured only) */}
        <div className="relative w-full h-100 md:h-125 rounded-lg overflow-hidden hidden md:block">
          <Image
            src="/image-from-rawpixel-id-14568900-png.png"
            alt="Job illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* SECTION 2: Recently Added + Welcomer (full width) */}
      <div className="flex flex-col mt-12 sm:mt-0 gap-6">
        <div className="bg-signal w-full max-w-87.5 sm:max-w-125 lg:max-w-162.5  mx-auto text-signal-foreground text-center py-12 rounded-xl">
  <h2>Whether You're Hiring or Job Hunting, We’ve Got You Covered</h2>
<p className="mt-2 px-5">Discover opportunities, connect with talent, and grow your career or company on JobBoard.</p>
  <Link href='/login'>
  <button className="mt-4 bg-signal-foreground text-white font-semibold px-5 py-2 rounded hover:opacity-90 transition-opacity">Get Started</button>
  </Link>
</div>

        <div className="py-10 text-center">
  <h2 className="mb-6-mad">Trusted by Top Companies</h2>
  <LogoCarousel columnCount={6}/>
</div>
<TestimonialComponent />
<ContactSections03 />
      </div>
    </div>
  );
}