// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, FieldValue } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGCXL3vCzfG9Kji0EXcab6BAOPCELuTQQ",
  authDomain: "recipefinder-87049.firebaseapp.com",
  projectId: "recipefinder-87049",
  storageBucket: "recipefinder-87049.appspot.com",
  messagingSenderId: "818348988478",
  appId: "1:818348988478:web:63c6c142c37f34bd0dd96f",
  measurementId: "G-HBBQB9XVJ7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
export { FieldValue }; // export FieldValue
