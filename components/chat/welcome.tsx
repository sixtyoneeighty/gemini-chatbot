"use client"

export function Welcome() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      <img 
        src="/mojo-logo.png" 
        alt="Mojo Logo" 
        className="w-32 h-32 mb-6"
      />
      <h1 className="text-4xl font-bold mb-4 text-center">
        Hi, I'm Mojo. Let's talk.
      </h1>
    </div>
  )
} 