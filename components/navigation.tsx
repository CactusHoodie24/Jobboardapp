"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { FormEvent, useEffect, useState } from "react"
import { FaBars, FaHamburger, FaTimes } from "react-icons/fa"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CldUploadWidget } from "next-cloudinary"
import type { ProfileInput } from "@/lib/zod"
import axios from "axios"
import { X } from "lucide-react"

interface ValidationErrors {
  phonenumber?: string
  image?: string
}

export const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isTouched, setIsTouched] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isWidgetActive, setIsWidgetActive] = useState(false)
  const [formData, setFormData] = useState<ProfileInput & { image?: string }>({
    phonenumber: "",
    image: "",
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [successCv, setSuccessCV] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    router.refresh()
    toast.success(`Welcome ${session?.user.name} to the JobsboardApp`)
    if (session?.user.role === "USER") {
      setTimeout(() => {
        toast.warning("Complete Your Profile to Apply for a Job")
      }, 2000)
    }
  }, [session?.user?.name])

  const nav = [
    { name: "Home", href: "/" },
    {name: "About", href: '/about-us'},
    { name: "Jobs", href: "/jobs" },
    { name: "Applications", href: "/dashboard/seeker/applications" },
  ]

  const isLoading = status === "loading"
  const isLoggedIn = !!session?.user

  // 🚫 Avoid hydration errors: wait for client render
  if (!hasMounted) return null

  const payload = {
    phonenumber: formData.phonenumber,
    image: formData.image,
    fullName: session?.user.name,
    email: session?.user.email,
  }

  const sendCv = () => {
    try {
      const sendCVF = async () => {
        const res = await axios.post('/api/application/apply', payload)
        console.log(payload)
        if(res.status === 200) {
          setSuccessCV(true)
        } else {
          setSuccessCV(false)
        }
      }
      sendCVF()
    } catch (error) {
       console.error(error)
    } finally {
      setSuccessCV(false)
    }
  }

    function go() {
   router.push(`/login?state=register`);
  }


  return (
    <div className="flex justify-between">
      <div className="sm:flex sm:justify-between mt-4 w-full">
      
       {!isTouched ? (
  <FaBars
    onClick={() => setIsTouched(true)}
    className="sm:hidden ml-3.5 flex mb-5 cursor-pointer text-2xl"
  />
) : (
  <FaTimes
    onClick={() => setIsTouched(false)}
    className="sm:hidden ml-3.5 flex mb-5 cursor-pointer text-2xl"
  />
)}
        
        {/* Mobile nav dropdown */}
      {isTouched && (
  <div className="sm:hidden absolute top-16 left-0 w-full bg-gray-900 bg-opacity-95 p-6 z-50 flex flex-col items-start">
    <ul className="flex flex-col gap-6 w-full">
      {nav.map((navItem, index) => (
        <Link
          key={index}
          href={navItem.href}
          onClick={() => setIsTouched(false)} // close menu when clicking
          className={clsx(
            "text-white font-semibold hover:text-cyan-400 transition-colors",
            {
              "text-cyan-500": pathname === navItem.href,
            }
          )}
        >
          {navItem.name}
        </Link>
      ))}
    </ul>
  </div>
)}

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-48">
          <h1 className="text-cyan-500 font-bold">JOBBOARD</h1>
          <ul className="flex gap-6 relative">
            {nav.map((navItem, index) => (
              <li key={index} className="relative">
                <Link
                  href={navItem.href}
                  className={clsx("text-white", {
                    'after:content-[""] after:absolute after:bottom-[-10px] after:left-1/2 after:w-[30px] after:h-[2px] after:bg-[#06B6D4] after:-translate-x-1/2':
                      pathname === navItem.href,
                  })}
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side: Login or user info */}
      {!isLoading &&
        (isLoggedIn ? (
          !isTouched && (
            <div className="flex items-center gap-3 mt-2">
              <Button className="cursor-pointer" onClick={() => signOut()} variant="secondary">
                SignOut
              </Button>

              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
                options={{
                  multiple: false,
                  maxFiles: 1,
                  resourceType: "raw",
                  maxFileSize: 10000000, // 10MB
                  sources: ["local"],
                  folder: "user-cvs",
                  clientAllowedFormats: ["pdf"],
                  showPoweredBy: false,
                  theme: "minimal",
                  cropping: false,
                  publicId: `cv_${Date.now()}`,
                  tags: ["cv", "user-upload"],
                  context: {
                    alt: "User CV PDF",
                    caption: "CV Upload",
                  },
                  styles: {
                    palette: {
                      window: "#FFFFFF",
                      windowBorder: "#90A0B3",
                      tabIcon: "#0078FF",
                      menuIcons: "#5A616A",
                      textDark: "#000000",
                      textLight: "#FFFFFF",
                      link: "#0078FF",
                      action: "#FF620C",
                      inactiveTabIcon: "#0E2F5A",
                      error: "#F44235",
                      inProgress: "#0078FF",
                      complete: "#20B832",
                      sourceBg: "#E4EBF1",
                    },
                    frame: {
                      background: "#FFFFFF",
                    },
                  },
              
                }}
                onOpen={(widget) => {
                  console.log("✅ Cloudinary widget opened successfully", widget)
                  setIsWidgetActive(true)
                }}
                onClose={(widget) => {
                  console.log("❌ Cloudinary widget closed", widget)
                  setIsWidgetActive(false)
                }}
                onSuccess={(result: any) => {
                  console.log("🎉 Upload success:", result)
                  setFormData((prev) => ({ ...prev, image: result.info.secure_url }))
                  setErrors((prev) => ({ ...prev, image: undefined }))
                  setIsWidgetActive(false)

                  toast.success("CV uploaded successfully!", {
                    description: "Your CV has been uploaded and is ready to use.",
                  })
                }}
                onError={(error: any) => {
                  console.error("💥 Upload error:", error)
                  setErrors((prev) => ({ ...prev, image: "CV upload failed" }))
                  setIsWidgetActive(false)

                  toast.error("CV upload failed", {
                    description: error.message || "Please check your Cloudinary configuration and try again.",
                  })
                }}
                onQueuesEnd={(result: any, { widget }) => {
                  console.log("📋 Upload queues ended:", result)
                  setIsWidgetActive(false)
                }}
              >
                {({ open, isLoading }) => (
                  <Popover
                    open={isPopoverOpen}
                    onOpenChange={(open) => {
                      if (!open && isWidgetActive) {
                        return
                      }
                      setIsPopoverOpen(open)
                    }}
                  >
                    <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>
                      <span
                        className={clsx("w-8 h-8 rounded-full bg-amber-300  p-2 flex items-center justify-center", {
                          "border-2 border-blue-400": session.user.role === "USER",
                        })}
                      >
                        <h1 className="text-sm font-bold">{session?.user?.name?.slice(0, 2).toUpperCase()}</h1>
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" style={{ zIndex: 1000 }}>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="leading-none font-medium">Profile</h4>
                          <p className="text-muted-foreground text-sm">Complete Your Profile to start Applying.</p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Phone number</Label>
                            <Input id="width" value={formData.phonenumber}  onChange={(e) =>
    setFormData(prev => ({
      ...prev,
      phonenumber: e.target.value
    }))} className="col-span-2 h-8" />
                            {errors.phonenumber && <p className="text-sm text-red-600">{errors.phonenumber}</p>}
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="cv">CV (PDF)</Label>
                            <Button
                              type="button"
                              variant="outline"
                              disabled={isLoading}
                              onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()

                                console.log("🔄 Upload button clicked")

                                if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
                                  console.error("❌ Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME")
                                  toast.error("Configuration Error", {
                                    description:
                                      "Cloudinary cloud name is not configured. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to your environment variables.",
                                  })
                                  return
                                }

                                if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
                                  console.error("❌ Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET")
                                  toast.error("Configuration Error", {
                                    description:
                                      "Cloudinary upload preset is not configured. Please add NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your environment variables.",
                                  })
                                  return
                                }

                                console.log("🔧 Cloudinary Config:", {
                                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                                  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                                })

                                try {
                                  setIsWidgetActive(true)
                                  setTimeout(() => {
                                    open()
                                  }, 100)
                                } catch (error) {
                                  console.error("💥 Error opening widget:", error)
                                  setIsWidgetActive(false)
                                  toast.error("Failed to open upload widget", {
                                    description: "Please check your internet connection and Cloudinary configuration.",
                                  })
                                }
                              }}
                              className={`col-span-2 h-8 ${errors.image ? "border-red-500" : ""}`}
                            >
                              {isLoading ? "Opening..." : "Upload CV"}
                            </Button>
                          </div>
                          {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                          <Button onClick={sendCv}>Save</Button>
                          {successCv && <h4 className="text-green-500">Uploaded Successfully</h4>}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </CldUploadWidget>
            </div>
          )
        ) : (
          <div className="flex gap-2.5">
            <Link href='/login'>
            <Button className="mt-2.5 cursor-pointer bg-cyan-500">
              Login
            </Button>
            </Link>
            <Button onClick={go} className="mt-2.5 cursor-pointer hover:bg-cyan-500 hover:text-white" variant="secondary">
              SignUp
            </Button>
          </div>
        ))}
    </div>
  )
}
