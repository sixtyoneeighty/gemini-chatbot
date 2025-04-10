// lib/firebaseAdmin.ts
import admin from 'firebase-admin';

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  // Use environment variable for the service account key path
  const serviceAccount = require(process.env.FIREBASE_ADMIN_CREDENTIALS_PATH || './serviceAccountKey.json'); // Replace with the actual path if needed

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const app = admin.app();
