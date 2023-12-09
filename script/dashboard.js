import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const logout = document.querySelector("#logout");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "home.html";
  }
});
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "home.html";
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    });
});

const form = document.querySelector("#form3");
const title = document.querySelector("#TITLE");
const desc = document.querySelector("#DESC");
let arr = [];

// function render (){

// }
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (title.value && desc.value !== "") {
    try {
      // arr.push();
      const docRef = await addDoc(collection(db, "posts"), {
        title: title.value,
        desc: desc.value,
        uid: auth.currentUser.uid,
      });
      arr.push(title.value, desc.value)
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    title.value = "";
    desc.value = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "please enter any title or description",
    });
  }

});
async function getdatafromfirestore() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    const main = document.querySelector("#box");
    main.innerHTML += ` <div id="main"><div class="container">
    <div class="user-img">
        <img src="./assets/img/profile.jpg" alt="user-img">
    </div>
    <div class="heads">
        <h3>${doc.data().title}</h3>
        <span>username</span> -
        <span>August 16th, 2023</span>
    </div>
  </div>
  <div>
    <p class="content">${doc.data().desc}</p>
  </div>
  <div class="crud">
    <button class="crud-btn">Delete </button> <button class="crud-btn">Edit</button>
  </div> </div>`;
    console.log(`${doc.id} => ${doc.data()}`);
  });
}
getdatafromfirestore();