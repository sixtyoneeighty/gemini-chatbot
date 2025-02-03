import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { users, sessions } from "./schema"

export const db = drizzle(sql, {
  schema: {
    users,
    sessions
  }
})

export type DB = typeof db 