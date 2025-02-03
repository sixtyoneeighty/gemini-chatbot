import NextAuth from "next-auth";
import { authConfig } from "@/app/(auth)/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Initialize the auth middleware
const { auth: nextAuth } = NextAuth(authConfig);

// Wrap the auth middleware to handle custom redirects
export default async function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("next-auth.session-token");
  
  // If user is logged in and trying to access home, redirect to chat
  if (isAuthenticated && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/(chat)/page", request.url));
  }

  // Call the next-auth middleware
  const authResult = await nextAuth(request);

  // If auth middleware returns a response, return it
  if (authResult) return authResult;

  // Otherwise, continue with the request
  return NextResponse.next();
}

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
    "/:id",
    "/api/:path*",
    "/login",
    "/register"
  ]
};
