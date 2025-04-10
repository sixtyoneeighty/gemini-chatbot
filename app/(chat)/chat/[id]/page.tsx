"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { CoreMessage } from "ai";
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth as firebaseAuth } from '@/lib/firebase'; // Client-side Firebase auth instance
import { Chat as PreviewChat } from "@/components/custom/chat";
// We need an API route to fetch chat data securely now
// import { getChatById } from "@/db/queries"; // Can't use DB queries directly on client
import { Chat } from "@/db/schema";
import { convertToUIMessages } from "@/lib/utils";

// Define a type for the chat data we expect from the API
interface ChatData extends Omit<Chat, 'messages'> {
  messages: Array<CoreMessage>;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [user, loadingAuth, errorAuth] = useAuthState(firebaseAuth);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loadingAuth) return; // Wait for auth state to load

    if (!user) {
      // If user is not logged in after auth check, redirect to login
      router.push('/login');
      return;
    }

    // Fetch chat data from an API route
    const fetchChat = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Assume an API route /api/chat/[id] exists for fetching a specific chat
        // This route would use Firebase Admin SDK to verify auth
        const response = await fetch(`/api/chat/${id}`, {
           headers: {
             'Authorization': `Bearer ${await user.getIdToken()}`
           }
        });

        if (response.status === 404) {
          notFound(); // Trigger Next.js not found page
          return;
        }
        if (response.status === 401 || response.status === 403) {
           setError("Unauthorized access."); // Or redirect
           router.push('/'); // Redirect to home on auth error
           return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch chat data');
        }

        const chatData: ChatData = await response.json();

        // Now authorize on the client:
        // Check if the fetched chat belongs to the current user
        if (chatData.userId !== user.uid) {
           setError("Unauthorized access.");
           router.push('/'); // Redirect if user doesn't own the chat
           return;
        }

        // Convert messages and set state
        setChat({
          ...chatData,
          messages: convertToUIMessages(chatData.messages),
        });

      } catch (err: any) {
        console.error("Error fetching chat:", err);
        setError(err.message || "Failed to load chat.");
        // Optionally redirect or show a generic error message
        // notFound(); // Could use notFound if fetch fails fundamentally
      } finally {
        setIsLoading(false);
      }
    };

    fetchChat();

  }, [id, user, loadingAuth, router]); // Add dependencies

  // --- Server-side logic removed --- 
  // const chatFromDb = await getChatById({ id });
  // if (!chatFromDb) { ... }
  // const chat: Chat = { ... };
  // const session = await auth();
  // if (!session || !session.user) { ... }
  // if (session.user.id !== chat.userId) { ... }
  // --- End Server-side logic removed ---

  if (loadingAuth || isLoading) {
    // TODO: Add a proper loading skeleton/spinner
    return <div>Loading...</div>;
  }

  if (errorAuth) {
    // Handle Firebase auth hook error (e.g., network issue)
    console.error("Firebase Auth Error:", errorAuth);
    return <div>Error loading authentication status. Please try again.</div>;
  }

  if (error) {
    // Handle chat fetch/authorization error
    return <div>Error: {error}</div>;
  }

  if (!chat) {
     // This case should ideally be handled by loading/error states or notFound()
     // If it reaches here, something unexpected happened
     return <div>Chat not found or access denied.</div>; 
  }

  // Render the chat component once data is loaded and authorized
  return <PreviewChat id={chat.id} initialMessages={chat.messages} />;
}
