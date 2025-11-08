import Image from "next/image";
import { Clock, Laptop, Megaphone, Pencil } from "lucide-react";
import Banner from "@/components/banner";
import RecentlyAdded from "@/components/recentlyAdded";
import Welcomer from "@/components/welcomer";
import { FaApple, FaFacebook, FaGoogle, FaLinkedin, FaMicrosoft, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col mt-20 gap-10 w-full px-6">
      {/* SECTION 1: Banner + Featured + Image Side by Side */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* LEFT SIDE (Banner + Featured) */}
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          {/* Banner */}
          <div className="flex flex-col gap-2.5 mobile-bg">
            <Banner />
          </div>

          {/* Featured Categories */}
          <div>
            <h2 className="mb-2.5 font-bold text-lg">Featured Categories</h2>
            <div className="grid grid-cols-[100px_1fr_2fr] sm:grid-cols-3  gap-2">
              <div className="category-card">
                <Laptop className="text-cyan-500 ml-2.5" />
                <h1 className="text-sm ml-1.5">Tech</h1>
                <h3>1200 jobs</h3>
              </div>
              <div className="category-card">
                <Pencil className="text-cyan-500 ml-2.5" />
                <h1 className="font-bold sm:ml-1.5">Design</h1>
                <h3>980 jobs</h3>
              </div>
              <div className="category-card">
                <Megaphone className="text-cyan-500 ml-2.5" />
                <h1 className="font-bold sm:ml-1.5">Marketing</h1>
                <h3>500 jobs</h3>
              </div>
            </div>
            <div className="hidden sm:block">
             <Welcomer />
             </div>
          </div>
        </div>

        {/* RIGHT SIDE (Image beside banner & featured only) */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden hidden md:block">
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
      <div className="flex flex-col gap-6">
        <div className="bg-cyan-600 w-[350px] sm:w-full text-white text-center py-12 rounded-xl">
  <h2>Ready to Land Your Dream Job?</h2>
  <p className="mt-2">Join thousands of professionals on JobBoard today.</p>
  <button className="mt-4 bg-white text-cyan-600 font-semibold px-5 py-2 rounded">Get Started</button>
</div>

        <div className="py-10 text-center">
  <h2 className="mb-6-mad">Trusted by Top Companies</h2>
  <div className="testimonial-card">
    <FaGoogle size={40} />
    <FaApple size={40} />
    <FaMicrosoft size={40} />
  </div>
</div>
      </div>
    </div>
  );
}