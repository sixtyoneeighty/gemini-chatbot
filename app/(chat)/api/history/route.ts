import { auth } from "@/app/(auth)/auth";
import { getChatsByUserId } from "@/db/queries";

export async function GET() {
  try {
    console.log("Fetching chat history - Starting auth check");
    const session = await auth();

    if (!session) {
      console.log("No session found");
      return Response.json({ error: "No session" }, { status: 401 });
    }

    if (!session.user) {
      console.log("No user in session");
      return Response.json({ error: "No user in session" }, { status: 401 });
    }

    console.log("Auth check passed, fetching chats for user:", session.user.id);
    const chats = await getChatsByUserId({ id: session.user.id! });
    console.log("Successfully fetched chats:", chats);
    return Response.json(chats);
  } catch (error) {
    console.error("Failed to fetch chat history:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return Response.json(
      { error: "Failed to fetch chat history", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
