// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAhyAT1sj6_bMxngxTZhisDEK2C05RQpbU",
  authDomain: "gamehub-9f6d8.firebaseapp.com",
  projectId: "gamehub-9f6d8",
  storageBucket: "gamehub-9f6d8.firebasestorage.app",
  messagingSenderId: "880217633204",
  appId: "1:880217633204:web:a08627edb0bc00a55a02e1",
  measurementId: "G-HW9V9VPZKQ"
};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };


