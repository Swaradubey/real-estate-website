import type { FirebaseApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function hasValidFirebaseWebConfig(): boolean {
  const key = typeof firebaseConfig.apiKey === "string" ? firebaseConfig.apiKey.trim() : "";
  const projectId =
    typeof firebaseConfig.projectId === "string" ? firebaseConfig.projectId.trim() : "";
  return Boolean(key && projectId);
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (hasValidFirebaseWebConfig()) {
  try {
    const a = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(a);
    db = getFirestore(a);
    storage = getStorage(a);
    app = a;
  } catch (e) {
    console.warn("[Firebase] Initialization skipped or failed (missing/invalid env on server build?):", e);
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
}

export const analytics: Analytics | null =
  typeof window !== "undefined" && app ? getAnalytics(app) : null;

export { auth, db, storage };
export default app;

export function isFirebaseConfigured(): boolean {
  return app !== null && db !== null;
}

export async function testFirestoreConnection(): Promise<void> {
  try {
    console.log("[Firebase Test] Starting Firestore connection test...");

    if (!app || !db) {
      console.error("[Firebase Test] ERROR: Firebase is not initialized (check NEXT_PUBLIC_* env vars).");
      return;
    }

    const apps = getApps();
    console.log(`[Firebase Test] Firebase apps initialized: ${apps.length}`);

    const config = apps[0].options;
    console.log(`[Firebase Test] Project ID: ${config.projectId}`);
    console.log(`[Firebase Test] Auth Domain: ${config.authDomain}`);

    const testCollection = collection(db, "_connection_tests");
    const testDoc = await addDoc(testCollection, {
      timestamp: serverTimestamp(),
      test: true,
      message: "Connection test",
    });

    console.log(`[Firebase Test] SUCCESS: Firestore is connected!`);
    console.log(`[Firebase Test] Test document written with ID: ${testDoc.id}`);
  } catch (error: unknown) {
    console.error("[Firebase Test] ERROR: Firestore connection test failed");

    if (error instanceof Error) {
      console.error(`[Firebase Test] Error message: ${error.message}`);

      if (error.message.includes("permission-denied")) {
        console.warn("[Firebase Test] PERMISSION DENIED: Update Firestore security rules.");
      } else if (error.message.includes("unauthenticated")) {
        console.warn("[Firebase Test] AUTH REQUIRED for writes.");
      } else if (error.message.includes("not-found")) {
        console.error("[Firebase Test] DATABASE NOT FOUND.");
      } else if (error.message.includes("network")) {
        console.error("[Firebase Test] NETWORK ERROR.");
      }
    }

    throw error;
  }
}
