import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  // ... existing configuration ...
  secret: process.env.AUTH_SECRET,
  // ... other options ...
};

// ... rest of the file ...