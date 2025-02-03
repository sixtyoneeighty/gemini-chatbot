import NextAuth from "next-auth";
import { authConfig } from "@/app/(auth)/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth;

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("next-auth.session-token");
  
  // If user is logged in and trying to access home, redirect to chat
  if (isAuthenticated && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/(chat)/page", request.url));
  }

  return auth(request);
}

export const config = {
  matcher: ["/", "/:id", "/api/:path*", "/login", "/register"]
};
