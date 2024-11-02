import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD4zlrARAk4PjpbLDr0zZNPkGk_LPb8jlk",
  authDomain: "clone-54df9.firebaseapp.com",
  databaseURL: "https://clone-54df9-default-rtdb.firebaseio.com",
  projectId: "clone-54df9",
  storageBucket: "clone-54df9.appspot.com",
  messagingSenderId: "1079922056652",
  appId: "1:1079922056652:web:8d0f900fc6c2ebcea4d169",
  measurementId: "G-F084866SLC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);  
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { db, auth, analytics, googleProvider, facebookProvider };
