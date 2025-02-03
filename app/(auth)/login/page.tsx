"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/(chat)/page");
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-zinc-900 p-6 text-white">
        <div>
          <h2 className="text-center text-3xl font-bold">Sign in to Mojo</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-500 p-4 text-white">
              {error}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-gray-400"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-gray-400"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-lime-600 px-4 py-3 text-sm font-medium text-white hover:bg-lime-700"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
