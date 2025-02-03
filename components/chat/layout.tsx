"use client"

import { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface ChatLayoutProps {
  children: ReactNode
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ChatLayout({ children, isSidebarOpen, onToggleSidebar }: ChatLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-lime-50">
      {/* Background Logo */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none bg-no-repeat bg-center z-0"
        style={{
          backgroundImage: `url('/mojo-logo.png')`,
          backgroundSize: '800px',
          filter: 'blur(1px)'
        }}
      />
      
      <Sidebar isOpen={isSidebarOpen} onToggle={onToggleSidebar} />
      <Header />
      
      <main className={`transition-all duration-300 relative z-10 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {children}
      </main>
    </div>
  )
} 