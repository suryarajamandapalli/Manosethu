import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getStorage } from "firebase/storage";

export type { User };

// MANOSETHU Web App Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_DEMO_MANOSETHU_FIREBASE_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "manosethu-admin.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://manosethu-admin-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "manosethu-admin",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "manosethu-admin.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "715231491767",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:715231491767:web:eaa2405f6d8ea6390f3f32",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HG690DB23Y",
};

// Initialize Firebase app singleton
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Google Auth Provider setup
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Google Sign In helper
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// Sign out helper
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

// Auth state observer
export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Initialize Firebase Storage
export const storage = getStorage(app);
