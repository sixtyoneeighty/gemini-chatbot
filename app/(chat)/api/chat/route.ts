import { google } from '@ai-sdk/google'
import { StreamingTextResponse } from 'ai'
import { auth } from "@/app/(auth)/auth.config"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]

  // Create a Gemini Pro model instance
  const model = google('models/gemini-pro')

  // Generate a streaming response
  const response = await model.streamText({
    messages: [{ role: 'user', content: lastMessage.content }]
  })

  // Return the streaming response
  return new StreamingTextResponse(response)
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
