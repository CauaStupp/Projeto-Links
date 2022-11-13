import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAt9f8Kk__RUdegu4xpa2NPe-ZGg_1jGU",
  authDomain: "caua-links.firebaseapp.com",
  projectId: "caua-links",
  storageBucket: "caua-links.appspot.com",
  messagingSenderId: "805795301929",
  appId: "1:805795301929:web:a951e8fe9f457cb55aaa38",
  measurementId: "G-SJG38B0HKB"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};