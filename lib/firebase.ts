// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Import other Firebase services if needed (e.g., getFirestore, getStorage)

const firebaseConfig = {
  apiKey: "AIzaSyBnZbkoN8bzSc3wXVq6dnrUgqcHvk37Ufk",
  authDomain: "nudistai-b1d93.firebaseapp.com",
  projectId: "nudistai-b1d93",
  storageBucket: "nudistai-b1d93.appspot.com", // Standard format
  messagingSenderId: "1048019928534",
  appId: "1:1048019928534:web:4fe92e31fa2204e8f39077",
  measurementId: "G-2VB2ZXYFZ7"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
// Initialize other services here if needed:
// const db = getFirestore(app);
// const storage = getStorage(app);

// Export the initialized services
export { app, auth };
