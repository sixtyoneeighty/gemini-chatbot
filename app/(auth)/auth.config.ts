import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

const credentialsSchema = z.object({ 
  email: z.string().email(),
  password: z.string().min(6) 
})

export const authConfig = {
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        // For development, accept any valid email/password
        return {
          id: "1",
          name: "Test User",
          email: parsed.data.email
        }
      }
    })
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/(chat)")
      
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      return true
    }
  }
} satisfies NextAuthConfig

export const { auth, signIn, signOut } = NextAuth(authConfig)

export const config = {
  providers: [] // Add your providers here
}
