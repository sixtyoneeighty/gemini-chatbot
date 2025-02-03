import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/(auth)/auth.config";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  
  // If user is logged in and trying to access home, redirect to chat
  if (session && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/(chat)/page", request.url));
  }

  // For all other routes, continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
    "/",
    "/api/:path*",
    "/login",
    "/register"
  ]
};
