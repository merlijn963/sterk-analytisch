import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxJwZQZQZQZQZQZQZQZQZQZQZQZQZQZQ",
  authDomain: "statistisch-sterk.firebaseapp.com",
  projectId: "statistisch-sterk",
  storageBucket: "statistisch-sterk.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 