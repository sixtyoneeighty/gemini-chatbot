"use client"

import { Download } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
      setDate(now.toLocaleDateString([], { 
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-16 right-0 p-4 bg-gradient-to-b from-gray-950 to-transparent flex justify-between items-center">
      <div className="flex-1" />
      <div className="flex flex-col items-center">
        <div className="font-bold text-gray-300 text-base leading-none mb-1">{time}</div>
        <div className="text-xs text-gray-400">{date}</div>
      </div>
      <div className="flex-1 flex justify-end">
        <button className="text-gray-400 hover:text-gray-300 transition-colors">
          <Download className="size-5" />
        </button>
      </div>
    </div>
  )
} 