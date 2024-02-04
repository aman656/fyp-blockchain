
import {getStorage} from 'firebase/storage'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBX18snnnzSkZZ3uSqcuTC-2iZoSyxuxxA",
  authDomain: "fyp-11-a9531.firebaseapp.com",
  projectId: "fyp-11-a9531",
  storageBucket: "fyp-11-a9531.appspot.com",
  messagingSenderId: "976138757973",
  appId: "1:976138757973:web:b42594a82b8d86a77fb1dc",
  measurementId: "G-W2DBVRDJEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
