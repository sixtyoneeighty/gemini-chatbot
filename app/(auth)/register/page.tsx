"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, AuthError } from 'firebase/auth'; // Firebase imports
import { auth } from '@/lib/firebase'; // Firebase auth instance
import { AuthForm } from '@/components/custom/auth-form'; // Ensure correct path
import { LogoGoogle } from '@/components/custom/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; // Keep useState for loading/error state for Google Sign-In

export default function RegisterPage() {
  const router = useRouter();
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setGoogleError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect to chat page or dashboard after successful sign-in
      router.push('/'); // Adjust the redirect path as needed
       // No need to manually redirect if using Firebase observer elsewhere for routing
    } catch (error) {
       const authError = error as AuthError;
      console.error('Google Sign-In Error:', authError);
       setGoogleError('Failed to sign in with Google. Please try again.');
      // Handle specific errors if needed (e.g., auth/popup-closed-by-user)
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign Up</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Create an account to get started
          </p>
        </div>

        <div className="flex flex-col gap-4 px-4 sm:px-16"> {/* Increased gap */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              'Processing...'
            ) : (
              <>
                <LogoGoogle size={16} />
                Sign up with Google
              </>
            )}
          </Button>

           {googleError && (
             <p className="text-red-500 text-sm text-center -mt-2">{googleError}</p> // Display Google error
           )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
        </div>

        {/* Render the AuthForm component for registration */}
        <AuthForm type="register" />

         {/* Link to login page - placed outside the form */}
        <div className="px-4 sm:px-16 pb-4"> {/* Added padding */}
          <p className="text-center text-sm text-gray-600 dark:text-zinc-400">
            {'Already have an account? '}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
            {' instead.'}
          </p>
        </div>
      </div>
    </div>
  );
}
