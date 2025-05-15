// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAhyAT1sj6_bMxngxTZhisDEK2C05RQpbU',
  authDomain: 'gamehub-9f6d8.firebaseapp.com',
  projectId: 'gamehub-9f6d8',
  storageBucket: 'gamehub-9f6d8.firebasestorage.app',
  messagingSenderId: '880217633204',
  appId: '1:880217633204:web:a08627edb0bc00a55a02e1',
  measurementId: 'G-HW9V9VPZKQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

// src/firebase.js (extended)
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);
export { db };

// src/firebase.js (extended)
import { getAuth } from 'firebase/auth';

const auth = getAuth(app);
export { auth };
