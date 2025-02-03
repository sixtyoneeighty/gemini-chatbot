import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
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
})

export const config = {
  providers: [] // Add your providers here
}
