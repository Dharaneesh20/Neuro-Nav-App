// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_VkMt50Gopzy2Tt_q3FhopVHNW0-UkW8",
    authDomain: "smart-campus-manager.firebaseapp.com",
    projectId: "smart-campus-manager",
    storageBucket: "smart-campus-manager.firebasestorage.app",
    messagingSenderId: "35838544206",
    appId: "1:35838544206:web:88b32b4021a69248de761f",
    measurementId: "G-2P1JGMHKV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Analytics often causes issues in RN without specific setup, optional

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, firebaseConfig };
