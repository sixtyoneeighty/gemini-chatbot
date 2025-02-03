import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai"
import { auth } from "@/app/(auth)/auth.config"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]

  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(lastMessage.content)

  const stream = GoogleGenerativeAIStream(geminiStream)
  return new StreamingTextResponse(stream)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
