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
          <div className="flex flex-col gap-2.5">
            <Banner />
          </div>

          {/* Featured Categories */}
          <div>
            <h2 className="mb-2.5 font-bold text-lg">Featured Categories</h2>
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col py-2.5 px-6 border rounded-sm">
                <Laptop className="text-cyan-500 ml-2.5" />
                <h2 className="font-bold ml-1.5">Tech</h2>
                <h3 className="text-sm">1200 jobs</h3>
              </div>
              <div className="flex flex-col py-2.5 px-6 border rounded-sm">
                <Pencil className="text-cyan-500 ml-2.5" />
                <h2 className="font-bold ml-1.5">Design</h2>
                <h3 className="text-sm">980 jobs</h3>
              </div>
              <div className="flex flex-col py-2.5 px-6 border rounded-sm">
                <Megaphone className="text-cyan-500 ml-2.5" />
                <h2 className="font-bold ml-1.5">Marketing</h2>
                <h3 className="text-sm">500 jobs</h3>
              </div>
              <div className="flex flex-col py-2.5 px-6 border rounded-sm">
                <Clock className="text-cyan-500 ml-2.5" />
                <h2 className="font-bold ml-1.5">Part-Time</h2>
                <h3 className="text-sm">300 jobs</h3>
              </div>
            </div>
             <Welcomer />
          </div>
        </div>

        {/* RIGHT SIDE (Image beside banner & featured only) */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/image-from-rawpixel-id-14568900-png.png"
            alt="Job illustration"
            fill
            className="object-cover bg-white"
            priority
          />
        </div>
      </div>

      {/* SECTION 2: Recently Added + Welcomer (full width) */}
      <div className="flex flex-col gap-6">
        <div className="bg-cyan-600 text-white text-center py-12 rounded-xl">
  <h2 className="text-3xl font-bold">Ready to Land Your Dream Job?</h2>
  <p className="mt-2">Join thousands of professionals on JobBoard today.</p>
  <button className="mt-4 bg-white text-cyan-600 font-semibold px-5 py-2 rounded">Get Started</button>
</div>

        <div className="py-10 text-center">
  <h2 className="text-2xl font-bold mb-6">Trusted by Top Companies</h2>
  <div className="flex justify-center gap-8 opacity-75">
    <FaGoogle size={40} />
    <FaApple size={40} />
    <FaMicrosoft size={40} />
  </div>
</div>
      </div>
    </div>
  );
}
