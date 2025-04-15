// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9jDd5hmO2tBhFa8dm65c8hE6WTZA-usI",
  authDomain: "contexto-9c35f.firebaseapp.com",
  projectId: "contexto-9c35f",
  storageBucket: "contexto-9c35f.firebasestorage.app",
  messagingSenderId: "22789561798",
  appId: "1:22789561798:web:59ec78756fb5e34809a6c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };