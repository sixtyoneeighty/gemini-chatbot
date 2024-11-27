import { auth } from "@/app/(auth)/auth";
import { getChatsByUserId } from "@/db/queries";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chats = await getChatsByUserId({ id: session.user.id! });
    return Response.json(chats);
  } catch (error) {
    console.error("Failed to fetch chat history:", error);
    return Response.json(
      { error: "Failed to fetch chat history" },
      { status: 500 }
    );
  }
}
