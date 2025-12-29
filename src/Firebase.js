// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEUcIODQohmdrpOO2VYOkmLSDJ7IMlh0w",
  authDomain: "shnoor.firebaseapp.com",
  projectId: "shnoor",
  appId: "1:346493616706:web:3afc2f04cf06fce64fa3db",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
