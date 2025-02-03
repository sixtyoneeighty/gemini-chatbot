"use client"

import { Message } from "@/types/chat"

import { ChatBubble } from "./bubble"

interface MessagesProps {
  messages: Message[]
}

export function Messages({ messages }: MessagesProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message.text}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  )
} 