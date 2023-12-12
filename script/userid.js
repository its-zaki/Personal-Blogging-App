import {
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { auth, db } from "./config.js";
  import {
    collection,
    getDocs,
    where,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
  
  const main =document.querySelector("main")