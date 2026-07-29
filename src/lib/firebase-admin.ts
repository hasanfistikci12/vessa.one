import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

// Check if we have real firebase config, not just the placeholder
const hasFirebaseConfig = 
  !!process.env.ADMIN_FIREBASE_PROJECT_ID && 
  process.env.ADMIN_FIREBASE_PROJECT_ID !== 'your_project_id';

if (hasFirebaseConfig && !getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.ADMIN_FIREBASE_PROJECT_ID,
        clientEmail: process.env.ADMIN_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.ADMIN_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

let db: any = null;
try {
  db = getApps().length > 0 ? getFirestore() : null;
} catch (e) {
  console.warn("Failed to initialize Firestore", e);
}
export { db, admin };
