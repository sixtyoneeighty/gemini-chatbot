import { Message as AIMessage } from "ai"

export interface Message {
  id: string | number
  text: string
  sender: "user" | "bot"
  timestamp: string
}

export function convertAIMessageToMessage(aiMessage: AIMessage): Message {
  return {
    id: aiMessage.id,
    text: aiMessage.content,
    sender: aiMessage.role === "user" ? "user" : "bot",
    timestamp: new Date().toLocaleTimeString()
  }
} 