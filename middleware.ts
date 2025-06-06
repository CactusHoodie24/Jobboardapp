import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // If no session or user, redirect to login
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userRole = session.user.role;
  const pathname = request.nextUrl.pathname;

  // If accessing /dashboard/seeker/apply, only allow APPLICANT
  if (pathname.startsWith("/dashboard/seeker/apply")) {
    if (userRole !== "APPLICANT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  // For all other /dashboard routes, only allow ADMIN
  else if (pathname.startsWith("/dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
