import { getChatsByUserId } from "@/db/queries";
import admin from 'firebase-admin';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import '@/lib/firebaseAdmin'; // Ensure Firebase Admin is initialized

export async function GET(request: Request) {
  // Remove incorrect session check: const session = await auth();

  // if (!session || !session.user) { - REMOVED Check - Handled by token verification
  //   return Response.json("Unauthorized!", { status: 401 });
  // }

  // --- Firebase Auth Check ---
  const authorization = request.headers.get("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized: Missing or invalid Authorization header" }, { status: 401 });
  }
  const token = authorization.split("Bearer ")[1];
  let userId: string;
  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    userId = decodedToken.uid;
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return Response.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
  }
  // --- End Firebase Auth Check ---

  // Use userId from decoded token instead of session.user.id
  const chats = await getChatsByUserId({ id: userId });
  return Response.json(chats);
}
