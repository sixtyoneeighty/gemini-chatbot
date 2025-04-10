'use client'; // Mark as client component

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { z } from "zod";

import { auth } from "@/lib/firebase";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from '../ui/label';

export function AuthForm({
  type, // 'login' or 'register'
  children, // Keep children for potential extra buttons like OAuth
  defaultEmail = '',
}: {
  type: 'login' | 'register';
  children?: React.ReactNode; // Make optional or remove if not needed
  defaultEmail?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to chat page or dashboard after login
        router.push('/'); // Adjust the redirect path as needed
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Redirect to chat page or dashboard after registration
        router.push('/'); // Adjust the redirect path as needed
      }
      // No need to manually redirect if using Firebase observer elsewhere for routing
    } catch (err) {
      const authError = err as AuthError;
      console.error(authError);
       // Provide more user-friendly error messages
       switch (authError.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
           case 'auth/invalid-email':
           setError('Please enter a valid email address.');
           break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm border-none"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          value={email} // Controlled component
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Password
        </Label>
        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm border-none"
          type="password"
          required
          value={password} // Controlled component
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p> // Display error
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading
          ? 'Processing...'
          : type === 'login'
          ? 'Log In'
          : 'Register'}
      </Button>

      {/* Render children if needed, e.g., for OAuth buttons */}
      {/* {children} */}
    </form>
  );
}
