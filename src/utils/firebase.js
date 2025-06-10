// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQDYSfcrME1XTYY53l4h-DOAqkn2bD3eI",
    authDomain: "netflix-gpt-7c98e.firebaseapp.com",
    projectId: "netflix-gpt-7c98e",
    storageBucket: "netflix-gpt-7c98e.firebasestorage.app",
    messagingSenderId: "573365260275",
    appId: "1:573365260275:web:fbfd7bf8217c7e46270c86",
    measurementId: "G-SMG1BY8NLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()