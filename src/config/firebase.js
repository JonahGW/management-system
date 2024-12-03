// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // To access Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth"; // For authentication
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

// Initialize Firestore, Storage, and Authentication services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Function to fetch user role from Firestore based on UID
export const getUserRole = async (userUid) => {
  try {
    const userDocRef = doc(db, "users", userUid); // Access user data from 'users' collection
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().role; // Return the role field from the user document
    } else {
      console.log("No user data found");
      return null; // If no data is found
    }
  } catch (error) {
    console.error("Error fetching user role: ", error);
    return null;
  }
};

// Function to check the authentication state
export const checkAuthState = (callback) => {
  onAuthStateChanged(auth, callback); // Callback to handle state changes (user login/logout)
};
