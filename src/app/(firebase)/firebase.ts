// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCESpGXCQjjibJ2fIP9pKxmQjyzkg6Bg78",
  authDomain: "amirbnsl-chat-app.firebaseapp.com",
  projectId: "amirbnsl-chat-app",
  storageBucket: "amirbnsl-chat-app.appspot.com",
  messagingSenderId: "300532104417",
  appId: "1:300532104417:web:2bd003c13f2681a469cba0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
export const db = getFirestore(app);

;
export default app;