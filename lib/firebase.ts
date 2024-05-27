import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-4af16.firebaseapp.com",
  projectId: "drive-4af16",
  storageBucket: "drive-4af16.appspot.com",
  messagingSenderId: "375973080939",
  appId: "1:375973080939:web:e3581fccd2e7f7a6ce662e",
  measurementId: "G-XQHBY01LS1",
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { db, storage };
