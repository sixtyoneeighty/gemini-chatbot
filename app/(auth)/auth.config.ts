import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User } from "next-auth"

import { db } from "@/db"

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        // Add your credential validation logic here
        if (!credentials?.email || !credentials?.password) return null
        
        // For testing, return a mock user
        return {
          id: "1",
          name: "Test User",
          email: credentials.email as string, // Cast to string since we know it exists
          image: null
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
    verifyRequest: "/verify",
    newUser: "/register"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/(chat)")
      
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/(chat)/page", nextUrl))
      }
      return true
    }
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig)

export const config = {
  providers: [] // Add your providers here
}
