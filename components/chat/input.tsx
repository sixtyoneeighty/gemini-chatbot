"use client"

import { PaperclipIcon, SendIcon } from "lucide-react"
import { FormEvent, useState } from "react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isSidebarOpen: boolean
  isLoading?: boolean
}

export function ChatInput({ onSendMessage, isSidebarOpen, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <div className={`chat-input-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <form
        onSubmit={handleSubmit}
        className="chat-input-form flex items-center gap-2"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message Mojo..."
            className="w-full bg-transparent text-gray-300 rounded-lg pl-4 pr-12 py-2 focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <PaperclipIcon className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-zinc-500 hover:bg-zinc-600 text-gray-200 rounded-lg p-2 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <SendIcon className="size-5" />
        </button>
      </form>
    </div>
  )
} 