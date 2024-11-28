// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {  getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFcT1OjGwaYRNCEG40_o3mcmUdd-6A4xg",
  authDomain: "maizemillersadmin.firebaseapp.com",
  projectId: "maizemillersadmin",
  storageBucket: "maizemillersadmin.firebasestorage.app",
  messagingSenderId: "34201112494",
  appId: "1:34201112494:web:1e076c98d5b4190d1e023f",
  measurementId: "G-W43Q8QVX8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);