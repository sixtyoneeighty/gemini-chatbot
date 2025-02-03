"use client"

interface ChatBubbleProps {
  message: string
  sender: "user" | "bot"
  timestamp: string
}

export function ChatBubble({ message, sender, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-4 animate-fadeIn`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          sender === "user"
            ? "bg-neutral-800 text-gray-200 border border-stone-700"
            : "bg-stone-900 text-gray-300 border border-zinc-800"
        }`}
      >
        <p className="text-sm md:text-base">{message}</p>
        <span className="text-xs opacity-60 mt-1 block">
          {timestamp}
        </span>
      </div>
    </div>
  )
} 