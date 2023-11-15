// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e7593.firebaseapp.com",
  projectId: "mern-estate-e7593",
  storageBucket: "mern-estate-e7593.appspot.com",
  messagingSenderId: "774825565579",
  appId: "1:774825565579:web:6eed1f63e9c6e6f995638e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);