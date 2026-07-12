// ...existing code...
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Fraunces } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import ClientLayout from "@/components/ClientLayout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const siteUrl = "https://jobboard.stoneageengines.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JobBoard — Find Jobs & Hire Talent",
    template: "%s | JobBoard",
  },
  description:
    "JobBoard connects employers with job seekers. Browse tech, design, and marketing roles, or post a job and find qualified candidates fast.",
  keywords: ["jobs", "job board", "hiring", "careers", "job search", "recruitment"],
  openGraph: {
    title: "JobBoard — Find Jobs & Hire Talent",
    description:
      "Browse open roles across tech, design, and marketing, or post a job and connect with qualified candidates.",
    url: siteUrl,
    siteName: "JobBoard",
    type: "website",
    images: [
      {
        url: "/image-from-rawpixel-id-14568900-png.png",
        width: 1200,
        height: 630,
        alt: "JobBoard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobBoard — Find Jobs & Hire Talent",
    description:
      "Browse open roles across tech, design, and marketing, or post a job and connect with qualified candidates.",
    images: ["/image-from-rawpixel-id-14568900-png.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add "dark" class here to enable dark mode by default
    <html lang="en" className="dark">
      <body className="antialiased  text-white">
        <SessionProvider>
          <div className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} max-w-6xl mx-auto px-4`}>
            <Navigation />
            {children}
          </div>
        </SessionProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

// ...existing code...