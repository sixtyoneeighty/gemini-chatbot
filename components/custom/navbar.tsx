"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth as firebaseAuth } from '@/lib/firebase'; // Client-side Firebase auth instance
import { useRouter } from 'next/navigation';

import { History } from "./history";
import { SlashIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Navbar = () => {
  const [user, loadingAuth, errorAuth] = useAuthState(firebaseAuth);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      // Optionally redirect after sign out, e.g., to home page
      router.push('/'); 
      // Or use router.refresh() if you want the page to reload data based on auth state
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle sign-out error (e.g., show a notification)
    }
  };

  return (
    <>
      <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
        <div className="flex flex-row gap-3 items-center">
          <History user={user} />
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/images/gemini-logo.png"
              height={20}
              width={20}
              alt="gemini logo"
            />
            <div className="text-zinc-500">
              <SlashIcon size={16} />
            </div>
            <div className="text-sm dark:text-zinc-300 truncate w-28 md:w-fit">
              Nudist AI
            </div>
          </div>
        </div>

        {loadingAuth ? (
           <div>Loading User...</div>
         ) : errorAuth ? (
           <div>Error loading user</div>
         ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="py-1.5 px-2 h-fit font-normal"
                variant="secondary"
              >
                {user.email}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ThemeToggle />
              </DropdownMenuItem>
              <DropdownMenuItem className="p-1 z-50">
                <button
                  onClick={handleSignOut}
                  type="button"
                  className="w-full text-left px-1 py-0.5 text-red-500"
                >
                  Sign out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="py-1.5 px-2 h-fit font-normal text-white" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
};
