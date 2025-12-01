import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");
  const visited = req.cookies.get("visited")?.value;

  const res = NextResponse.next();

  // 1️⃣ Handle first-time visitor logic
  if (!visited) {
    res.cookies.set("visited", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    // Optional: redirect first-time visitors to a welcome/onboarding page
    // return NextResponse.redirect(new URL("/welcome", req.url));
  }

  // 2️⃣ Handle authentication logic for dashboard
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Apply middleware only to dashboard (and optionally onboarding pages)
export const config = {
  matcher: ["/dashboard"], // you can expand with "/welcome" if redirecting first-time visitors
};
