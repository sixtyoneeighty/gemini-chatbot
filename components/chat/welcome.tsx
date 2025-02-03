"use client"

import Image from "next/image"

export function Welcome() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      <Image 
        src="/mojo-logo.png" 
        alt="Mojo Logo" 
        width={128}
        height={128}
        className="size-32 mb-6"
      />
      <h1 className="text-4xl font-bold mb-4 text-center">
        Hi, I&apos;m Mojo. Let&apos;s talk.
      </h1>
    </div>
  )
} 