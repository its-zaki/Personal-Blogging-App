import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const logout = document.querySelector("#logout");

console.log(auth);
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
const main = document.querySelector("#box");
let arr = [];

// function render (){

// }
async function getdatafromfirestore() {
  const q = await query(
    collection(db, "posts"),
    orderBy("postDate", "desc"),
    
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.length = 0;
    arr.push(doc.data());
    arr.map((item) => {
      console.log(item);
      main.innerHTML += ` <div id="main"><div class="container">
      <div class="user-img">
          <img src="./assets/img/profile.jpg" alt="user-img">
      </div>
      <div class="heads">
          <h3>${item.title}</h3>
          <span>username</span> -
          <span>August 16th, 2023</span>
      </div>
    </div>
    <div>
      <p class="content">${item.desc}</p>
    </div>
    <div class="crud">
      <button class="crud-btn">Delete </button> <button class="crud-btn">Edit</button>
    </div> </div>`;
      console.log(`${doc.id} => ${doc.data()}`);
    });
  });
}
getdatafromfirestore();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (title.value && desc.value !== "") {
    main.innerHTML = "";
    try {
      // arr.push();
      const docRef = await addDoc(collection(db, "posts"), {
        title: title.value,
        desc: desc.value,
        uid: auth.currentUser.uid,
        postDate: Timestamp.fromDate(new Date()),
      });
      arr.push(title.value, desc.value);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    title.value = "";
    desc.value = "";

    getdatafromfirestore();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "please enter any title or description",
    });
  }
});
