"use client";

import { Message as AIMessage, useChat } from "ai";
import { Attachment } from "ai";
import { useEffect, useRef } from "react";

import { Message } from "./message";

interface ChatProps {
  id: string;
  initialMessages?: Array<AIMessage>;
}

export function Chat({ id, initialMessages }: ChatProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    setMessages,
  } = useChat({
    api: "/api/chat",
    id,
    initialMessages,
    body: {
      id,
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pb-[200px] pt-4 space-y-6"
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            role={message.role}
            content={message.content}
            attachments={message.experimental_attachments}
          />
        ))}

        {isLoading && (
          <Message
            role="assistant"
            content="..."
          />
        )}

        {error && (
          <Message
            role="assistant"
            content="An error occurred. Please try again."
          />
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-white dark:to-zinc-900 p-4"
      >
        <div className="mx-auto max-w-[500px] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-md px-4 py-2"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            <button
              className="bg-zinc-900 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md px-4 py-2"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
