import { GoogleAuthProvider, signInWithPopup, AuthError } from 'firebase/auth'; // Firebase imports
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthForm } from '@/components/custom/auth-form'; // Ensure correct path
import { LogoGoogle } from '@/components/custom/icons';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase'; // Firebase auth instance

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign In</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>

        {/* Render the AuthForm component for login */}
        <AuthForm type="login" />

        {/* Link to register page - placed outside the form */}
        <div className="px-4 sm:px-16 pb-4"> {/* Added padding for consistency */}
          <p className="text-center text-sm text-gray-600 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {' for free.'}
          </p>
        </div>
      </div>
    </div>
  );
}
