import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIW9IJbqsj9diRQvCThgdp4P6zdZFldXw",
  authDomain: "house-marketplace-app-7af21.firebaseapp.com",
  projectId: "house-marketplace-app-7af21",
  storageBucket: "house-marketplace-app-7af21.appspot.com",
  messagingSenderId: "513166109364",
  appId: "1:513166109364:web:b7d350fcdba8ec373105e1",
  measurementId: "G-0MGJFWDW43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();