// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FIREBASE_API_KEY } from "../../backend/app.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "dailya.firebaseapp.com",
  projectId: "dailya",
  storageBucket: "dailya.appspot.com",
  messagingSenderId: "906122591863",
  appId: "1:906122591863:web:2373d9cfa21fe7b7035072"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);