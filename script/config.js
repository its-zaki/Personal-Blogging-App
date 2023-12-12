import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyA1DJBPa49WTKng0NnWJzWnwr6kPGjB95A",
    authDomain: "personal-blogging-app-3ebe0.firebaseapp.com",
    projectId: "personal-blogging-app-3ebe0",
    storageBucket: "personal-blogging-app-3ebe0.appspot.com",
    messagingSenderId: "619071361977",
    appId: "1:619071361977:web:84a46adea90ecac182dc68",
    measurementId: "G-8REN7BR97E"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);