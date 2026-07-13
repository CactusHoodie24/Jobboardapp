import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token");
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

// Apply middleware to /dashboard and every route nested under it
export const config = {
  matcher: ["/dashboard/:path*"],
};
