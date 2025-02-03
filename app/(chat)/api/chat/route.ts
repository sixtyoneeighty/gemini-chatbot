import { google } from '@ai-sdk/google'
import { StreamingTextResponse, generateText } from 'ai'
import { NextResponse } from 'next/server'

import { auth } from "@/app/(auth)/auth";
import { saveChat, getChatById, deleteChatById } from "@/db/queries";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Initialize the model
    const model = google('gemini-1.5-pro-latest')

    // Generate streaming text response
    const response = await generateText({
      model,
      messages,
      stream: true,
    })

    // Return the streaming response
    return new StreamingTextResponse(response)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
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
