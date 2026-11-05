// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Web app config (public values; access is controlled in the Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCWuyDlFwqJBCDthm-uoM09LdIH64b08HY",
  authDomain: "codekaro-de93d.firebaseapp.com",
  projectId: "codekaro-de93d",
  storageBucket: "codekaro-de93d.firebasestorage.app",
  messagingSenderId: "934361899428",
  appId: "1:934361899428:web:c8d7950648696953dde131",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
