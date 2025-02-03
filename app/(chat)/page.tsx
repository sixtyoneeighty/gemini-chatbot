"use client"

import { useState } from "react"
import { Message } from "ai"
import { useChat } from "ai/react"

import { ChatLayout } from "@/components/chat/layout"
import { ChatInput } from "@/components/chat/input"
import { Messages } from "@/components/chat/messages"
import { Welcome } from "@/components/chat/welcome"

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit,
    isLoading,
    error 
  } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error)
      // You could add a toast notification here
    }
  })

  const handleSendMessage = (text: string) => {
    handleSubmit(new Event("submit") as any, { data: { message: text } })
  }

  return (
    <ChatLayout 
      isSidebarOpen={isSidebarOpen} 
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      {messages.length === 0 ? (
        <Welcome />
      ) : (
        <Messages 
          messages={messages.map(msg => ({
            id: msg.id,
            text: msg.content,
            sender: msg.role === "user" ? "user" : "bot",
            timestamp: new Date().toLocaleTimeString()
          }))} 
        />
      )}
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isSidebarOpen={isSidebarOpen}
        isLoading={isLoading}
      />
    </ChatLayout>
  )
}
