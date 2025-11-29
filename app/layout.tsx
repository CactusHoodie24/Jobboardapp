// ...existing code...
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Jobboard App",
  description: "Linking employers to seekers",
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
          <div className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} max-w-6xl mx-auto px-4`}>
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