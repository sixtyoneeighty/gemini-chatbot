import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from './lib/firebase'; // Import your Firebase config

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const publicPages = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });

  const isPublicPage = publicPages.includes(nextUrl.pathname);

  if (!user && !isPublicPage) {
    // User is not signed in and is trying to access a protected page
    return NextResponse.redirect(new URL('/login', nextUrl.origin));
  }

  if (user && isPublicPage) {
    // User is signed in and is trying to access a public page
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/:path*", "/api/:path*"],
};
