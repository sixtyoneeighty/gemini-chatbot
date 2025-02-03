"use client"

import { Menu } from "@headlessui/react"
import { LogOut, MessageSquarePlus, PanelLeftClose, PanelLeftOpen, User } from "lucide-react"
import Image from "next/image"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-stone-900 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col justify-between p-4 z-50`}
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <Image 
            src="/mojo-logo.png" 
            alt="Mojo" 
            width={40}
            height={40}
            className="size-10" 
          />
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isOpen ? (
              <PanelLeftClose className="size-5 text-gray-400" />
            ) : (
              <PanelLeftOpen className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <button
          className="w-full flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 mb-4"
        >
          <MessageSquarePlus className="w-5 h-5" />
          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      <div>
        <Menu as="div" className="relative">
          <Menu.Button className="w-full flex items-center gap-3 p-2 hover:bg-stone-900 rounded-lg transition-colors text-gray-300">
            <User className="w-5 h-5" />
            {isOpen && <span>Profile</span>}
          </Menu.Button>
          <Menu.Items className="absolute bottom-full left-0 w-full mb-2 bg-stone-900 rounded-lg shadow-lg p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-700" : ""
                  } flex items-center gap-2 w-full p-2 rounded-lg text-gray-300 text-sm`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  )
} 