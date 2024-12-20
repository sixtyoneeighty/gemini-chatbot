import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";

import { users, chats, reservations } from "./schema";

let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string): Promise<Array<any>> {
  try {
    return await db.select().from(users).where(eq(users.email, email));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  try {
    return await db.insert(users).values({
      id: uuidv4(),
      email,
      password: hash,
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chats)
      .where(eq(chats.user_id, id))
      .orderBy(desc(chats.created_at));
  } catch (error) {
    console.error("Failed to get chats from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    return await db.select().from(chats).where(eq(chats.id, id));
  } catch (error) {
    console.error("Failed to get chat from database");
    throw error;
  }
}

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string;
  messages: any;
  userId: string;
}) {
  try {
    const selectedChats = await db.select().from(chats).where(eq(chats.id, id));

    if (selectedChats.length > 0) {
      return await db
        .update(chats)
        .set({ messages })
        .where(eq(chats.id, id));
    }

    return await db.insert(chats).values({
      id: uuidv4(),
      user_id: userId,
      messages,
      created_at: new Date(),
    });
  } catch (error) {
    console.error("Failed to save chat to database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    return await db.delete(chats).where(eq(chats.id, id));
  } catch (error) {
    console.error("Failed to delete chat from database");
    throw error;
  }
}

export async function createReservation({
  id,
  userId,
  details,
}: {
  id: string;
  userId: string;
  details: any;
}) {
  try {
    return await db.insert(reservations).values({
      id: uuidv4(),
      user_id: userId,
      details,
      created_at: new Date(),
      has_completed_payment: false,
    });
  } catch (error) {
    console.error("Failed to create reservation in database");
    throw error;
  }
}

export async function getReservationById({ id }: { id: string }) {
  try {
    return await db.select().from(reservations).where(eq(reservations.id, id));
  } catch (error) {
    console.error("Failed to get reservation from database");
    throw error;
  }
}

export async function updateReservation({
  id,
  has_completed_payment,
}: {
  id: string;
  has_completed_payment: boolean;
}) {
  try {
    return await db
      .update(reservations)
      .set({ has_completed_payment })
      .where(eq(reservations.id, id));
  } catch (error) {
    console.error("Failed to update reservation in database");
    throw error;
  }
}
