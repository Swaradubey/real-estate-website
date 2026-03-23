import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only on client side or if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics is only available in the browser
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

/**
 * Test Firestore connection by writing a test document
 * Call this function to verify Firebase is properly connected
 */
export async function testFirestoreConnection(): Promise<void> {
  try {
    console.log("[Firebase Test] Starting Firestore connection test...");
    
    // Check if Firebase is initialized
    const apps = getApps();
    console.log(`[Firebase Test] Firebase apps initialized: ${apps.length}`);
    
    if (apps.length === 0) {
      console.error("[Firebase Test] ERROR: Firebase is not initialized!");
      return;
    }
    
    // Check configuration
    const config = apps[0].options;
    console.log(`[Firebase Test] Project ID: ${config.projectId}`);
    console.log(`[Firebase Test] Auth Domain: ${config.authDomain}`);
    
    // Attempt to write a test document
    const testCollection = collection(db, "_connection_tests");
    const testDoc = await addDoc(testCollection, {
      timestamp: serverTimestamp(),
      test: true,
      message: "Connection test",
    });
    
    console.log(`[Firebase Test] SUCCESS: Firestore is connected!`);
    console.log(`[Firebase Test] Test document written with ID: ${testDoc.id}`);
    console.log(`[Firebase Test] Connection is working properly.`);
    
  } catch (error: unknown) {
    console.error("[Firebase Test] ERROR: Firestore connection test failed");
    
    if (error instanceof Error) {
      console.error(`[Firebase Test] Error message: ${error.message}`);
      
      // Check for specific Firebase errors
      if (error.message.includes("permission-denied")) {
        console.warn("[Firebase Test] PERMISSION DENIED: Firebase is connected but Firestore rules are blocking writes.");
        console.warn("[Firebase Test] This means your connection is working, but you need to update your Firestore security rules.");
        console.warn("[Firebase Test] Visit: https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/rules");
      } else if (error.message.includes("unauthenticated")) {
        console.warn("[Firebase Test] AUTH REQUIRED: Firebase is connected but authentication is required for writes.");
      } else if (error.message.includes("not-found")) {
        console.error("[Firebase Test] DATABASE NOT FOUND: The Firestore database may not exist yet.");
      } else if (error.message.includes("network")) {
        console.error("[Firebase Test] NETWORK ERROR: Check your internet connection.");
      }
    }
    
    throw error;
  }
}
