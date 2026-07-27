import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

// Check if we have real firebase config, not just the placeholder
const hasFirebaseConfig = 
  !!process.env.FIREBASE_PROJECT_ID && 
  process.env.FIREBASE_PROJECT_ID !== 'your_project_id';

if (hasFirebaseConfig && !getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

// If no config or initialization failed, db will be null. We handle this in the db functions to return mock data.
const db = getApps().length > 0 ? getFirestore() : null;
export { db, admin };
